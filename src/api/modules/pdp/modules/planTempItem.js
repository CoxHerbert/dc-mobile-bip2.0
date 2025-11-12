import http from '@/http/api.js';

export default {
    // 计划模板生成计划
    postSynPlan(params) {
        return http.request({
            url: '/api/blade-bip/plan-tempitem/syn-plan',
            method: 'post',
            params,
        });
    },
    synPlanByPlanOrder(params) {
        return http.request({
            url: '/api/blade-bip/plan-tempitem/syn-plan-by-plan-order',
            method: 'get',
            params,
        });
    },
    // 计划模板明细列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/plan-tempitem/list',
            method: 'get',
            params,
        });
    },
    // 查询详情
    detail(params) {
        return http.request({
            url: '/api/blade-bip/plan-tempitem/detail',
            method: 'get',
            params,
        });
    },
    // 新增或修改
    submit(data) {
        return http.request({
            url: '/api/blade-bip/plan-tempitem/submit',
            method: 'post',
            data,
        });
    },
    // 删除
    remove(params) {
        return http.request({
            url: '/api/blade-bip/plan-tempitem/remove',
            method: 'get',
            params,
        });
    },
};
