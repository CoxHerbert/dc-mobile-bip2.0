<template>
    <view class="wf-user-select">
        <view class="wf-user-select__field" @click="handleSelect">
            <u-field
                disabled
                v-model="name"
                :placeholder="placeholder || '人员选择'"
                label-width="0"
                right-icon="search"
            ></u-field>
        </view>
        <wkf-user-select
            ref="user-select"
            echo
            :check-type="checkType"
            :default-checked="value"
            @onConfirm="handleUserSelectConfirm"
        ></wkf-user-select>
    </view>
</template>

<script>
import { getUser } from '@/api/user.js';
import WkfUserSelect from '../../wf-user-select/index.vue';

export default {
    name: 'user-select',
    components: { WkfUserSelect },
    watch: {
        value: {
            handler(val) {
                if (val) {
                    const name = [];
                    const checks = (val + '').split(',');
                    const asyncList = [];
                    checks.forEach((c) => {
                        asyncList.push(getUser(c));
                    });
                    Promise.all(asyncList).then((res) => {
                        res.forEach((r) => {
                            const data = r.data;
                            if (data) name.push(data.realName);
                        });
                        this.$set(this, 'name', name.join(','));
                    });
                } else {
                    this.$set(this, 'name', '');
                }
            },
            immediate: true,
        },
    },
    props: {
        value: [String, Number],
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
        userUrl: {
            type: String,
            default: () => {
                return '';
            },
        },
    },
    data() {
        return {
            name: '',
        };
    },
    methods: {
        handleSelect() {
            if (this.readonly || this.disabled) return;
            else this.$refs['user-select'].visible = true;
        },
        handleUserSelectConfirm(id) {
            this.$emit('input', id);
        },
    },
};
</script>

<style lang="scss" scoped>
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

    ::v-deep.u-field {
        padding: 10rpx 0px;
        &::after {
            border: none !important;
        }
    }
}
</style>
