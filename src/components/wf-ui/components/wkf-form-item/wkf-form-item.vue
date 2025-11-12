<template>
    <view class="wf-form-item">
        <u-form-item
            :label="column.label ? column.label + '：' : ''"
            :prop="column.prop"
            :label-width="column.labelWidth || labelWidth || 180"
            :label-position="column.type == 'dynamic' ? 'top' : column.labelPosition || labelPosition || 'left'"
            :required="!validateNull(column.rules)"
        >
            <!-- <component :is="getComponent(item)" v-bind="Object.assign(item)"></component> -->
            <wf-input
                v-if="[undefined, 'input', 'password', 'textarea', 'number'].includes(column.type) && !column.component"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :change="column.change"
                :dynamic-index="dynamicIndex"
            ></wf-input>
            <wf-select
                v-if="['select'].includes(column.type)"
                v-model="text"
                :column="column"
                :dic="dic"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></wf-select>
            <wf-cascader
                v-if="['cascader', 'tree'].includes(column.type)"
                v-model="text"
                :column="column"
                :dic="dic"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></wf-cascader>
            <wf-radio
                v-if="'radio' == column.type"
                v-model="text"
                :column="column"
                :dic="dic"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></wf-radio>
            <wf-checkbox
                v-if="'checkbox' == column.type"
                v-model="text"
                :column="column"
                :dic="dic"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></wf-checkbox>
            <wf-rate
                v-if="'rate' == column.type"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-rate>
            <wf-slider
                v-if="'slider' == column.type"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-slider>
            <wf-switch
                v-if="'switch' == column.type"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-switch>
            <wf-date
                v-if="DATE_LIST.includes(column.type)"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-date>
            <wf-upload
                v-if="'upload' == column.type"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-upload>
            <wf-map
                v-if="'map' == column.type"
                v-model="text"
                ref="temp"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-map>
            <wf-table-select
                v-if="'table-select' == column.type"
                v-model="text"
                ref="temp"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-table-select>

            <wf-sign
                v-if="'sign' == column.type"
                v-model="text"
                ref="temp"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-sign>
            <!-- #ifdef H5 -->
            <component
                v-if="column.component"
                :is="column.component"
                v-model="text"
                v-bind="column"
                :column="Object.assign(column, column.params || {})"
                :dic="dic"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></component>
            <!-- #endif -->
        </u-form-item>
    </view>
</template>

<script>
import { DATE_LIST } from '../../util/variable.js';
import { mpFormInitVal } from '../../util/dataformat.js';
export default {
    name: 'wkf-form-item',
    props: {
        column: {
            type: Object,
            default: () => {
                return {};
            },
        },
        value: {
            type: [Object, Array, String, Number],
            default: () => {
                return {};
            },
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        dic: {
            type: Array,
            default: () => {
                return [];
            },
        },
        labelPosition: String,
        labelWidth: Number,
        dynamicIndex: undefined,
    },
    watch: {
        text: {
            handler(val) {
                if (this.init || !this.validateNull(val)) {
                    this.init = true;
                    this.$emit('input', val);
                    this.$emit('change', val);
                } else {
                    this.init = true;
                }
            },
        },
        value: {
            handler(val) {
                // #ifdef MP
                this.text = val || mpFormInitVal(this.column);
                // #endif
                // #ifndef MP
                this.text = val;
                // #endif
            },
            immediate: true,
        },
    },
    computed: {
        params() {
            return this.column.params || {};
        },
        event() {
            return this.column.event || {};
        },
    },
    data() {
        return { text: undefined, init: false, DATE_LIST };
    },
    methods: {
        handleLabelChange(val) {
            this.$emit('label-change', { prop: this.column.prop, value: val, index: this.dynamicIndex });
        },
    },
};
</script>

<style lang="scss" scoped>
.wf-form-item {
    width: 100%;
}
</style>
