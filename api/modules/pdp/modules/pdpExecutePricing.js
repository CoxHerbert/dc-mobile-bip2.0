import http from '@/http/api.js';

export default {
    // 列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/PdpExecutePricing/execute-list',
            method: 'get',
            params,
        });
    },
    // 明细查询
    detail(params) {
        return http.request({
            url: '/api/blade-bip/PdpExecutePricing/execute-detail',
            method: 'get',
            params,
        });
    },
    // 修改
    submit(data) {
        return http.request({
            url: '/api/blade-bip/PdpExecutePricing/execute-submit',
            method: 'post',
            data,
        });
    },
};
