<template>
    <view class="wf-form-item">
        <u-form-item
            :label="column.label ? column.label + '：' : ''"
            :prop="column.prop"
            :label-width="column.labelWidth || labelWidth || 180"
            :label-position="column.type == 'dynamic' ? 'top' : 'left'"
            :required="!validateNull(column.rules)"
            class="wf-form-item-label"
        >   
        
            <!-- <component :is="getComponent(item)" v-bind="Object.assign(item)"></component> -->
            <wf-input
                v-if="[undefined, 'input', 'password', 'textarea', 'number'].includes(column.type) && !column.component"
                v-model="text"
                :column="column"
                :disabled="disabled"
                @change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></wf-input>
            <wf-select
                v-else-if="['select'].includes(column.type)"
                v-model="text"
                :column="column"
                :dic="dic"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></wf-select>
            <wf-cascader
                v-else-if="['cascader', 'tree'].includes(column.type)"
                v-model="text"
                :column="column"
                :dic="dic"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></wf-cascader>
            <wf-radio
                v-else-if="'radio' == column.type"
                v-model="text"
                :column="column"
                :dic="dic"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></wf-radio>
            <wf-checkbox
                v-else-if="'checkbox' == column.type"
                v-model="text"
                :column="column"
                :dic="dic"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></wf-checkbox>
            <wf-rate
                v-else-if="'rate' == column.type"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-rate>
            <wf-slider
                v-else-if="'slider' == column.type"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-slider>
            <wf-switch
                v-else-if="'switch' == column.type"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-switch>
            <wf-date
                v-else-if="DATE_LIST.includes(column.type)"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-date>
            <wf-upload
                v-else-if="'upload' == column.type"
                v-model="text"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-upload>
            <wf-dynamic
                v-else-if="'dynamic' == column.type"
                v-model="text"
                ref="temp"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-dynamic>
            <wf-map
                v-else-if="'map' == column.type"
                v-model="text"
                ref="temp"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-map>
            <wf-table-select
                v-else-if="'table-select' == column.type"
                v-model="text"
                ref="temp"
                :column="column"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></wf-table-select>

            <wf-sign
                v-else-if="'sign' == column.type"
                v-model="text"
                ref="temp"
                :column="column"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></wf-sign>
            <!-- #ifdef H5-->
            <!-- <component
                v-if="!column.type && column.component"
                :is="column.component"
                v-model="text"
                v-bind="column"
                :column="Object.assign(column, column.params || {})"
                :dic="dic"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></component> -->
            <!-- #endif -->

            <WkfUserSelect
                v-else-if="'wf-user-select' == column.component"
                v-model="text"
                :column="Object.assign(column, column.params || {})"
                :check-type="column.params ? column.params.checkType : 'radio'"
                :dic="dic"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
                @label-change="handleLabelChange"
            ></WkfUserSelect>

            <Customtable
                v-else-if="
                    ['wf-vo-select', 'wf-prdmo-select', 'wf-plan-select', 'wf-withdrawn-select'].includes(
                        column.component
                    )
                "
                v-model="text"
                :column="column"
                :check-type="column.params ? column.params.checkType : 'radio'"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></Customtable>
            <!-- 物料选择 -->
            <!-- {{ column.change }} -->
            <MaterialTable
                v-else-if="['wf-wl-select'].includes(column.component)"
                v-model="text"
                :column="column"
                @label-change="handleLabelChange"
                :check-type="column.params ? column.params.checkType : 'radio'"
                :disabled="disabled"
                :dynamic-index="dynamicIndex"
            ></MaterialTable>

            <!-- 模糊物料查询 -->
            <Vaguecustomtableselect
                v-else-if="['wf-fuzzymaterial-select'].includes(column.component)"
                v-model="text"
                :column="column"
                :check-type="column.params ? column.params.checkType : 'radio'"
                :disabled="disabled"
                @label-change="handleLabelChange"
                :dynamic-index="dynamicIndex"
            ></Vaguecustomtableselect>
               <!-- 用户组件 -->
            <template v-else-if="column.component === 'wf-radio-select'">
                <WfUserSelect v-if="isUser(column)" v-model="text" :readonly="column.readonly" :disabled="column.disabled" />
                    <!-- <wf-user-select v-if="column?.children?.props?.url === '/blade-system/search/user'" v-model="text" :checkType="column?.param?.checkType || 'radio'" :placeholder="`请选择${column?.label}`" >
                    </wf-user-select> -->
            </template>
            <WfFeasibility v-if="column.component === 'wf-feasibility'" v-model="text"> </WfFeasibility>
        </u-form-item>
    </view>
</template>

<script>
import WkfUserSelect from '@/pages/plugin/workflow/components/custom-fileds/wf-user-select/index.vue';
import WfFeasibility from '@/pages/plugin/workflow/components/wf-feasibility/wf-feasibility.vue';
import WfUserSelect from '@/pages/plugin/workflow/components/custom-fileds/wf-user-select/index.vue';
import Customtable from '@/pages/plugin/workflow/components/custom-fileds/wf-customtable-select/index.vue';
import MaterialTable from '@/pages/plugin/workflow/components/custom-fileds/wf-material-select/index.vue';
import Vaguecustomtableselect from '@/pages/plugin/workflow/components/custom-fileds/wf-fuzzymaterial-select/index.vue';

import { DATE_LIST } from '../../util/variable.js';
import { mpFormInitVal } from '../../util/dataformat.js';
export default {
    name: 'wf-form-item',
    components: { 
        WfFeasibility,
        WkfUserSelect,
        WfUserSelect,
        Customtable, 
        MaterialTable,
        Vaguecustomtableselect
     },
    props: {
        column: {
            type: Object,
            default: () => {
                return {};
            },
        },
        value: {
            type: [Object, Array, String, Number],
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
                // if (val && val.includes('userInfo')) {
                //     let index = val.lastIndexOf('.') + 1;
                //     let name = val.substring(index, val.length - 1);
                //     val = this.$store.getters.userInfo[name];
                // }
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
        isUser(column) {
            return column?.children?.props?.url === '/blade-system/search/user'
        },
        handleLabelChange(val) {
            this.text = val;
            this.$emit('label-change', {
                prop: this.column.prop,
                value: val,
                index: this.dynamicIndex,
                change: this.column.change,
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.wf-form-item {
    width: 100%;
}
.wf-form-item-label {
    position: relative;
    // padding-left: 20rpx;
    box-sizing: border-box;
    min-height: auto;
    line-height: 1;
}
.normal-form-item {
    display: flex;
    align-items: flex-start;
    flex-wrap: nowrap;
}
.dynamic-form-item {
    display: block;
}
</style>
