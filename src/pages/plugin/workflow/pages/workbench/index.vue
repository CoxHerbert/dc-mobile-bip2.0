<template>
    <view class="home-container">
        <!-- 头部 -->
        <view class="head-item">
            <view class="title">工作台</view>
            <view class="tips">{{ total > 0 ? `目前有${total}个待办事宜` : '目前没有待办事宜, 可以放松一下啦' }}</view>
        </view>
        <!-- gird -->
        <view class="grid-item">
            <view v-for="(item, index) in girdList" :key="index" @click="handleJump(item)" class="item">
                <image :src="wfImage + `/home/icon_${item.type}.png`" class="icon"></image>
                <view class="name">{{ item.name }}</view>
            </view>
        </view>

        <!-- 我的待办 -->
        <view class="card-item" v-if="list.length > 0">
            <view class="title">
                <view class="line"></view>
                <u-section
                    title="我的待办"
                    font-size="34"
                    :show-line="false"
                    @click="handleJump(girdList[0])"
                ></u-section>
            </view>
            <wkf-card v-if="list.length > 0" :list="list" show-btn @refresh="getTodoList()"></wkf-card>
        </view>
        <wf-empty v-else text="工作再忙，也要记得喝水"></wf-empty>

        <image
            class="creat"
            src="@/static/images/tabbar/creact.png"
            @click.stop="handleJump({ url: '/pages/plugin/workflow/pages/create/index' })"
        ></image>
    </view>
</template>
<script>
import { todoList } from '../../api/process.js';
import wkfCard from '../../components/wf-card/index';
export default {
    components: { wkfCard },
    data() {
        return {
            // #ifdef MP
            wfImage: this.wfImage,
            // #endif
            girdList: [
                {
                    name: '我的待办',
                    type: 'db',
                    url: '/pages/plugin/workflow/pages/mine/index?current=0',
                },
                {
                    name: '我的请求',
                    type: 'qq',
                    url: '/pages/plugin/workflow/pages/mine/index?current=1',
                },
                {
                    name: '我的已办',
                    type: 'yb',
                    url: '/pages/plugin/workflow/pages/mine/index?current=2',
                },
                {
                    name: '办结事宜',
                    type: 'bj',
                    url: '/pages/plugin/workflow/pages/mine/index?current=3',
                },
            ],
            list: [],
            total: 0,
        };
    },
    onShow() {
        this.$nextTick(() => {
            uni.startPullDownRefresh();
        });
    },
    onPullDownRefresh() {
        this.getTodoList();
    },
    methods: {
        getTodoList() {
            todoList({ current: 1, size: 5 }).then((res) => {
                const { records, total } = res.data;
                this.list = records;
                this.total = total;
                uni.stopPullDownRefresh();
            });
        },
        handleJump(item) {
            uni.navigateTo({ url: item.url });
        },
    },
};
</script>
<style>
page {
    background: #f6f6f6;
}
</style>
<style lang="scss" scoped>
page {
    background: #f6f6f6;
}
.home-container {
    .creat {
        position: fixed;
        right: 10px;
        bottom: 20%;
        width: 100rpx;
        height: 100rpx;
    }
    .head-item {
        width: 100%;
        height: 390rpx;
        padding: 50rpx 30rpx 0;
        background: url('https://oss.nutflow.vip/rider/home/head_bg.png') no-repeat;
        background-size: 100% 100%;
        /* #ifdef MP-WEIXIN */
        height: 460rpx;
        padding: 90rpx 30rpx 0;
        /* #endif */
        .title {
            color: #fff;
            font-size: 50rpx;
        }
        .tips {
            margin-top: 15rpx;
            display: inline-block;
            padding: 7rpx 16rpx;
            background: #628bff;
            border-radius: 6rpx;
            font-size: 24rpx;
            color: #fff;
        }
    }
    .grid-item {
        width: 690rpx;
        height: 210rpx;
        background: #fff;
        box-shadow: 0px 2rpx 10rpx 0rpx rgba(204, 204, 204, 0.14);
        border-radius: 20rpx;
        margin: -170rpx auto 20rpx;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .item {
            text-align: center;
            .icon {
                width: 70rpx;
                height: 70rpx;
                margin-bottom: 10rpx;
            }
            .name {
                font-size: 26rpx;
                color: #222;
                font-weight: 600;
            }
        }
    }
    .card-item {
        .title {
            position: relative;
            padding: 30rpx;
            background: #fff;
            margin: 20rpx 30rpx -12rpx;
            border-top-right-radius: 16rpx;
            border-top-left-radius: 16rpx;
        }

        .line {
            position: absolute;
            top: 50rpx;
            left: 74rpx;
            width: 92rpx;
            height: 14rpx;
            background: linear-gradient(90deg, rgba(75, 198, 255, 1) 0%, rgba(186, 156, 242, 1) 100%);
        }
        .title:after {
            position: absolute;
            bottom: 0;
            left: 30rpx;
            right: 30rpx;
            content: '';
            width: 630rpx;
            height: 2rpx;
            background: #d3d3d3;
            z-index: 1;
        }
    }
}
</style>
