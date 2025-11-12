import http from '@/http/api.js';

export default {
    // 列表甘特图展示
    getPlanitemTree(params) {
        return http.request({
            url: '/api/blade-bip/plan-item/plan-item-tree',
            method: 'get',
            params,
        });
    },
    // 计划列表
    getPlanitemList(params) {
        return http.request({
            url: '/api/blade-bip/plan-item/list',
            method: 'get',
            params,
        });
    },
    // 懒加载计划列表
    getPlanitemListLazy(params) {
        return http.request({
            url: '/api/blade-bip/plan-item/lazy-list',
            method: 'get',
            params,
        });
    },

    // 根据id获取任务信息
    getDetailChildren(params) {
        return http.request({
            url: '/api/blade-bip/plan-item/detail-children',
            method: 'get',
            params,
        });
    },
    // 计划下达
    sendDownPlan(params) {
        return http.request({
            url: '/api/blade-bip/plan-item/send-down-plan',
            method: 'post',
            params,
        });
    },
    // 提交或保存
    submit(data) {
        return http.request({
            url: '/api/blade-bip/plan-item/submit',
            method: 'post',
            data,
        });
    },
    submitPlanItem(data) {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order/submit-plan-item',
            method: 'post',
            data,
        });
    },
    // 删除计划信息
    remove(params) {
        return http.request({
            url: '/api/blade-bip/plan-item/remove',
            method: 'delete',
            params,
        });
    },
    // 计划执行统一
    optSubmit(params) {
        return http.request({
            url: '/api/blade-bip/plan-item/opt/submit',
            method: 'post',
            params,
        });
    },
    // 项目计划/专案计划
    getProjectPlanList(params) {
        return http.request({
            url: '/api/blade-bip/plan-item/project-plan-list',
            method: 'get',
            params,
        });
    },

    // 计划甘特图
    getPlanItemGatter(params) {
        return http.request({
            url: '/api/blade-bip/plan-item/opt/plan-item-gatter',
            method: 'get',
            params,
        });
    },
};
