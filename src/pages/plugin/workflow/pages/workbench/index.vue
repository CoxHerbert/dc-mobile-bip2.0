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
            <wkf-card v-if="list.length > 0" :list="list" show-btn @refresh="refreshTodo"></wkf-card>
        </view>
        <wf-empty v-else text="工作再忙，也要记得喝水"></wf-empty>

        <image
            class="creat"
            src="@/static/images/tabbar/creact.png"
            @click.stop="handleJump(girdList[1])"
        ></image>
    </view>
</template>
<script>
import { defineComponent } from 'vue';
import { mapState, mapActions } from 'pinia';
import { useWorkflowStore } from '@/store/workflow.js';
import wkfCard from '../../components/wf-card/index';

export default defineComponent({
    name: 'WorkflowWorkbenchPage',
    components: { wkfCard },
    data() {
        return {
            wfImage: this.wfImage || 'https://oss.nutflow.vip/rider',
            girdList: [
                {
                    name: '我的待办',
                    type: 'db',
                    location: { name: 'WorkflowMine', query: { current: '0' } },
                },
                {
                    name: '我的请求',
                    type: 'qq',
                    location: { name: 'WorkflowMine', query: { current: '1' } },
                },
                {
                    name: '我的已办',
                    type: 'yb',
                    location: { name: 'WorkflowMine', query: { current: '2' } },
                },
                {
                    name: '办结事宜',
                    type: 'bj',
                    location: { name: 'WorkflowMine', query: { current: '3' } },
                },
            ],
        };
    },
    computed: {
        ...mapState(useWorkflowStore, {
            list: (store) => store.todoItems,
            total: (store) => store.todoTotal,
        }),
    },
    mounted() {
        this.refreshTodo();
    },
    methods: {
        ...mapActions(useWorkflowStore, ['fetchTodoList']),
        async refreshTodo() {
            try {
                await this.fetchTodoList({ current: 1, size: 5 });
            } catch (error) {
                console.error('[workflow] 获取待办失败', error);
            }
        },
        handleJump(item) {
            if (!item || !item.location) {
                return;
            }
            const { location } = item;
            const { replace = false, ...locationConfig } = location;
            const navigation = replace ? this.$router.replace : this.$router.push;
            navigation.call(this.$router, locationConfig);
        },
    },
});
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
        padding-top: 120rpx;
        /* #endif */
    }
    .grid-item {
        display: flex;
        flex-wrap: wrap;
        padding: 0 24rpx;
        margin-top: -120rpx;
        .item {
            width: 50%;
            padding: 40rpx 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            .icon {
                width: 120rpx;
                height: 120rpx;
                margin-bottom: 20rpx;
            }
            .name {
                font-size: 30rpx;
                color: #333;
            }
        }
    }
    .card-item {
        margin-top: 20rpx;
        padding: 0 24rpx 40rpx;
        .title {
            display: flex;
            align-items: center;
            margin-bottom: 20rpx;
            .line {
                width: 6rpx;
                height: 32rpx;
                background: #5470c4;
                border-radius: 3rpx;
                margin-right: 16rpx;
            }
        }
    }
}
</style>
