import { createRouter, createWebHashHistory } from 'vue-router';

const workflowRoutes = [
    {
        path: '/plugin/workflow/workbench',
        name: 'WorkflowWorkbench',
        meta: { title: '工作台' },
        component: () => import('@/pages/plugin/workflow/pages/workbench/index.vue'),
    },
    {
        path: '/plugin/workflow/create',
        name: 'WorkflowCreate',
        meta: { title: '新建流程' },
        component: () => import('@/pages/plugin/workflow/pages/create/index.vue'),
    },
    {
        path: '/plugin/workflow/mine',
        name: 'WorkflowMine',
        meta: { title: '我的事务' },
        component: () => import('@/pages/plugin/workflow/pages/mine/index.vue'),
    },
    {
        path: '/plugin/workflow/warehouse',
        name: 'WorkflowWarehouse',
        meta: { title: '仓库' },
        component: () => import('@/pages/plugin/workflow/pages/warehouse/index.vue'),
    },
    {
        path: '/plugin/workflow/form/start',
        name: 'WorkflowFormStart',
        meta: { title: '发起流程' },
        component: () => import('@/pages/plugin/workflow/pages/form/start.vue'),
    },
    {
        path: '/plugin/workflow/form/detail',
        name: 'WorkflowFormDetail',
        meta: { title: '流程详情' },
        component: () => import('@/pages/plugin/workflow/pages/form/detail.vue'),
    },
    {
        path: '/plugin/workflow/external/leave/start',
        name: 'WorkflowExternalLeaveStart',
        meta: { title: '发起流程' },
        component: () => import('@/pages/plugin/workflow/pages/external/Leave/start.vue'),
    },
    {
        path: '/plugin/workflow/external/leave/detail',
        name: 'WorkflowExternalLeaveDetail',
        meta: { title: '流程详情' },
        component: () => import('@/pages/plugin/workflow/pages/external/Leave/detail.vue'),
    },
    {
        path: '/pages/plugin/workflow/pages/workbench/index',
        redirect: { name: 'WorkflowWorkbench' },
    },
    {
        path: '/pages/plugin/workflow/pages/create/index',
        redirect: { name: 'WorkflowCreate' },
    },
    {
        path: '/pages/plugin/workflow/pages/mine/index',
        redirect: { name: 'WorkflowMine' },
    },
    {
        path: '/pages/plugin/workflow/pages/warehouse/index',
        redirect: { name: 'WorkflowWarehouse' },
    },
    {
        path: '/pages/plugin/workflow/pages/form/start',
        redirect: { name: 'WorkflowFormStart' },
    },
    {
        path: '/pages/plugin/workflow/pages/form/detail',
        redirect: { name: 'WorkflowFormDetail' },
    },
    {
        path: '/pages/plugin/workflow/pages/external/Leave/start',
        redirect: { name: 'WorkflowExternalLeaveStart' },
    },
    {
        path: '/pages/plugin/workflow/pages/external/Leave/detail',
        redirect: { name: 'WorkflowExternalLeaveDetail' },
    },
];

const routes = [
    {
        path: '/',
        redirect: { name: 'WorkflowWorkbench' },
    },
    ...workflowRoutes,
    {
        path: '/:pathMatch(.*)*',
        redirect: { name: 'WorkflowWorkbench' },
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
    scrollBehavior() {
        return { top: 0 };
    },
});

router.beforeEach((to, _from, next) => {
    if (to.meta && to.meta.title) {
        document.title = to.meta.title;
    }
    next();
});

export default router;
