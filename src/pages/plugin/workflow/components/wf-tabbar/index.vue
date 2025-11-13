<template>
  <van-tabbar :model-value="activeIndex" @update:model-value="handleChange" route>
    <van-tabbar-item
      v-for="(item, index) in list"
      :key="item.text"
      :name="index"
    >
      <template #icon="{ active }">
        <img :src="active ? item.selectedIconPath : item.iconPath" class="wf-tabbar-icon" alt="" />
      </template>
      <span>{{ item.text }}</span>
    </van-tabbar-item>
  </van-tabbar>
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
          pagePath: '/pages/plugin/workflow/pages/workbench/index',
          location: { name: 'WorkflowWorkbench' },
        },
        {
          iconPath: 'https://oss.nutflow.vip/rider/public/create.png',
          selectedIconPath: 'https://oss.nutflow.vip/rider/public/create_act.gif',
          text: '新 建',
          pagePath: '/pages/plugin/workflow/pages/create/index',
          location: { name: 'WorkflowCreate' },
        },
        {
          iconPath: 'https://oss.nutflow.vip/rider/public/mine.png',
          selectedIconPath: 'https://oss.nutflow.vip/rider/public/mine_act.png',
          text: '我的',
          pagePath: '/pages/plugin/workflow/pages/mine/index',
          location: { name: 'WorkflowMine', query: { current: '0' } },
        },
      ],
    };
  },
  computed: {
    activeIndex() {
      const { list } = this;
      const route = this.$route;
      if (!route) {
        return 0;
      }
      const currentIndex = list.findIndex((item) => {
        const { location } = item;
        if (!location) return false;
        if (location.name) {
          return route.name === location.name;
        }
        if (location.path) {
          return route.path === location.path;
        }
        return route.path === item.pagePath;
      });
      return currentIndex > -1 ? currentIndex : 0;
    },
  },
  methods: {
    handleChange(index) {
      const item = this.list[index];
      if (!item) return;
      const { location } = item;
      if (!location) return;
      const isActive =
        (location.name && this.$route && this.$route.name === location.name) ||
        (!location.name && this.$route && this.$route.path === (location.path || item.pagePath));
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

<style scoped>
.wf-tabbar-icon {
  width: 22px;
  height: 22px;
}
</style>
