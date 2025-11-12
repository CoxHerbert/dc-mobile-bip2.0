<template>
    <view class="dc-select-dialog">
        <view
            class="input"
            :class="{
                disabled: disabled,
            }"
            @click="openDialog"
        >
            <view class="value" v-if="label">{{ label }}</view>
            <view class="placeholder" v-else>{{ placeholder }}</view>
        </view>
        <u-popup v-model="open" :closeable="true" mode="bottom" width="100%" height="100%">
            <dc-pagination v-bind="paginationProps" @updated="handleUpdate" v-if="multiple">
                <template #header>
                    <view class="dc-select-dialog__header"> {{ model.title }} </view>
                    <view class="search-box"></view>
                    <view class="select-box">
                        <view class="select-desc">
                            已选中<text class="count">{{ selected.length }}</text
                            >条:
                        </view>
                        <view class="selected-data">{{ popuplabel }}</view>
                        <view class="selected-expand" @click="doAction('expand')">
                            展开
                            <u-icon name="arrow-down"></u-icon>
                        </view>
                    </view>
                </template>
                <template #default="{ item, index }">
                    <view class="checkbox-wrap" @click="handleRowClick(item)">
                        <view class="checkbox-label">
                            <view
                                class="checkbox"
                                :class="{
                                    checked: selected.map((item) => item.id).includes(item.id),
                                }"
                            >
                                <u-icon name="checkbox-mark"></u-icon>
                            </view>
                        </view>
                        <view class="checkbox-content">
                            <view class="index"> #{{ index + 1 }}</view>
                            <dc-field class="field" v-for="(col, index) in columns" :label="col.label" :key="index">
                                {{ item[col.prop] }}
                            </dc-field>
                        </view>
                    </view>
                </template>
                <template #footer>
                    <view class="dc-select-dialog__footer">
                        <u-button type="info" size="medium" @click="doAction('colse')">关闭</u-button>
                        <u-button type="error" size="medium" @click="doAction('clear')">清空</u-button>
                        <u-button type="primary " size="medium" @click="doAction('confirm')">确认</u-button>
                    </view>
                </template>
            </dc-pagination>
            <u-radio-group v-else v-model="radio">
                <dc-pagination v-bind="paginationProps" @updated="handleUpdate">
                    <template #header>
                        <view class="dc-select-dialog__header">
                            {{ model.title }}
                        </view>
                        <view class="select-box">
                            <view class="select-desc">
                                已选中:<text class="count">{{ popuplabel }}</text>
                            </view>
                        </view>
                    </template>
                    <template #default="{ item, index }">
                        <u-radio :name="item.id">
                            <view class="index"> #{{ index + 1 }}</view>
                            <dc-field class="field" v-for="(col, index) in columns" :label="col.label" :key="index">
                                {{ item[col.prop] }}
                            </dc-field>
                        </u-radio>
                    </template>
                    <template #footer>
                        <view class="dc-select-dialog__footer">
                            <u-button type="info" size="medium" @click="doAction('colse')">关闭</u-button>
                            <u-button type="error" size="medium" @click="doAction('clear')">清空</u-button>
                            <u-button type="primary " size="medium" @click="doAction('confirm')">确认</u-button>
                        </view>
                    </template>
                </dc-pagination>
            </u-radio-group>
        </u-popup>
        <u-popup v-model="openSelected" mode="bottom" width="100%" height="70%" border-radius="20" :closeable="true">
            <view class="selected-header">选中数据</view>
            <scroll-view class="selected-content" scroll-y>
                <view v-for="(item, index) in selected" :key="index" class="card-wrap">
                    <view class="checkbox-wrap" @click="handleRowClick(item)">
                        <view class="checkbox-label">
                            <view
                                class="checkbox"
                                :class="{
                                    checked: selected.map((item) => item.id).includes(item.id),
                                }"
                            >
                                <u-icon name="checkbox-mark"></u-icon>
                            </view>
                        </view>
                        <view class="checkbox-content">
                            <view class="index"> #{{ index + 1 }}</view>
                            <dc-field class="field" v-for="(col, index) in columns" :label="col.label" :key="index">
                                {{ item[col.prop] }}
                            </dc-field>
                        </view>
                    </view>
                </view>
            </scroll-view>
        </u-popup>
    </view>
</template>

<script>
import cacheApi from './../../api/index';
import cacheData from '@/components/dc/constant/cacheData';
import selectProps from './../../mixins/select-props';
import Props from '@/components/wf-ui/mixins/props.js';

export default {
    // mixins: [Props, selectProps],
    emits: ['input', 'change'],
    name: 'wf-select-dialog',
    props: {
        value: { type: [String, Number, Object, Array, Boolean], default: '' },
        title: { type: String, default: '' },
        objectName: {
            type: String,
            default: '',
            validator: (value) => Object.keys(cacheData).includes(value),
        },
        returnType: {
            type: String,
            default: 'string',
            validator: (value) => ['string', 'object'].includes(value),
        },
        width: { type: String, default: '100%' },
        placeholder: { type: String, default: '请点击选择' },
        disabled: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '1200px' },
        query: {
            type: Object,
            default: () => {
                return {};
            },
        },
        column: {
            type: Object,
            default: () => {
                return {};
            },
        },
        dynamicIndex: {
            type: Number,
        },
        rowKey: { type: String, default: () => 'id' },
        multiple: { type: Boolean, default: false },
        clearable: { type: Boolean, default: false },
        showKey: { type: String, default: '' },
        inputProps: { type: Object, default: () => ({}) },
        // change: { type: [Function, null], default: Function },
    },
    data() {
        return {
            open: false,
            loading: false,
            model: null,
            radio: '',
            paginationProps: {},
            dataList: [],
            inputValue: [],
            selected: [],
            openSelected: false,
        };
    },
    computed: {
        label() {
            return this.inputValue.map((item) => item[this.showKey || this.model.defaultLabel] || item.id).join('，');
        },
        popuplabel() {
            return this.selected.map((item) => item[this.showKey || this.model.defaultLabel] || item.id).join('，');
        },
    },
    watch: {
        value: {
            handler(newVal) {
                this.$nextTick(() => {
                    let ids = [];
                    if (typeof newVal === 'string' && !!newVal) {
                        ids = newVal.split(',');
                    } else if (Array.isArray(newVal)) {
                        ids = newVal.map((item) => item.id);
                    } else if (typeof newVal === 'object' && newVal !== null) {
                        ids = [newVal.id];
                    }
                    if (!ids.length) {
                        this.inputValue = [];
                        this.selected = [];
                        return;
                    }
                    if (this.model.url) {
                        cacheApi.cache
                            .getView({
                                url: this.model.url,
                                data: ids,
                            })
                            .then(() => {
                                const currentGlobalData = this.$store.getters.globalData[this.model.url];
                                const data = ids.map((id) => {
                                    const currentItem = currentGlobalData[id];
                                    return currentItem ? { ...currentItem } : id;
                                });

                                this.inputValue = this.deepClone(data);
                                this.selected = this.deepClone(data);
                                if (!this.multiple) {
                                    if (typeof newVal === 'object' && newVal !== null) {
                                        this.radio = newVal.id;
                                    } else {
                                        this.radio = newVal;
                                    }
                                }
                            })
                            .catch((error) => {
                                console.error('Error fetching data:', error);
                            });
                    }
                });
            },
            immediate: true,
            deep: true,
        },
        radio: {
            immediate: true,
            deep: true,
            handler(newVal) {
                if (!this.multiple) {
                    const findItem = Array.isArray(this.dataList)
                        ? this.dataList.find((item) => item.id === newVal)
                        : null;
                    if (findItem) {
                        this.selected = [findItem];
                    }
                }
            },
        },
    },
    created() {
        this.model = cacheData[this.objectName];
        this.paginationProps.request = this.model.dialogGet;
        this.paginationProps.params = this.model.query;
        this.columns = this.model.column;
    },
    methods: {
        openDialog() {
            if (this.disabled) return;
            this.open = true;
            if (this.multiple) {
                this.selected = this.deepClone(this.inputValue);
            } else {
                if (typeof newVal === 'string' && !!newVal) {
                    this.radio = this.value;
                } else if (typeof newVal === 'object' && newVal !== null) {
                    this.radio = this.value.id;
                }
            }
        },
        handleUpdate(data) {
            this.dataList = data;
        },
        doAction(action) {
            if (action === 'colse') {
                this.handleClose();
            } else if (action === 'clear') {
                this.handleClear();
            } else if (action === 'confirm') {
                this.handleConfirm();
            } else if (action === 'expand') {
                this.openSelected = true;
            }
        },
        handleRowClick(row) {
            if (this.selected.some((item) => item.id === row.id)) {
                this.selected.splice(
                    this.selected.findIndex((item) => item.id === row.id),
                    1
                );
            } else {
                this.selected.push(row);
            }
        },
        handleConfirm() {
            if (this.multiple) {
                if (this.returnType === 'string') {
                    const ids = this.selected.map((item) => item.id).join(',');
                    this.$emit('change', ids);
                    this.$emit('input', ids);
                } else {
                    this.$emit('change', this.selected);
                    this.$emit('input', this.selected);
                }
            } else {
                if (this.returnType === 'string') {
                    const ids = this.selected.map((item) => item.id).join(',');
                    this.$emit('change', ids);
                    this.$emit('input', ids);
                } else {
                    this.$emit('change', this.selected[0]);
                    this.$emit('input', this.selected[0]);
                }
            }
            this.handleClose();
        },
        handleClear() {
            this.radio = null;
            this.selected = [];
            this.handleConfirm();
        },
        handleClose() {
            this.open = false;
            this.selected = [];
        },
    },
};
</script>
<style lang="scss" scoped>
.dc-select-dialog {
    ::v-deep.u-checkbox-group,
    ::v-deep.u-radio-group {
        width: 100%;
        height: 100%;
        .dc-pagination-wrapper {
            width: 100%;
            height: 100%;
        }
    }
    &__header {
        text-align: center;
        font-size: 32rpx;
        font-weight: 600;
        height: 80rpx;
        line-height: 80rpx;
        border-bottom: 1rpx solid #ccc;
    }
    .search-box {
    }
    .select-box {
        display: flex;
        align-content: center;
        height: 50rpx;
        .select-desc {
            margin-right: 10px;
            .count {
                padding: 0 4rpx;
                font-weight: 600;
                color: #f26c0c;
            }
        }
        .selected-data {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .selected-expand {
            padding: 0 10rpx;
            color: #f26c0c;
        }
    }
    &__footer {
        padding: 10rpx;
        display: flex;
        gap: 20rpx;
        justify-content: flex-end;
        border-top: 1rpx solid #ccc;
    }
    .input {
        width: 100%;
        &.disabled {
            width: calc(100% - 8px);
            background-color: rgba(0, 0, 0, 0.05);
        }
        .value {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .placeholder {
            width: 100%;
            height: 100%;
            line-height: 40px;
            font-size: 14px;
            color: rgb(192, 196, 204);
        }
    }
    .card-wrap {
        padding: 20rpx;
        border-radius: 16rpx;
        background: #fff;
        margin: 24rpx;
        box-shadow: #ccc 5rpx 2rpx 8rpx 8rpx;
    }
    .checkbox-wrap {
        display: flex;
        align-items: center;
        .checkbox-label {
            padding-right: 16rpx;
        }
        .checkbox {
            width: 18px;
            height: 18px;
            border-radius: 3px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: center;
            box-sizing: border-box;
            color: #fff;
            text-align: center;
            transition-property: color, border-color, background-color;
            font-size: 14px;
            border: 1px solid #c8c9cc;
            transition-duration: 0.2s;
            &.checked {
                border-color: rgb(41, 121, 255);
                background-color: rgb(41, 121, 255);
            }
        }
    }
    .index {
        font-weight: 600;
        font-size: 32rpx;
    }
    .field {
        display: flex;
        align-items: center;
        font-size: 24rpx;
        &-label {
            color: #322d2d;
            white-space: nowrap;
        }
        &-value {
            color: #000;
        }
    }
    .selected-header {
        text-align: center;
        font-size: 17px;
        font-weight: 600;
        height: 44px;
        line-height: 44px;
        border-bottom: 0.5px solid #ccc;
    }
    .selected-content {
        height: calc(100% - 44px);
        overflow: auto;
        box-sizing: border-box;
    }
}
</style>
