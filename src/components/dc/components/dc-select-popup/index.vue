<template>
    <view class="comp-dc-select-popup">
        <view class="input-wrapper">
            <view v-if="value" class="placholder">{{ value }}</view>
            <view v-else class="placholder">{{ placeholder }}</view>
        </view>
        <u-popup v-model="visible" mode="bottom" height="90%" border-radius="14" safe-area-inset-bottom>
            <view class="search-item">
                <view class="search-item-input">
                    <u-search
                        :placeholder="`请输入来源订单`"
                        v-model="searchFormData.code"
                        shape="square"
                        :clearabled="true"
                        :show-action="false"
                        bg-color="#f6f6f6"
                        @search="getList(true)"
                        @clear="clear"
                    ></u-search>
                </view>
            </view>
        </u-popup>
    </view>
</template>
<script>
export default {
    name: 'dc-select-popup',
    props: {
        value: {
            type: String,
            default() {
                return '';
            },
        },
        placeholder: {
            type: String,
            default() {
                return '';
            },
        },
        objectName: {
            type: String,
            default() {
                return '';
            },
            required: true,
        },
    },
    data() {
        return {
            visible: false,
        };
    },
};
</script>
<style lang="scss">
.comp-dc-select-popup {
    position: relative;
    .value {
        line-height: 21px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .placholder {
        line-height: 21px;
        font-size: 14px;
        color: rgb(192, 196, 204);
    }
}
</style>
