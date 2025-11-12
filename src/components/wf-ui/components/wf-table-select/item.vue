<template>
    <view class="wf-table-select__content--item">
        <label>
            <checkbox
                v-if="multiple"
                class="transform7"
                :value="item[valueKey]"
                :checked="selectionList.findIndex((s) => s[valueKey] == item[valueKey]) > -1"
            ></checkbox>
            <radio
                v-else
                class="transform7"
                :value="item[valueKey]"
                :checked="Array.from(selectionList).findIndex((s) => s[valueKey] == item[valueKey]) > -1"
            ></radio>
            <view class="row">
                <view class="row-item" v-for="(col, cIndex) in cColumn" :key="cIndex">
                    <view class="row-label" v-if="col.prop != 'avatar'">{{ col.label }}:</view>
                    <view class="row-value" v-if="col.prop != 'avatar'">{{ item[col.prop] }}</view>

                    <!-- <img
                        v-if="col.prop != 'avatar' && item[col.prop]"
                        :src="item[col.prop]"
                        mode="scaleToFill"
                        class="img"
                    ></img> -->
                </view>
            </view>
        </label>
        <view
            style="min-width: 50rpx"
            v-if="item[childrenKey] || item[hasChildrenKey]"
            @click="handleRowExpand(item, index)"
        >
            <u-icon name="arrow-up" v-if="arrowKeys.includes(item[valueKey])"></u-icon>
            <u-icon name="arrow-down" v-else></u-icon>
        </view>
    </view>
</template>

<script>
import Item from '../wf-table-select/item.vue';
export default {
    name: 'item',
    components: {
        Item,
    },
    props: {
        item: Object,
        valueKey: String,
        childrenKey: String,
        hasChildrenKey: String,
        multiple: Boolean,
        selectionList: Array,
        cColumn: Array,
        arrowKeys: Array,
        index: Number,
    },
    data() {
        return {};
    },
    methods: {
        handleRowChange(e) {
            const { value } = e.detail;
            this.$emit('row-change', value);
        },
        handleRowExpand(row, index) {
            this.$emit('row-expand', { row, index });
        },
    },
};
</script>

<style lang="scss" scoped>
.transform7 {
    transform: scale(0.7);
}
.img {
    width: 80rpx;
    height: 80rpx;
}

.wf-table-select__content--item {
    background-color: #fff;
    margin: 16rpx;
    border-radius: 16rpx;
    padding: 16rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    label {
        display: flex;
        align-items: center;
    }

    .row {
        margin-left: 20rpx;

        &-item {
            display: flex;
            align-items: center;
        }

        &-label {
            color: #999;
            font-size: 28rpx;
            margin-right: 6rpx;
        }

        &-value {
            flex: 1;
            color: #565656;
            font-size: 28rpx;
            word-break: break-all;
            word-wrap: break-word;
            white-space: pre-wrap;
        }
    }
}
</style>
