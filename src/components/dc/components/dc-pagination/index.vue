<template>
    <view class="dc-pagination-wrapper">
        <!-- 可插入头部内容 -->
        <slot name="header" />

        <scroll-view
            scroll-y
            refresher-enabled
            :refresher-triggered="isRefreshing"
            @refresherrefresh="onRefresh"
            @scrolltolower="onLoadMore"
            :lower-threshold="lowerThreshold"
            class="dc-scroll-container"
        >
            <!-- 空数据 -->
            <view v-if="!list.length && !isRefreshing && !isLoading" class="dc-empty">
                <slot name="empty">暂无数据</slot>
            </view>

            <!-- 数据列表插槽 -->
            <view v-for="(item, index) in list" :key="index" class="card-wrap">
                <slot :item="item" :index="index" />
            </view>

            <!-- 加载更多状态 -->
            <u-loadmore :status="loadStatus" />
        </scroll-view>

        <!-- 可插入尾部内容 -->
        <slot name="footer" />
    </view>
</template>

<script>
export default {
    name: 'SmartPagination',
    props: {
        request: {
            type: Function,
            required: true,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        params: {
            type: Object,
            default: () => ({}),
        },
        lowerThreshold: {
            type: Number,
            default: 50,
        },
        immediate: {
            type: Boolean,
            default: true,
        },
        showLoading: {
            type: Boolean,
            default: true,
        },
        responseAdapter: {
            type: Function,
            default: (res) => {
                const data = res.data || {};
                return {
                    list: data.records || [],
                    total: data.total || 0,
                    current: data.current || 1,
                    pages: data.pages || 1,
                };
            },
        },
    },
    data() {
        return {
            current: 1,
            list: [],
            loadStatus: 'loadmore',
            isRefreshing: false,
            isLoading: false,
            finished: false,
        };
    },
    mounted() {
        if (this.immediate) this.load();
    },
    watch: {
        list: {
            immediate: true,
            deep: true,
            handler(newVal) {
                this.$emit('updated', newVal);
            },
        },
    },
    methods: {
        async load(isRefresh = false) {
            if (this.finished && !isRefresh) return;

            if (isRefresh) {
                this.current = 1;
                this.finished = false;
                this.list = [];
            }

            if (this.showLoading && !this.isRefreshing) {
                uni.showLoading({ title: '加载中...', mask: true });
            }

            this.isLoading = true;
            this.loadStatus = 'loading';

            const query = {
                ...this.params,
                current: this.current,
                size: this.pageSize,
            };

            try {
                const res = await this.request(query);
                const { list: records, current, pages } = this.responseAdapter(res);

                this.list = isRefresh ? records : [...this.list, ...records];

                if (current >= pages) {
                    this.finished = true;
                    this.loadStatus = 'nomore';
                } else {
                    this.current++;
                    this.loadStatus = 'loadmore';
                }
            } catch (e) {
                console.error('[SmartPagination] 加载失败', e);
                this.loadStatus = 'loadmore';
            }

            this.isRefreshing = false;
            this.isLoading = false;
            uni.hideLoading();
        },

        onRefresh() {
            this.isRefreshing = true;
            this.load(true);
        },

        onLoadMore() {
            if (this.loadStatus === 'loadmore') this.load();
        },

        refresh() {
            this.onRefresh();
        },

        reload(newParams = {}) {
            this.current = 1;
            this.finished = false;
            this.list = [];
            this.$nextTick(() => {
                this.load(true, newParams);
            });
        },

        getList() {
            return this.list;
        },
    },
};
</script>

<style scoped lang="scss">
.dc-pagination-wrapper {
    display: flex;
    flex-direction: column;

    height: 100%;
    .dc-scroll-container {
        overflow: auto;
        flex: 1;
    }
    .dc-empty {
        text-align: center;
        padding: 80rpx;
        color: #999;
        font-size: 28rpx;
    }
    .card-wrap {
        padding: 20rpx;
        border-radius: 16rpx;
        background: #fff;
        margin: 24rpx;
        box-shadow: #ccc 5rpx 2rpx 8rpx 8rpx;
    }
}
</style>
