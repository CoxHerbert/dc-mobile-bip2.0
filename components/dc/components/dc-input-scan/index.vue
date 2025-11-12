<template>
    <view class="input-box">
        <u-input v-bind="$attrs" v-model="value" @change="handleChange" />
        <u-icon v-if="!disabled" class="icon" name="scan" @click="handleScanCode"></u-icon>
        <dc-scan-code
            v-if="show"
            ref="scanCodeRef"
            @confirm="
                (val) => {
                    handleChange(val);
                }
            "
        />
    </view>
</template>
<script>
export default {
    name: 'dc-inpit-scan',
    props: {
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            show: false,
            value: null,
        };
    },
    watch: {
        modelValue: {
            handler(newVal) {
                this.value = newVal;
            },
            deep: true,
            immediate: true,
        },
        value: {
            handler(newVal) {
                this.value = newVal;
                this.$emit('input', newVal);
                this.$emit('change', newVal);
            },
            deep: true,
            immediate: true,
        },
    },
    methods: {
        handleScanCode() {
            this.show = true;
            this.$nextTick(() => {
                this.$refs.scanCodeRef
                    .open()
                    .then((val) => {
						console.log(val)
                        this.value = val;
                        this.$emit('input', val);
                        this.$emit('change', val);
                        this.show = false;
                    })
                    .catch((err) => {
                        this.show = false;
                    });
            });
        },
        handleChange(val) {
            this.value = val;
            this.$emit('input', val);
            this.$emit('change', val);
        },
    },
};
</script>
<style lang="scss" scoped>
.input-box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    .icon {
        width: 60rpx;
    }
}
</style>
