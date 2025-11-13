<template>
    <div class="container">
        <div class="head-item">
            <div class="search-item">
                <van-search
                    v-model="searchValue"
                    placeholder="请输入流程名称"
                    shape="square"
                    :clearable="true"
                    class="create-search"
                    @search="getList(true)"
                    @clear="getList(true)"
                />
            </div>
        </div>
        <van-collapse v-if="list.length > 0" v-model="activeNames" :border="false">
            <van-collapse-item v-for="(item, index) in list" :key="index" :name="String(index)">
                <template #title>
                    <span class="collapse-title">{{ item.category }}</span>
                </template>
                <div
                    class="item flex-between flex-c"
                    v-for="(processItem, cIndex) in item.processList"
                    :key="cIndex"
                    @click="handleProcessClick(processItem)"
                >
                    <img
                        class="icon"
                        :src="processItem.icon || `${wfImage}/create/icon_${parseInt(cIndex % 10)}.png`"
                        alt="workflow icon"
                    />
                    <div class="flex-one r">
                        <div class="name txt-cut1">{{ processItem.processDefinitionName }}</div>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
        <wf-empty v-else text="工作再忙，也要记得喝水"></wf-empty>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { list } from '../../api/process.js';
import exForm from '../../mixins/ex-form.js';

export default defineComponent({
    name: 'WorkflowCreatePage',
    mixins: [exForm],
    data() {
        return {
            wfImage: this.wfImage || 'https://oss.nutflow.vip/rider',
            searchValue: '',
            activeNames: [],
            list: [],
            loading: false,
        };
    },
    mounted() {
        this.getList(true);
    },
    methods: {
        async getList(reset = false) {
            if (this.loading) return;
            this.loading = true;
            const param = { processDefinitionName: this.searchValue, platform: 'h5' };
            try {
                const res = await list(param);
                this.list = (res && res.data) || [];
                this.$nextTick(() => {
                    this.activeNames = this.list.map((_, idx) => String(idx));
                });
            } catch (error) {
                console.error('[workflow] 获取流程定义失败', error);
            } finally {
                this.loading = false;
            }
        },
        handleProcessClick(processDefinition) {
            this.refreshToken(processDefinition);
        },
        refreshToken(processDefinition) {
            const userInfo = uni.getStorageSync('loginInfo');
            if (userInfo) {
                this.$store.dispatch('refreshTokenFn', userInfo).finally(() => {
                    this.dynamicRoute(processDefinition, 'start');
                });
            } else {
                this.dynamicRoute(processDefinition, 'start');
            }
        },
    },
});
</script>
<style lang="scss" scoped>
@import '../../static/styles/common';

.container {
    .head-item {
        width: 100%;
        height: 150px;
        padding: 50px 30px 0;
        background: url('https://oss.nutflow.vip/rider/mine/head_bg.png') no-repeat;
        background-size: 100% 100%;
    }

    .search-item {
        .create-search {
            --van-search-background: rgba(142, 170, 255, 1);
            --van-search-placeholder-color: #5470c4;
            --van-search-input-text-color: #ffffff;
            --van-search-left-icon-color: #ffffff;
        }
    }

    .van-collapse-item__wrapper {
        padding: 0 30px;
    }

    .collapse-title {
        color: #333;
        font-size: 20px;
        font-weight: 600;
    }

    .item {
        margin-bottom: 20px;
        cursor: pointer;

        .r {
            word-break: break-all;
        }

        .icon {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            margin-right: 16px;
        }

        .name {
            font-size: 18px;
            color: #333;
        }
    }
}
</style>
