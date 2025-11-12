<template>
    <view class="wf-user-select flex">
        <view class="width50">
            <span @click="onClick">
                <u-field
                    disabled
                    v-model="tenantName"
                    placeholder="租户选择"
                    label-width="0"
                    right-icon="arrow-down"
                ></u-field>
            </span>
            <u-select
                v-model="show"
                :list="tenantList"
                mode="single-column"
                title="租户选择"
                @confirm="handleSubmit"
            ></u-select>
        </view>
        <view class="width50 ml" @click="handleSelect">
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
            :params="{
                fuseorgid: this.fuseorgid,
            }"
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

export default {
    name: 'customtable-select',
    components: { WkfCustomtableSelect },
    watch: {
        value: {
            handler(val) {
                if (val && typeof val === 'object' && val.hasOwnProperty('id')) {
                    this.$set(this, 'name', val[this.column.props.label] || '');
                } else {
                    this.$set(this, 'name', '');
                }
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
                return '';
            },
        },
    },

    computed: {
        cColumn() {
            return this.column;
        },
    },
    data() {
        return {
            tenantName: '',
            fuseorgid: '',
            show: false,
            name: '',
            tenantList: [],
        };
    },

    mounted() {
        this.getTenantListList();
    },
    methods: {
        handleSubmit(data) {
            this.tenantName = data[0].label;
            this.fuseorgid = data[0].value;
        },
        // 获取租户列表
        getTenantListList() {
            return new Promise((resolve, reject) => {
                this.$u.api.tenantList({}).then((res) => {
                    if (res.code == 200) {
                        this.tenantList = res.data.map((item) => {
                            if (item.id == '100006') {
                                this.tenantName = item.orgName;
                                this.fuseorgid = item.orgId;
                            }
                            return {
                                label: item.orgName,
                                value: item.orgId,
                            };
                        });

                        resolve(true);
                    } else {
                        reject(false);
                    }
                });
            });
        },
        onClick() {
            this.show = true;
        },
        handleSelect() {
            if (!this.fuseorgid) {
                uni.showToast({
                    icon: 'none',
                    title: '请先选择租户',
                });
                return false;
            }
            if (this.readonly || this.disabled) return;
            else this.$refs['user-select'].visible = true;
        },
        handleUserSelectConfirm(selectData) {
            this.$emit('label-change', selectData);
        },
    },
};
</script>

<style lang="scss" scoped>
.flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .width50 {
        width: 46%;
    }
    .ml {
        margin-left: 8%;
    }
    .u-field {
        padding: 22rpx 0px !important;
    }
}
.wf-user-select {
    width: 100%;

    &__field {
        position: relative;

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
}
</style>
