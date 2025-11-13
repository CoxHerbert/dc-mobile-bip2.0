<template>
  <div class="wf-user-select">
    <div class="wf-user-select__field" @click="handleSelect">
      <van-field
        v-model="name"
        :placeholder="placeholder || '请选择'"
        label-width="0"
        right-icon="search"
        readonly
        clickable
        :disabled="readonly || disabled || isDisabled"
      />
    </div>
    <WkfCustomtableSelect
      ref="user-select"
      echo
      :cColumn="column"
      :check-type="checkType"
      :default-checked="value.id ? value.id : ''"
      @onConfirm="handleUserSelectConfirm"
      :fnUrl="column.children.props.url"
    ></WkfCustomtableSelect>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { debounce } from 'lodash';
import { laborRegisterDetail } from '@/api/user.js';
import WkfCustomtableSelect from '../../wf-customtable-select/index.vue';

export default defineComponent({
  name: 'customtable-select',
  components: { WkfCustomtableSelect },
  props: {
    value: {
      type: [Object, Array, String, Number],
      default: () => ({ id: '' }),
    },
    checkType: {
      type: String,
      default: 'radio',
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: String,
    column: {
      type: Object,
      default: () => ({
        children: {
          props: {
            url: '',
          },
        },
      }),
    },
    fnUrl: {
      type: String,
      default: '/blade-bip/laborRegister/list-select',
    },
  },
  data() {
    return {
      name: '',
      isDisabled: false,
      lastId: null,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val && typeof val === 'object' && Object.prototype.hasOwnProperty.call(val, 'id')) {
          this.name = val[this.column?.props?.label] || '';
        } else {
          this.name = '';
        }
      },
      immediate: true,
      deep: true,
    },
  },
  mounted() {
    this.feedback();
  },
  methods: {
    feedback: debounce(function () {
      const loginInfo = this.$store?.getters?.loginInfo || this.readLocalLogin();
      const userId = loginInfo?.user_id;
      if (!this.disabled && userId && !this.name) {
        this.getLaborRegisterList(userId);
      }
    }, 300),
    readLocalLogin() {
      try {
        const stored = window.localStorage.getItem('loginInfo');
        return stored ? JSON.parse(stored) : null;
      } catch (error) {
        return null;
      }
    },
    async getLaborRegisterList(userId) {
      const res = await laborRegisterDetail({ createUser: userId });
      if (res && res.code === 200 && res.data) {
        this.name = res.data.name;
        this.isDisabled = !!res.data.name;
        this.$emit('label-change', res.data);
      }
    },
    handleSelect() {
      if (this.readonly || this.disabled || this.isDisabled) return;
      this.$refs['user-select'].visible = true;
    },
    handleUserSelectConfirm(selectData) {
      this.$emit('label-change', selectData);
    },
  },
});
</script>

<style lang="scss" scoped>
.wf-user-select {
  width: 100%;

  &__field {
    position: relative;
  }
}
</style>
