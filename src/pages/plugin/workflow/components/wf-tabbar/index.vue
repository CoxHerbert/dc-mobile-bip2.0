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
export default {
    data() {
        return {
            list: [
                {
                    iconPath: 'https://oss.nutflow.vip/rider/public/home.png',
                    selectedIconPath: 'https://oss.nutflow.vip/rider/public/home_act.png',
                    text: '工作台',
                    customIcon: false,
                    pagePath: '/pages/plugin/workflow/pages/workbench/index',
                },
                {
                    iconPath: 'https://oss.nutflow.vip/rider/public/create.png',
                    selectedIconPath: 'https://oss.nutflow.vip/rider/public/create_act.gif',
                    text: '新 建',
                    midButton: true,
                    customIcon: false,
                    pagePath: '/pages/plugin/workflow/pages/create/index',
                },
                {
                    iconPath: 'https://oss.nutflow.vip/rider/public/mine.png',
                    selectedIconPath: 'https://oss.nutflow.vip/rider/public/mine_act.png',
                    text: '我的',
                    // count: 23,
                    // isDot: false,
                    customIcon: false,
                    pagePath: '/pages/plugin/workflow/pages/mine/index',
                },
            ],
        };
    },
    methods: {
        handleChange(index) {
            const pages = getCurrentPages();
            let currentRoute = '/' + pages[pages.length - 1].route;
            let url = this.list[index].pagePath;
            if (currentRoute == url) return;
            uni.redirectTo({ url });
        },
    },
};
</script>
