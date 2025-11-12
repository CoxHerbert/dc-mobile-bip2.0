<template>
    <view
        class="dc-drag-button"
        :style="{ bottom: `${position.bottom}px`, right: `${position.right}px` }"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @click="handleClick"
    >
        <slot></slot>
    </view>
</template>

<script>
export default {
    name: 'dc-drag-button',
    props: {
        bottom: { type: Number, default: 10 },
        right: { type: Number, default: 10 },
        width: { type: Number, default: 100 }, // 按钮宽度
        height: { type: Number, default: 100 }, // 按钮高度
    },
    data() {
        return {
            position: {
                bottom: this.bottom,
                right: this.right,
            },
            startX: 0,
            startY: 0,
            windowWidth: 0,
            windowHeight: 0,
        };
    },
    mounted() {
        const sys = uni.getSystemInfoSync();
        this.windowWidth = sys.windowWidth;
        this.windowHeight = sys.windowHeight;
    },
    methods: {
        touchStart(e) {
            this.startX = e.touches[0].clientX;
            this.startY = e.touches[0].clientY;
        },
        touchMove(e) {
            const moveX = e.touches[0].clientX;
            const moveY = e.touches[0].clientY;
            const diffX = moveX - this.startX;
            const diffY = moveY - this.startY;

            this.position.right -= diffX;
            this.position.bottom -= diffY;

            this.startX = moveX;
            this.startY = moveY;
        },
        touchEnd() {
            // 限制 right 在 [0, windowWidth - width]
            const minRight = 0;
            const maxRight = this.windowWidth - this.width;
            this.position.right = Math.min(Math.max(this.position.right, minRight), maxRight);

            // 限制 bottom 在 [0, windowHeight - height]
            const minBottom = 0;
            const maxBottom = this.windowHeight - this.height;
            this.position.bottom = Math.min(Math.max(this.position.bottom, minBottom), maxBottom);
        },
        handleClick() {
            this.$emit('click');
        },
    },
};
</script>

<style scoped>
.dc-drag-button {
    position: fixed;
    width: 100rpx;
    height: 100rpx;
    background-color: #007aff;
    color: white;
    border-radius: 50%;
    font-size: 32rpx;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    box-shadow: 0 4rpx 20rpx rgba(0, 0, 0, 0.3);
}
</style>
