<template>
    <view class="wf-user-select">
        <view class="wf-user-select__field" @click="handleSelect">
            <u-field
                v-model="name"
                :placeholder="placeholder || '请选择'"
                label-width="0"
                right-icon="search"
            ></u-field>
        </view>
        <WkfCustomtableSelect
            ref="user-select"
            echo
            :cColumn="column"
            :check-type="checkType"
            :default-checked="value.id ? value.id : ''"
            @onConfirm="handleUserSelectConfirm"
            :fnUrl="column.children.props.url"
        ></WkfCustomtableSelect>
    </view>
</template>

<script>
import WkfCustomtableSelect from '../../wf-customtable-select/index.vue';
import { debounce } from 'lodash';

export default {
    name: 'customtable-select',
    components: { WkfCustomtableSelect },
    watch: {
        value: {
            handler(val) {
                console.log(val);
                // 只有当id实际变化时才执行
                // if (val?.id !== this.lastId) {
                //     this.lastId = val?.id;
                //     if (val && typeof val === 'object' && val.hasOwnProperty('id')) {
                //         this.$set(this, 'name', val[this.column.props.label] || '');
                //     } else {
                //         this.$set(this, 'name', '');
                //     }
                //     this.feedback();
                // }
                if (val && typeof val === 'object' && val.hasOwnProperty('id')) {
                    this.$set(this, 'name', val[this.column.props.label] || '');
                } else {
                    this.$set(this, 'name', '');
                }
                // this.feedback();
            },
            immediate: true,
        },
    },
    props: {
        value: {
            type: [Object, Array, String, Number],
            default: () => ({ id: '' }), // 默认值是一个包含 id 的对象
        },
        checkType: {
            // radio单选 checkbox多选
            type: String,
            default: () => {
                return 'radio';
            },
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
            default: () => {
                return '/blade-bip/laborRegister/list-select';
            },
        },
    },

    computed: {
        cColumn() {
            console.log(this.column);
            return this.column;
        },
    },
    data() {
        return {
            name: '',
            isDisabled: false,
            lastId: null, // 添加lastId用于跟踪id变化
        };
    },
    mounted() {
        console.log(this.column, '------');
    },
    methods: {
        // 回显
        feedback: debounce(function () {
            let that = this;
            let user_id = that.$store.getters.loginInfo?.user_id || uni.getStorageSync('loginInfo')?.user_id;
            if (!that.disabled && user_id && !this.name) {
                that.getLaborRegisterList(user_id);
                //this.getLaborRegisterList('18895007349829226337');
            }
        }, 300),
        // 获取人员选择
        getLaborRegisterList(userid) {
            this.$u.api
                .laborRegisterDetail({
                    createUser: userid,
                })
                .then(async (res) => {
                    let { code, data } = res;
                    if (code == 200) {
                        this.$set(this, 'name', data.name);
                        this.$set(this, 'isDisabled', data.name ? true : false);
                        this.$emit('label-change', data);
                    }
                });
        },

        handleSelect() {
            if (this.readonly || this.disabled || this.isDisabled) return;
            else this.$refs['user-select'].visible = true;
        },
        handleUserSelectConfirm(selectData) {
            this.$emit('label-change', selectData);
        },
    },
};
</script>

<style lang="scss" scoped>
.wf-user-select {
    width: 100%;

    &__field {
        position: relative;
        .u-field {
            padding: 22rpx 0px;
        }
        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 90%;
            height: 90%;
            z-index: 100;
            content: '';
        }
    }
    ::v-deep.u-field {
        padding: 10rpx 0px;
        &::after {
            border: none !important;
        }
    }
}
</style>
