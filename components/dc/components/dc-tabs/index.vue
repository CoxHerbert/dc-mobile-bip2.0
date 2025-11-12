<template>
    <view class="tabs">
        <view
            class="tab"
            v-for="(item, index) in tabs"
            :key="index"
            :class="{ isActive: item.value === innerValue }"
            @click="onTabClick(item.value)"
        >
            {{ item.label }}
        </view>
    </view>
</template>

<script>
export default {
    name: 'DcTabs',
    props: {
        value: {
            type: [String, Number],
            default: '',
        },
        tabs: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            innerValue: this.value,
        };
    },
    watch: {
        value(newVal) {
            this.innerValue = newVal;
        },
    },
    methods: {
        onTabClick(val) {
            this.innerValue = val;
            this.$emit('input', val); // 支持 v-model
            this.$emit('change', val); // 可选的事件
        },
    },
};
</script>

<style scoped lang="scss">
.tabs {
    display: flex;
    flex: 1;
    gap: 10rpx;

    .tab {
        flex: 1;
        text-align: center;
        padding: 12rpx 20rpx;
        color: #666;
        font-size: 28rpx;
        position: relative;
        border: 1rpx solid #ccc;
        border-radius: 20rpx;
    }

    .tab.isActive {
        color: #fff;
        font-weight: bold;
        background: #f26c0c;
        border: 1rpx solid #f26c0c;
    }
}
</style>
