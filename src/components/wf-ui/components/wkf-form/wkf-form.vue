<template>
    <view class="wf-form">
        <u-form class="wf-form-content" ref="form" :model="form" :error-type="['border-bottom', 'toast']">
            <template
                v-if="option.column && option.column.length > 0 
			<!-- #ifdef MP -->
			&& formCreate
			<!-- #endif -->
			"
            >
                <template v-for="(item, index) in option.column">
                    <wkf-form-item
                        v-if="item.display !== false && filter(item)"
                        v-model="form[item.prop]"
                        :ref="item.prop"
                        :column="item"
                        :disabled="
                            allDisabled ||
                            option.disabled ||
                            option.readonly ||
                            option.detail ||
                            item.disabled ||
                            item.readonly ||
                            item.detail
                        "
                        :dic="dic[item.prop]"
                        :label-width="option.labeWidth"
                        :label-position="option.labelPosition"
                        :key="index"
                        :dynamic-index="option.dynamicIndex"
                        @label-change="handleLabelChange"
                    ></wkf-form-item>
                </template>
            </template>
            <template
                v-if="option.group && option.group.length > 0 
			<!-- #ifdef MP -->
			&& formCreate
			<!-- #endif -->
			"
            >
                <u-collapse
                    :accordion="false"
                    hover-class="none"
                    :item-style="{ borderBottom: '1rpx solid #e4e7ed' }"
                    :head-style="{ padding: '38rpx 0' }"
                >
                    <template v-for="(group, gIndex) in option.group">
                        <u-collapse-item
                            v-if="group.display !== false"
                            :key="gIndex"
                            :disabled="group.arrow === true"
                            :open="group.collapse !== false"
                        >
                            <template #title>
                                <span>
                                    <u-icon
                                        v-if="group.icon"
                                        :name="group.icon.replace('el-icon-', '')"
                                        style="margin-right: 10rpx"
                                    ></u-icon>
                                    {{ group.label }}
                                </span>
                            </template>
                            <template v-for="(item, index) in group.column">
                                <wkf-form-item
                                    v-if="item.display !== false && filter(item)"
                                    v-model="form[item.prop]"
                                    :ref="item.prop"
                                    :column="item"
                                    :disabled="
                                        allDisabled ||
                                        option.disabled ||
                                        option.readonly ||
                                        option.detail ||
                                        item.disabled ||
                                        item.readonly ||
                                        item.detail
                                    "
                                    :dic="dic[item.prop]"
                                    :key="index"
                                    :label-width="option.labelWidth"
                                    :label-position="option.labelPosition"
                                    :dynamic-index="option.dynamicIndex"
                                    @label-change="handleLabelChange"
                                ></wkf-form-item>
                            </template>
                        </u-collapse-item>
                    </template>
                </u-collapse>
            </template>
        </u-form>
        <view
            v-if="
                ((option.column && option.column.length > 0) || (option.group && option.group.length > 0)) &&
                menuBtn.show
            "
            class="wf-form-bottom"
        >
            <u-button <!-- #ifdef MP -->
                :custom-style="{ width: '320rpx'}"
                <!-- #endif -->
                v-if="menuBtn.submitBtn" :loading="allDisabled" type="primary" size="medium" @click="submit" >
                {{ menuBtn.submitText }}
            </u-button>
            <slot name="menu"></slot>
            <!-- <u-button v-if="menuBtn.enptyBtn" :loading="allDisabled"  type="info" size="medium" @click="clear">{{ menuBtn.emptyText }}</u-button> -->
        </view>
    </view>
</template>

<script>
import WkfFormItem from '../wkf-form-item/wkf-form-item.vue';
import Dic from '../../mixins/dic.js';
import { formInitVal, initRules } from '../../util/dataformat.js';
import { filter } from '../../util/unsupport.js';
export default {
    name: 'wkf-form',
    mixins: [Dic],
    components: { WkfFormItem },
    props: {
        option: {
            type: Object,
            required: true,
            default: () => {
                return { column: [], menuBtn: false };
            },
        },
        value: {},
    },
    watch: {
        form: {
            handler(val) {
                if (this.formCreate) {
                    this.$emit('input', val);
                }
            },
            deep: true,
        },
        value: {
            handler(val) {
                if (this.formCreate) {
                    this.setForm(val);
                } else {
                    this.formVal = Object.assign(this.formVal, val || {});
                }
            },
            deep: true,
            immediate: true,
        },
    },
    computed: {
        column() {
            let result = [];
            const column = this.option.column;
            const group = this.option.group;
            if (!this.validateNull(column)) result = column;
            if (!this.validateNull(group)) {
                group.forEach((g) => {
                    if (!this.validateNull(g.column)) result = result.concat(g.column);
                });
            }
            return result;
        },
        dynamicOption() {
            let list = [];
            this.column.forEach((ele) => {
                if (ele.type == 'dynamic' && ele.display !== false && filter(ele)) {
                    list.push(ele);
                }
            });
            return list;
        },
        menuBtn() {
            const { menuBtn, submitBtn, enptyBtn, submitText, emptyText, detail, readonly, disabled } = this.option;
            return {
                show: menuBtn === false || detail || readonly || disabled ? false : true,
                submitBtn: submitBtn === false ? false : true,
                enptyBtn: enptyBtn === false ? false : true,
                submitText: submitText || '提交',
                emptyText: emptyText || '清空',
            };
        },
    },
    data() {
        return {
            form: {},
            rules: {},
            dic: {},
            formVal: {},
            formCreate: false,
            allDisabled: false,
        };
    },
    mounted() {
        setTimeout(() => {
            this.initDic();
            this.setForm(this.deepClone(Object.assign(formInitVal(this.column).tableForm, this.formVal)));
            this.$refs.form.setRules(initRules(this.column));
            // #ifdef MP
            this.initFunc();
            // #endif
            this.formCreate = true;
        }, 200);
    },
    methods: {
        filter,
        // 初始化字典
        initDic() {
            this.column.forEach((col) => {
                this.handleDic(col).then((dic) => {
                    if (!this.validateNull(dic)) {
                        this.$set(this.dic, col.prop, dic);
                    }
                });
            });
        },
        // #ifdef MP
        initFunc() {
            const column = this.option.column;
            const group = this.option.group;
            if (!this.validateNull(column)) {
                column.forEach((col) => {
                    col.value = this.form[col.prop];
                });
            }
            if (!this.validateNull(group)) {
                group.forEach((g) => {
                    if (!this.validateNull(g.column)) {
                        g.column.forEach((col) => {
                            col.value = this.form[col.prop];
                        });
                    }
                });
            }
        },
        // #endif
        // 表单赋值
        setForm(value) {
            Object.keys(value).forEach((ele) => {
                this.$set(this.form, ele, value[ele]);
            });
        },
        validateCellForm() {
            return new Promise((resolve) => {
                this.$refs.form.validate((valid) => {
                    resolve(valid);
                });
            });
        },
        validate(callback) {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    let dynamicList = [];
                    this.dynamicOption.forEach((ele) => {
                        if (!this.validateNull(this.$refs[ele.prop][0].$refs.temp.$refs.main)) {
                            this.$refs[ele.prop][0].$refs.temp.$refs.main.forEach((ele) => {
                                dynamicList.push(ele.validateCellForm());
                            });
                        }
                    });
                    Promise.all(dynamicList).then((res) => {
                        let count = 0;
                        res.forEach((error, index) => {
                            if (!error) count++;
                        });
                        if (count == 0) {
                            this.show();
                            callback(true, this.hide);
                        } else {
                            callback(false, this.hide);
                        }
                    });
                } else callback(false, this.hide);
            });
        },
        submit() {
            this.validate((valid) => {
                if (valid) {
                    this.$emit('submit', this.deepClone(this.form), this.hide);
                }
            });
        },
        resetFields() {
            this.$refs.form.resetFields();
        },
        show() {
            this.allDisabled = true;
        },
        hide() {
            this.allDisabled = false;
        },
        handleLabelChange({ prop, value }) {
            this.$set(this.form, `$${prop}`, value);
        },
    },
};
</script>

<style lang="scss" scoped>
.wf-form {
    padding: 0 30rpx calc(env(safe-area-inset-bottom) + 5px);
    background: #fff;

    ::v-deep.u-arrow-down-icon {
        margin-right: 0;
    }

    &-bottom {
        width: 100%;
        padding: 10rpx 30rpx calc(env(safe-area-inset-bottom) + 10rpx) 30rpx;
        position: fixed;
        background-color: white;
        z-index: 3;
        bottom: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: space-around;

        ::v-deep.u-btn {
            width: 100%;
            padding: 0;
            margin: 0 10rpx;
        }
    }
}
</style>
