<template>
    <section class="renderer-compare">
        <header class="renderer-compare__header">
            <h3 class="renderer-compare__title">渲染器对比调试</h3>
            <div class="renderer-compare__controls">
                <label class="renderer-compare__control">
                    <input type="checkbox" v-model="syncFromLegacy" />
                    同步旧渲染器数据到新渲染器
                </label>
                <button type="button" class="renderer-compare__button" @click="resetModern">
                    重置新渲染器数据
                </button>
                <button type="button" class="renderer-compare__button" @click="clearLogs">
                    清除对比日志
                </button>
            </div>
        </header>
        <div class="renderer-compare__body">
            <div class="renderer-compare__panel renderer-compare__panel--legacy">
                <h4 class="renderer-compare__panel-title">旧渲染器</h4>
                <wf-form
                    ref="legacyFormRef"
                    :option="legacyOption"
                    :value="legacyForm"
                    @input="onLegacyInput"
                    @submit="onLegacySubmit"
                    @change="onLegacyChange"
                    @focus="recordLegacyEvent('focus', $event)"
                    @blur="recordLegacyEvent('blur', $event)"
                    @click="recordLegacyEvent('click', $event)"
                >
                    <template #menu>
                        <slot name="menu"></slot>
                    </template>
                </wf-form>
            </div>
            <div class="renderer-compare__panel renderer-compare__panel--modern">
                <h4 class="renderer-compare__panel-title">
                    新渲染器（测试）
                    <small class="renderer-compare__panel-subtitle">事件与数据仅用于对比，不参与提交流程</small>
                </h4>
                <dc-form-renderer
                    ref="modernFormRef"
                    :option="modernOption"
                    :value="modernForm"
                    @input="onModernInput"
                    @submit="onModernSubmit"
                    @change="onModernChange"
                    @focus="recordModernEvent('focus', $event)"
                    @blur="recordModernEvent('blur', $event)"
                    @click="recordModernEvent('click', $event)"
                ></dc-form-renderer>
            </div>
        </div>
        <footer class="renderer-compare__footer">
            <div class="renderer-compare__diff">
                <h4 class="renderer-compare__panel-title">数据差异</h4>
                <div v-if="!diffEntries.length" class="renderer-compare__empty">暂无差异</div>
                <ul v-else class="renderer-compare__diff-list">
                    <li v-for="(diff, index) in diffEntries" :key="index">
                        <strong>{{ diff.path }}</strong>
                        <div class="renderer-compare__diff-values">
                            <span class="renderer-compare__diff-value renderer-compare__diff-value--legacy">
                                旧：{{ formatValue(diff.legacy) }}
                            </span>
                            <span class="renderer-compare__diff-value renderer-compare__diff-value--modern">
                                新：{{ formatValue(diff.modern) }}
                            </span>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="renderer-compare__events">
                <h4 class="renderer-compare__panel-title">事件对比</h4>
                <div v-if="!eventComparisons.length" class="renderer-compare__empty">暂无事件</div>
                <table v-else class="renderer-compare__event-table">
                    <thead>
                        <tr>
                            <th>序号</th>
                            <th>事件</th>
                            <th>旧渲染器</th>
                            <th>新渲染器</th>
                            <th>状态</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, index) in eventComparisons" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>{{ row.name }}</td>
                            <td>{{ formatValue(row.legacy?.payload) }}</td>
                            <td>{{ formatValue(row.modern?.payload) }}</td>
                            <td>
                                <span
                                    class="renderer-compare__status"
                                    :class="{
                                        'renderer-compare__status--match': row.match,
                                        'renderer-compare__status--mismatch': !row.match,
                                    }"
                                >
                                    {{ row.match ? '一致' : '不一致' }}
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </footer>
    </section>
</template>

<script>
import { computed, defineComponent, nextTick } from 'vue';
import WfForm from '@/components/wf-ui/components/wf-form/wf-form.vue';
import DcFormRenderer from './DcFormRenderer.vue';
import { deepClone } from '@/components/wf-ui/util/index.js';

function isPlainObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}

function stableStringify(value) {
    const seen = new WeakSet();
    return JSON.stringify(
        value,
        (key, val) => {
            if (typeof val === 'undefined') return '__undefined__';
            if (typeof val === 'function') return val.toString();
            if (val instanceof Date) return val.toISOString();
            if (val && typeof val === 'object') {
                if (seen.has(val)) {
                    return '__circular__';
                }
                seen.add(val);
                if (!Array.isArray(val)) {
                    const ordered = {};
                    Object.keys(val)
                        .sort()
                        .forEach((k) => {
                            ordered[k] = val[k];
                        });
                    return ordered;
                }
            }
            return val;
        },
        2
    );
}

function diffObjects(a = {}, b = {}, path = '') {
    const diffs = [];
    const keys = new Set([...Object.keys(a || {}), ...Object.keys(b || {})]);
    keys.forEach((key) => {
        const nextPath = path ? `${path}.${key}` : key;
        const valueA = a ? a[key] : undefined;
        const valueB = b ? b[key] : undefined;
        if (isPlainObject(valueA) && isPlainObject(valueB)) {
            diffs.push(...diffObjects(valueA, valueB, nextPath));
        } else if (Array.isArray(valueA) && Array.isArray(valueB)) {
            if (stableStringify(valueA) !== stableStringify(valueB)) {
                diffs.push({ path: nextPath, legacy: valueA, modern: valueB });
            }
        } else if (stableStringify(valueA) !== stableStringify(valueB)) {
            diffs.push({ path: nextPath, legacy: valueA, modern: valueB });
        }
    });
    return diffs;
}

export default defineComponent({
    name: 'RendererComparePanel',
    components: { WfForm, DcFormRenderer },
    props: {
        option: {
            type: Object,
            default: () => ({}),
        },
        modelValue: {
            type: Object,
            default: () => ({}),
        },
    },
    emits: ['update:modelValue', 'submit'],
    data() {
        return {
            legacyForm: {},
            modernForm: {},
            legacyOption: {},
            modernOption: {},
            diffEntries: [],
            legacyEvents: [],
            modernEvents: [],
            syncFromLegacy: true,
            syncingLegacy: false,
            syncingModern: false,
        };
    },
    computed: {
        eventComparisons() {
            const max = Math.max(this.legacyEvents.length, this.modernEvents.length);
            const rows = [];
            for (let i = 0; i < max; i += 1) {
                const legacy = this.legacyEvents[i];
                const modern = this.modernEvents[i];
                const name = legacy?.name || modern?.name || '-';
                const match =
                    legacy &&
                    modern &&
                    legacy.name === modern.name &&
                    stableStringify(legacy.payload) === stableStringify(modern.payload);
                rows.push({ name, legacy, modern, match });
            }
            return rows;
        },
    },
    watch: {
        option: {
            deep: true,
            immediate: true,
            handler(option) {
                const base = deepClone(option || {});
                this.legacyOption = deepClone(base);
                const modern = deepClone(base);
                if (!modern.menuBtn || typeof modern.menuBtn !== 'object') {
                    modern.menuBtn = {};
                }
                modern.menuBtn.show = false;
                this.modernOption = modern;
            },
        },
        modelValue: {
            deep: true,
            immediate: true,
            handler(value) {
                const clone = deepClone(value || {});
                this.legacyForm = clone;
                this.modernForm = deepClone(clone);
                this.computeDiffs();
            },
        },
        legacyForm: {
            deep: true,
            handler() {
                if (!this.syncingModern) {
                    this.computeDiffs();
                }
            },
        },
        modernForm: {
            deep: true,
            handler() {
                if (!this.syncingLegacy) {
                    this.computeDiffs();
                }
            },
        },
    },
    methods: {
        formatValue(value) {
            if (value === undefined) return 'undefined';
            if (value === null) return 'null';
            if (typeof value === 'string') return value;
            if (typeof value === 'number' || typeof value === 'boolean') return value.toString();
            try {
                return stableStringify(value);
            } catch (error) {
                return String(value);
            }
        },
        computeDiffs() {
            this.diffEntries = diffObjects(this.legacyForm, this.modernForm);
        },
        onLegacyInput(payload) {
            this.syncingLegacy = true;
            const value = deepClone(payload || {});
            this.recordLegacyEvent('input', value);
            this.legacyForm = value;
            this.$emit('update:modelValue', deepClone(value));
            if (this.syncFromLegacy) {
                this.modernForm = deepClone(value);
            }
            this.syncingLegacy = false;
            this.computeDiffs();
        },
        onModernInput(payload) {
            if (this.syncingLegacy) return;
            this.syncingModern = true;
            const value = deepClone(payload || {});
            this.recordModernEvent('input', value);
            this.modernForm = value;
            this.syncingModern = false;
            this.computeDiffs();
        },
        onLegacySubmit(form, done) {
            this.recordLegacyEvent('submit', form);
            this.$emit('submit', form, done);
        },
        onModernSubmit(form, done) {
            this.recordModernEvent('submit', form);
            this.computeDiffs();
            if (typeof done === 'function') {
                nextTick(() => done());
            }
        },
        onLegacyChange(value) {
            this.recordLegacyEvent('change', value);
        },
        onModernChange(value) {
            this.recordModernEvent('change', value);
            this.computeDiffs();
        },
        recordLegacyEvent(name, payload) {
            this.pushEvent('legacy', name, payload);
        },
        recordModernEvent(name, payload) {
            this.pushEvent('modern', name, payload);
        },
        pushEvent(source, name, payload) {
            const target = source === 'legacy' ? this.legacyEvents : this.modernEvents;
            const entry = {
                name,
                payload: deepClone(payload),
                timestamp: Date.now(),
            };
            target.unshift(entry);
            if (target.length > 10) {
                target.pop();
            }
        },
        resetModern() {
            this.modernForm = deepClone(this.legacyForm);
            this.computeDiffs();
        },
        clearLogs() {
            this.legacyEvents = [];
            this.modernEvents = [];
        },
    },
});
</script>

<style scoped lang="scss">
.renderer-compare {
    display: flex;
    flex-direction: column;
    gap: 24rpx;
    background: #f7f7f7;
    padding: 20rpx;
    border-radius: 16rpx;
    border: 1px solid rgba(0, 0, 0, 0.05);

    &__header {
        display: flex;
        flex-direction: column;
        gap: 12rpx;
    }

    &__title {
        font-size: 32rpx;
        font-weight: 600;
    }

    &__controls {
        display: flex;
        flex-wrap: wrap;
        gap: 12rpx;
        align-items: center;
    }

    &__control {
        display: flex;
        align-items: center;
        gap: 8rpx;
        font-size: 26rpx;
    }

    &__button {
        border: 1px solid #2979ff;
        color: #2979ff;
        padding: 4rpx 14rpx;
        border-radius: 8rpx;
        background: #fff;
        cursor: pointer;
    }

    &__body {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320rpx, 1fr));
        gap: 24rpx;
    }

    &__panel {
        background: #fff;
        border-radius: 12rpx;
        padding: 20rpx;
        box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.04);
    }

    &__panel-title {
        font-size: 28rpx;
        font-weight: 600;
        margin-bottom: 16rpx;
    }

    &__panel-subtitle {
        display: block;
        font-size: 22rpx;
        font-weight: 400;
        margin-top: 6rpx;
        color: #999;
    }

    &__footer {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(320rpx, 1fr));
        gap: 24rpx;
    }

    &__diff,
    &__events {
        background: #fff;
        padding: 20rpx;
        border-radius: 12rpx;
        box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.04);
    }

    &__empty {
        color: #666;
        font-size: 26rpx;
    }

    &__diff-list {
        list-style: none;
        padding: 0;
        margin: 0;
        display: flex;
        flex-direction: column;
        gap: 16rpx;
    }

    &__diff-values {
        display: flex;
        flex-direction: column;
        gap: 6rpx;
        margin-top: 6rpx;
        font-size: 24rpx;
        word-break: break-word;
    }

    &__diff-value {
        &--legacy {
            color: #ff4d4f;
        }

        &--modern {
            color: #52c41a;
        }
    }

    &__event-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 24rpx;
    }

    &__event-table th,
    &__event-table td {
        border: 1px solid #eee;
        padding: 8rpx 12rpx;
        text-align: left;
        vertical-align: top;
    }

    &__status {
        display: inline-flex;
        align-items: center;
        padding: 2rpx 10rpx;
        border-radius: 999px;
        font-size: 22rpx;
    }

    &__status--match {
        background: rgba(82, 196, 26, 0.12);
        color: #389e0d;
    }

    &__status--mismatch {
        background: rgba(250, 84, 28, 0.12);
        color: #d4380d;
    }
}
</style>
