<template>
    <view class="container">
        <view class="head-item">
            <view class="search-item">
                <u-search
                    placeholder="请输入流程名称"
                    v-model="searchValue"
                    shape="square"
                    bg-color="#8EAAFF"
                    placeholder-color="#5470C4"
                    color="#fff"
                    search-icon-color="#ffffffE5"
                    :clearabled="true"
                    :show-action="false"
                    @search="getList(true)"
                    @clear="getList(true)"
                ></u-search>
            </view>
        </view>
        <u-collapse :accordion="false" :head-style="headStyle" :item-style="collapseItem" v-if="list.length > 0">
            <u-collapse-item :title="item.category" v-for="(item, index) in list" :key="index" :open="true">
                <view
                    class="item flex-between flex-c"
                    v-for="(c, cIndex) in item.processList"
                    :key="cIndex"
                    @click="
                        () => {
                            refreshToken(c);
                        }
                    "
                >
                    <image
                        :src="c.icon || wfImage + `/create/icon_${parseInt(cIndex % 10)}.png`"
                        mode=""
                        class="icon"
                    ></image>
                    <view class="flex-one r">
                        <view class="name txt-cut1">{{ c.processDefinitionName }}</view>
                        <!-- <view class="num txt-cut1">{{ c.processDefinitionKey }}</view> -->
                    </view>
                </view>
            </u-collapse-item>
        </u-collapse>
        <wf-empty v-else text="工作再忙，也要记得喝水"></wf-empty>
    </view>
</template>
<script>
import { list } from '../../api/process.js';
import exForm from '../../mixins/ex-form.js';
export default {
    mixins: [exForm],
    data() {
        return {
            // #ifdef MP
            wfImage: this.wfImage,
            // #endif
            searchValue: '',
            collapseItem: {
                padding: '0 30rpx',
                borderBottom: '1px solid #f0f2f5',
            },
            headStyle: {
                color: '#333',
                fontSize: '30rpx',
                fontWeight: 'bold',
                padding: '40rpx 0',
            },
            list: [],
        };
    },
    onLoad() {
        this.$nextTick(() => {
            uni.startPullDownRefresh();
        });
    },
    onPullDownRefresh() {
        this.getList();
    },
    methods: {
        getList() {
            const param = { processDefinitionName: this.searchValue };
            // #ifdef H5
            param.platform = 'h5';
            // #endif
            // #ifdef MP-WEIXIN
            param.platform = 'mp-wx';
            // #endif
            // #ifdef APP
            switch (uni.getSystemInfoSync().platform) {
                case 'android':
                    param.platform = 'android';
                    break;
                case 'ios':
                    param.platform = 'ios';
                    break;
                default:
                    break;
            }
            // #endif
            list(param).then((res) => {
                this.list = res.data || [];
                uni.stopPullDownRefresh();
            });
        },
        refreshToken(c) {
            let userInfo = uni.getStorageSync('loginInfo');
            userInfo &&
                this.$store.dispatch('refreshTokenFn', userInfo).then((res) => {
                    this.dynamicRoute(c, 'start');
                });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../static/styles/common';
.container {
    .head-item {
        width: 100%;
        height: 150rpx;
        padding: 50rpx 30rpx 0;
        background: url('https://oss.nutflow.vip/rider/mine/head_bg.png') no-repeat;
        background-size: 100% 100%;
    }
    /* #ifdef MP-WEIXIN*/
    .head-item {
        height: 290rpx;
        padding: 184rpx 30rpx 0;
    }
    /* #endif */

    .item {
        margin-bottom: 30rpx;
        .r {
            word-break: break-all;
        }
        .icon {
            width: 86rpx;
            height: 86rpx;
            border-radius: 50%;
            margin-right: 20rpx;
        }
        .name {
            font-size: 30rpx;
            color: #333;
        }
        .num {
            font-size: 26rpx;
            color: #a09fa5;
        }
    }
}
</style>
