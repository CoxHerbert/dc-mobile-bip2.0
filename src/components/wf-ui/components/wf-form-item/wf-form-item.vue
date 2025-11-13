<template>
  <div class="wf-form-item" :class="itemClass">
    <div v-if="column.label" class="wf-form-item__label" :style="labelStyle">
      <span v-if="isRequired" class="wf-form-item__asterisk">*</span>
      <span>{{ column.label }}：</span>
    </div>
    <div class="wf-form-item__content">
      <wf-input
        v-if="[undefined, 'input', 'password', 'textarea', 'number'].includes(column.type) && !column.component"
        v-model="text"
        :column="column"
        :disabled="disabled"
        @change="handleLabelChange"
        :dynamic-index="dynamicIndex"
      />
      <wf-select
        v-else-if="['select'].includes(column.type)"
        v-model="text"
        :column="column"
        :dic="dic"
        :disabled="disabled"
        @label-change="handleLabelChange"
        :dynamic-index="dynamicIndex"
      />
      <wf-cascader
        v-else-if="['cascader', 'tree'].includes(column.type)"
        v-model="text"
        :column="column"
        :dic="dic"
        :disabled="disabled"
        @label-change="handleLabelChange"
        :dynamic-index="dynamicIndex"
      />
      <wf-radio
        v-else-if="column.type === 'radio'"
        v-model="text"
        :column="column"
        :dic="dic"
        :disabled="disabled"
        @label-change="handleLabelChange"
        :dynamic-index="dynamicIndex"
      />
      <wf-checkbox
        v-else-if="column.type === 'checkbox'"
        v-model="text"
        :column="column"
        :dic="dic"
        :disabled="disabled"
        @label-change="handleLabelChange"
        :dynamic-index="dynamicIndex"
      />
      <wf-rate
        v-else-if="column.type === 'rate'"
        v-model="text"
        :column="column"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
      />
      <wf-slider
        v-else-if="column.type === 'slider'"
        v-model="text"
        :column="column"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
      />
      <wf-switch
        v-else-if="column.type === 'switch'"
        v-model="text"
        :column="column"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
      />
      <wf-date
        v-else-if="DATE_LIST.includes(column.type)"
        v-model="text"
        :column="column"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
      />
      <wf-upload
        v-else-if="column.type === 'upload'"
        v-model="text"
        :column="column"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
      />
      <wf-dynamic
        v-else-if="column.type === 'dynamic'"
        v-model="text"
        ref="temp"
        :column="column"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
      />
      <wf-map
        v-else-if="column.type === 'map'"
        v-model="text"
        ref="temp"
        :column="column"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
      />
      <wf-table-select
        v-else-if="column.type === 'table-select'"
        v-model="text"
        ref="temp"
        :column="column"
        :disabled="disabled"
        @label-change="handleLabelChange"
        :dynamic-index="dynamicIndex"
      />
      <wf-sign
        v-else-if="column.type === 'sign'"
        v-model="text"
        ref="temp"
        :column="column"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
      />
      <component
        v-else-if="!column.type && column.component"
        :is="column.component"
        v-model="text"
        v-bind="column"
        :column="Object.assign(column, column.params || {})"
        :dic="dic"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
      />
      <WkfUserSelect
        v-else-if="column.component === 'wf-user-select'"
        v-model="text"
        :column="Object.assign(column, column.params || {})"
        :check-type="column.params ? column.params.checkType : 'radio'"
        :dic="dic"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
        @label-change="handleLabelChange"
      />
      <Customtable
        v-else-if="[
          'wf-vo-select',
          'wf-prdmo-select',
          'wf-plan-select',
          'wf-withdrawn-select'
        ].includes(column.component)"
        v-model="text"
        :column="column"
        :check-type="column.params ? column.params.checkType : 'radio'"
        :disabled="disabled"
        @label-change="handleLabelChange"
        :dynamic-index="dynamicIndex"
      />
      <MaterialTable
        v-else-if="['wf-wl-select'].includes(column.component)"
        v-model="text"
        :column="column"
        @label-change="handleLabelChange"
        :check-type="column.params ? column.params.checkType : 'radio'"
        :disabled="disabled"
        :dynamic-index="dynamicIndex"
      />
      <Vaguecustomtableselect
        v-else-if="['wf-fuzzymaterial-select'].includes(column.component)"
        v-model="text"
        :column="column"
        :check-type="column.params ? column.params.checkType : 'radio'"
        :disabled="disabled"
        @label-change="handleLabelChange"
        :dynamic-index="dynamicIndex"
      />
      <template v-else-if="column.component === 'wf-radio-select'">
        <WfUserSelect
          v-if="isUser(column)"
          v-model="text"
          :readonly="column.readonly"
          :disabled="column.disabled"
        />
      </template>
      <WfFeasibility
        v-if="column.component === 'wf-feasibility'"
        v-model="text"
      />
    </div>
  </div>
</template>

<script>
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
    WkfUserSelect: WfUserSelect,
    WfUserSelect,
    Customtable,
    MaterialTable,
    Vaguecustomtableselect,
  },
  props: {
    column: {
      type: Object,
      default: () => ({}),
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
      default: () => [],
    },
    labelPosition: String,
    labelWidth: Number,
    dynamicIndex: undefined,
  },
  data() {
    return { text: undefined, init: false, DATE_LIST };
  },
  computed: {
    params() {
      return this.column.params || {};
    },
    event() {
      return this.column.event || {};
    },
    isRequired() {
      return !this.validateNull(this.column.rules);
    },
    itemClass() {
      const position = this.column.type === 'dynamic' ? 'top' : this.labelPositionValue;
      return [
        `wf-form-item--${position}`,
        { 'wf-form-item--required': this.isRequired },
      ];
    },
    labelPositionValue() {
      return this.labelPosition || this.column.labelPosition || 'left';
    },
    labelStyle() {
      const width = this.column.labelWidth ?? this.labelWidth;
      if (width) {
        return {
          minWidth: `${width}rpx`,
          width: `${width}rpx`,
        };
      }
      return {};
    },
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
        const nextVal = this.validateNull(val) ? mpFormInitVal(this.column) : val;
        this.text = nextVal;
      },
      immediate: true,
    },
  },
  methods: {
    isUser(column) {
      return column?.children?.props?.url === '/blade-system/search/user';
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
  display: flex;
  align-items: flex-start;
  padding: 20rpx 0;

  &__label {
    flex: 0 0 auto;
    min-width: 160rpx;
    padding-right: 20rpx;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    color: #303133;
    font-size: 28rpx;
  }

  &__asterisk {
    color: #ee0a24;
    margin-right: 6rpx;
  }

  &__content {
    flex: 1;
    min-width: 0;
  }

  &--top {
    flex-direction: column;

    .wf-form-item__label {
      width: 100%;
      margin-bottom: 10rpx;
    }

    .wf-form-item__content {
      width: 100%;
    }
  }

  &--left {
    flex-direction: row;
  }
}
</style>
