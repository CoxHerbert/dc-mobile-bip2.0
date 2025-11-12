<template>
    <view class="dc-field">
        <view class="dc-field-label">{{ label }}{{ labelSuffix }}</view>
        <view class="dc-field-value">
            <slot></slot>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        label: {
            type: String,
            default: '',
        },
        labelSuffix: {
            type: String,
            default: '',
        },
    },
};
</script>
<style lang="scss" scoped>
.dc-field {
    display: flex;
    align-items: center;
    &-label {
        margin-right: 5px;
        color: #322d2d;
        white-space: nowrap;
    }
    &-value {
        display: flex;
        align-items: center;
        color: #000;
        flex: 1;
    }
}
</style>
