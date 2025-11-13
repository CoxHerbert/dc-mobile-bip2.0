<template>
    <view>
        <u-tabbar
            :list="list"
            :mid-button="true"
            active-color="#222"
            inactive-color="#666"
            @change="handleChange"
        ></u-tabbar>
    </view>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'WorkflowTabbar',
    data() {
        return {
            list: [
                {
                    iconPath: 'https://oss.nutflow.vip/rider/public/home.png',
                    selectedIconPath: 'https://oss.nutflow.vip/rider/public/home_act.png',
                    text: '工作台',
                    customIcon: false,
                    pagePath: '/pages/plugin/workflow/pages/workbench/index',
                    location: { name: 'WorkflowWorkbench' },
                },
                {
                    iconPath: 'https://oss.nutflow.vip/rider/public/create.png',
                    selectedIconPath: 'https://oss.nutflow.vip/rider/public/create_act.gif',
                    text: '新 建',
                    midButton: true,
                    customIcon: false,
                    pagePath: '/pages/plugin/workflow/pages/create/index',
                    location: { name: 'WorkflowCreate' },
                },
                {
                    iconPath: 'https://oss.nutflow.vip/rider/public/mine.png',
                    selectedIconPath: 'https://oss.nutflow.vip/rider/public/mine_act.png',
                    text: '我的',
                    customIcon: false,
                    pagePath: '/pages/plugin/workflow/pages/mine/index',
                    location: { name: 'WorkflowMine', query: { current: '0' } },
                },
            ],
        };
    },
    methods: {
        handleChange(index) {
            const item = this.list[index];
            if (!item) return;
            const { location } = item;
            if (!location) return;
            const isActive =
                (location.name && this.$route.name === location.name) ||
                (!location.name && this.$route.path === (location.path || item.pagePath));
            if (isActive) return;
            const navigate = location.replace ? this.$router.replace : this.$router.push;
            const target = location.name
                ? { name: location.name, query: location.query }
                : { path: location.path || item.pagePath, query: location.query };
            navigate.call(this.$router, target);
        },
    },
});
</script>
