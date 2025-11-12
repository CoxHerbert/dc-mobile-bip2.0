import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/mmr-plan-whr/list',
            method: 'get',
            params,
        });
    },

    // 保存接口
    submit(data) {
        return http.request({
            url: '/api/blade-bip/mmr-plan-whr/submit',
            method: 'post',
            data,
        });
    },

    // 删除接口
    remove(params) {
        return http.request({
            url: '/api/blade-bip/mmr-plan-whr/remove',
            method: 'DELETE',
            params,
        });
    },

    // 详情接口
    detail(params) {
        return http.request({
            url: '/api/blade-bip/mmr-plan-whr/detail',
            method: 'GET',
            params,
        });
    },

    // 有效计划接口
    findeFfectivePhase(params) {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order/find-effective-phase',
            method: 'GET',
            params,
        });
    },
};
