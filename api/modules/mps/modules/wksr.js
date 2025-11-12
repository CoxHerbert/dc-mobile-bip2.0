import http from '@/http/api.js';

export default {
    // 明细列表
    planList(params) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/plan-list',
            method: 'get',
            params,
        });
    },
    // 计划明细
    planDetail(params) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/plan-detail',
            method: 'get',
            params,
        });
    },
    // 计划提交
    reporSavetSubmit(data, params) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/report-save',
            method: 'post',
            data,
            params,
        });
    },
};
