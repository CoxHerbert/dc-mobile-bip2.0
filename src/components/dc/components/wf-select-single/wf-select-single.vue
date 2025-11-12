<template>
    <view class="wf-select-single">
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
            <u-radio-group v-model="radio">
                <dc-pagination v-bind="paginationProps" @updated="handleUpdate">
                    <template #header>
                        <view class="dc-select-dialog__header"> {{ model.title }} </view>
                        <view class="select-desc"> 已选中: {{ selected[showKey || model.defaultLabel] }} </view>
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
    </view>
</template>

<script>
import cacheData from '@/components/dc/constant/cacheData';
import selectProps from './../../mixins/select-props';
import Props from '@/components/wf-ui/mixins/props.js';

export default {
    // mixins: [Props, selectProps],
    emits: ['input', 'change'],
    name: 'wf-select-single',
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
            label: null,
            radio: '',
            paginationProps: {},
            dataList: [],
            selected: {},
        };
    },
    watch: {
        value: {
            immediate: true,
            deep: true,
            handler(newVal) {
                this.label = newVal;
            },
        },
        radio: {
            immediate: true,
            deep: true,
            handler(newVal) {
                const findItem = Array.isArray(this.dataList) ? this.dataList.find((item) => item.id === newVal) : null;
                if (findItem) {
                    this.selected = findItem;
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
            if (typeof newVal === 'string' && !!newVal) {
                this.radio = this.value;
            } else if (typeof newVal === 'object' && newVal !== null) {
                this.radio = this.value.id;
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
            }
        },
        handleConfirm() {
            const updateVal = this.selected ? this.selected[this.showKey || this.model.defaultLabel] : null;
            this.$emit('change', this.selected);
            this.$emit('input', updateVal);
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
.wf-select-single {
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
    .select-desc {
        margin-right: 10px;
        .count {
            padding: 0 4rpx;
            font-weight: 600;
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
}
</style>
