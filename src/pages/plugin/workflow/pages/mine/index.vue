<template>
    <div class="container">
        <div class="head-item">
            <div class="search-item">
                <van-search
                    class="workflow-search"
                    v-model="searchValue"
                    placeholder="请输入流程名称"
                    shape="square"
                    :show-action="false"
                    background="#8EAAFF"
                    @search="handleSearch"
                    @clear="handleSearch"
                />
            </div>

            <van-tabs
                v-model:active="current"
                :border="false"
                class="mine-tabs"
                background="transparent"
                @change="handleTabChange"
            >
                <van-tab v-for="(tab, index) in tabList" :key="tab.name" :name="index">
                    <template #title>
                        <span class="tab-title">{{ formatTabTitle(tab, index) }}</span>
                    </template>
                </van-tab>
            </van-tabs>
        </div>

        <div class="main" v-if="list.length > 0">
            <wkf-card :list="list" :show-btn="showBtn" :type="current" @refresh="getList(true)"></wkf-card>
            <div class="loadmore">
                <van-loading v-if="loadStatus === 'loading'" size="24px">加载中...</van-loading>
                <div v-else-if="loadStatus === 'nomore'" class="loadmore-text">没有更多了</div>
                <van-button v-else type="primary" size="small" plain @click="getList()">加载更多</van-button>
            </div>
        </div>
        <wf-empty v-else text="工作再忙，也要记得喝水"></wf-empty>
        <van-back-top target="body" :right="24" :bottom="120" v-if="scrollTop > 200" />
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { todoList, doneList, myDoneList, sendList } from '../../api/process.js';
import wkfCard from '../../components/wf-card/index';

export default defineComponent({
    name: 'WorkflowMinePage',
    components: { wkfCard },
    data() {
        return {
            background: { backgroundColor: 'transparent' },
            searchValue: '',
            current: 0,
            tabList: [
                { name: '我的待办', method: 'todoList', count: 0 },
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
            loading: false,
        };
    },
    created() {
        this.applyRoute(this.$route.query);
    },
    mounted() {
        this.getList(true);
        window.addEventListener('scroll', this.handleScroll, { passive: true });
    },
    beforeUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    },
    watch: {
        '$route.query.current'(value) {
            if (typeof value === 'undefined') return;
            const index = Number(value);
            if (!Number.isNaN(index) && index !== this.current) {
                this.current = index;
                this.getList(true);
            }
        },
    },
    methods: {
        todoList,
        sendList,
        myDoneList,
        doneList,
        applyRoute(query = {}) {
            if (query.current !== undefined) {
                const index = Number(query.current);
                if (!Number.isNaN(index)) {
                    this.current = index;
                }
            }
        },
        formatTabTitle(tab, index) {
            if (index === 0 && tab.count) {
                return `${tab.name}(${tab.count})`;
            }
            return tab.name;
        },
        handleSearch() {
            this.getList(true);
        },
        handleTabChange({ name }) {
            const index = Number(name);
            this.handleTabClick(Number.isNaN(index) ? 0 : index);
        },
        async getList(clear = false) {
            if (this.loading) return;
            if (clear) {
                this.page.current = 1;
                this.list = [];
            }
            const handlerName = this.tabList[this.current]?.method;
            if (!handlerName || typeof this[handlerName] !== 'function') {
                return;
            }
            this.loading = true;
            this.loadStatus = 'loading';
            const { current, size } = this.page;
            try {
                const res = await this[handlerName]({
                    processDefinitionName: this.searchValue,
                    current,
                    size,
                });
                const { records = [], total = 0 } = res.data || {};
                if (this.current === 0) {
                    this.tabList[0].count = total;
                    this.showBtn = true;
                } else {
                    this.showBtn = false;
                }
                this.list = clear ? records : this.list.concat(records);
                this.page.current += 1;
                this.loadStatus = records.length < size ? 'nomore' : 'loadmore';
            } catch (error) {
                console.error('[workflow] 获取任务列表失败', error);
                this.loadStatus = 'loadmore';
            } finally {
                this.loading = false;
            }
        },
        handleTabClick(index, request = true) {
            if (this.current === index && request) {
                this.getList(true);
                return;
            }
            this.current = index;
            this.updateRoute(index);
            if (request) {
                this.getList(true);
            }
        },
        updateRoute(index) {
            const query = { ...this.$route.query, current: String(index) };
            this.$router.replace({ name: 'WorkflowMine', query });
        },
        handleScroll() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            this.scrollTop = scrollTop;
            const { innerHeight } = window;
            const { scrollHeight } = document.documentElement;
            if (this.loadStatus !== 'loadmore' || this.loading) return;
            if (scrollTop + innerHeight >= scrollHeight - 30) {
                this.getList();
            }
        },
    },
});
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
.mine-tabs {
    color: #c7d5ff;

    .van-tabs__nav {
        background: transparent;
    }
    .van-tab {
        color: #c7d5ff;
    }
    .van-tab--active {
        color: #fff;
    }
    .van-tabs__line {
        background-color: #fff;
    }
}

.tab-title {
    font-size: 28rpx;
}

.loadmore {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px 0;
    gap: 12px;
}

.loadmore-text {
    color: #999;
    font-size: 26rpx;
}

.workflow-search {
    --van-search-left-icon-color: #ffffff;
    --van-search-input-background: rgba(255, 255, 255, 0.15);
    --van-field-input-text-color: #ffffff;

    .van-search__content {
        background: transparent;
    }

    .van-field__control::placeholder {
        color: #5470c4;
    }
}
</style>
<style>
page {
    background: #f6f6f6;
}
</style>
