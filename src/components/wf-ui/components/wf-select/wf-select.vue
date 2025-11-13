<template>
  <div class="wf-select">
    <van-field
      v-model="textLabel"
      is-link
      readonly
      :placeholder="getPlaceholder(column, column.type)"
      :label="column.label"
      :disabled="disabled"
      @click="onClick"
    />
    <van-popup v-model:show="show" position="bottom">
      <van-picker
        :columns="pickerColumns"
        show-toolbar
        :title="column.label"
        @confirm="handleSubmit"
        @cancel="handleCancel"
      />
    </van-popup>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Field, Picker, Popup } from 'vant';
import Props from '../../mixins/props.js';

export default defineComponent({
  name: 'WfSelect',
  components: {
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  mixins: [Props],
  data() {
    return {
      show: false,
    };
  },
  computed: {
    pickerColumns() {
      return (this.dic || []).map((item) => ({
        text: item[this.labelKey],
        value: item[this.valueKey],
        raw: item,
      }));
    },
  },
  watch: {
    dic: {
      handler(val) {
        if (!this.validateNull(val)) {
          this.initTextLabel();
        }
      },
      deep: true,
    },
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.show = true;
      }
      this.handleClick();
    },
    handleCancel() {
      this.show = false;
    },
    handleSubmit(payload) {
      const selectedValues = Array.isArray(payload?.selectedValues)
        ? payload.selectedValues
        : Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.value)
        ? payload.value
        : [payload?.value ?? payload?.selectedValue ?? payload];
      const [selected] = selectedValues;
      const rawOption = (this.dic || []).find((item) => item[this.valueKey] === selected);
      const label = rawOption ? rawOption[this.labelKey] : '';
      this.text = selected;
      this.textLabel = label;
      this.$emit('label-change', label);
      this.show = false;
      this.handleChange(this.text);
    },
  },
});
</script>

<style lang="scss" scoped>
.wf-select {
  width: 100%;
}
</style>
