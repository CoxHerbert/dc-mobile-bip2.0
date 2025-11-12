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

            <u-tabs
                :list="tabList"
                :current="current"
                bg-color="transparent"
                active-color="#fff"
                inactive-color="#C7D5FF"
                @change="handleTabClick"
            ></u-tabs>
        </view>

        <view class="main" v-if="list.length > 0">
            <wkf-card :list="list" :show-btn="showBtn" :type="current" @refresh="getList(true)"></wkf-card>
            <u-loadmore :status="loadStatus" @loadmore="getList()" />
        </view>
        <wf-empty v-else text="工作再忙，也要记得喝水"></wf-empty>
        <u-back-top :scroll-top="scrollTop"></u-back-top>
    </view>
</template>
<script>
import { todoList, doneList, myDoneList, sendList } from '../../api/process.js';
import wkfCard from '../../components/wf-card/index';
export default {
    components: { wkfCard },
    data() {
        return {
            background: { backgroundColor: 'transparent' },
            searchValue: '',
            current: 0,
            tabList: [
                { name: '我的待办', method: 'todoList' },
                { name: '我的请求', method: 'sendList' },
                { name: '我的已办', method: 'myDoneList' },
                { name: '办结事宜', method: 'doneList' },
            ],
            showBtn: false,
            loadStatus: 'loadmore',
            page: {
                current: 1,
                size: 5,
            },
            list: [],
            scrollTop: 0,
        };
    },
    onLoad({ current }) {
        if (current) {
            this.handleTabClick(Number(current), false);
        }
        this.$nextTick(() => {
            uni.startPullDownRefresh();
        });
    },
    onPullDownRefresh() {
        this.getList(true);
    },
    onReachBottom() {
        if (this.loadStatus == 'nomore') return;
        this.getList();
    },
    onPageScroll(e) {
        this.scrollTop = e.scrollTop;
    },
    methods: {
        todoList,
        sendList,
        myDoneList,
        doneList,
        getList(clear = false) {
            if (clear) {
                this.page = {
                    current: 1,
                    size: 5,
                };
            }
            this.showBtn = false;
            const { current, size } = this.page;
            const { method } = this.tabList[this.current];
            if (!method) return;
            this.loadStatus = 'loading';
            this[this.tabList[this.current].method]({
                processDefinitionName: this.searchValue,
                current,
                size,
            }).then((res) => {
                const { records, total } = res.data;
                if (this.current == 0) {
                    this.$set(this.tabList[0], 'count', total);
                    this.showBtn = true;
                }
                if (records.length < size) this.loadStatus = 'nomore';
                else this.loadStatus = 'loadmore';
                if (clear) {
                    this.list = records;
                } else {
                    this.list = this.list.concat(records);
                }
                this.page.current++;
                uni.stopPullDownRefresh();
            });
        },
        handleTabClick(index, request = true) {
            this.current = index;
            if (request) this.getList(true);
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../static/styles/common';
page {
    background: #f6f6f6;
}
.head-item {
    width: 100%;
    height: 240rpx;
    padding: 54rpx 0 10rpx;
    background: url('https://oss.nutflow.vip/rider/mine/head_bg.png') no-repeat center bottom;
    background-size: 100% 100%;
}
/* #ifdef MP-WEIXIN*/
.head-item {
    height: 366rpx;
    padding: 185rpx 0 10rpx;
}
/* #endif */

.search-item {
    padding: 0 30rpx;
    margin-bottom: 26rpx;
}
.main {
    padding: 30rpx 0;
}
</style>
<style>
page {
    background: #f6f6f6;
}
</style>
