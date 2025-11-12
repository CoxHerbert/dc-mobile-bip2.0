<template>
    <view class="comp-dc-raido">
        <view class="title">点击选择 <view @click="handleSure" class="btn-submit">确定</view></view>
        <view class="content">
            <view class="list-box">
                <view
                    v-for="(item, i) in options"
                    :key="i"
                    class="item"
                    :class="{
                        active: value === item[valueKey],
                    }"
                    @click="handleClickItem(item)"
                >
                    <view class="item-icon"></view>
                    <view class="label">{{ item[labelKey] }}({{ item[valueKey] }})</view>
                    <slot :name="item[valueKey]" :index="i" :item="item"></slot>
                </view>
            </view>
        </view>
    </view>
</template>
<script>
export default {
    name: 'dc-radio',
    data() {
        return {};
    },
    props: {
        disabled: {
            type: Boolean,
            default() {
                return false;
            },
        },
        value: {
            type: [String, Number, Object],
            default() {
                return null;
            },
        },
        labelKey: {
            type: String,
            default() {
                return 'label';
            },
        },
        valueKey: {
            type: String,
            default() {
                return 'value';
            },
        },
        options: {
            type: Array,
            default() {
                return [];
            },
        },
    },
    methods: {
        handleSure() {
            this.$emit('close');
        },
        handleClickItem(item) {
            const valueSet = item?.[this.valueKey] || null;
            this.$emit('input', valueSet);
            this.$emit('change', valueSet);
        },
    },
};
</script>
<style lang="scss">
.comp-dc-raido {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    position: relative;
    .item {
        border-bottom: 1px solid #eaeaeb;
        padding: 0 20px;
        width: 100%;
        height: 48px;
        display: flex;
        flex-flow: row nowrap;
        .item-icon {
            position: relative;
            width: 32px;
            height: 48px;
            margin-right: 8px;
            &::before,
            &::after {
                transition: all ease-in 0.2s;
                content: ' ';
                position: absolute;
                // left: 50%;
                // top: 50%;
                // transform: translate(-50%, -50%);
            }

            &::before {
                left: 50%;
                top: 50%;
                transform: translate(-50%, -50%);
                width: 20px;
                height: 20px;
                border-radius: 4px;
                border: 1px solid #999;
            }
        }

        &.active {
            .item-icon {
                &::before {
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 20px;
                    height: 20px;
                    border-radius: 4px;
                    border: 1px solid #2979ff;
                }

                &::after {
                    width: 10px;
                    height: 6px;
                    left: 50%;
                    top: 50%;
                    transform-origin: center center;
                    transform: rotate(-45deg) translate(-1px, -8px);
                    border-left: 2px solid #2979ff;
                    border-bottom: 2px solid #2979ff;
                }
            }
        }
        .label {
            font-size: #333;
            line-height: 48px;
        }
    }

    .title {
        justify-content: space-between;
        display: flex;
        padding-left: 16px;
        padding-right: 16px;
        font-weight: bold;
        font-size: 16px;
        line-height: 48px;
        border-bottom: 1px solid #eaeaeb;
    }

    .content {
        height: calc(100% - 48px);
        overflow: hidden;
        overflow-y: scroll;
    }

    .list-box {
        padding-bottom: 200px;
    }
}

.btn-submit {
    height: 32px;
    padding: 0 16px;
    border-radius: 4px;
    line-height: 32px;
    justify-self: flex-end;
    background-color: #ff824e;
    color: #fff;
    transform: translateY(8px);
}
</style>
