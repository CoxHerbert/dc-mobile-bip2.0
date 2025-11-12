import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order-opt/dispatch-application',
            method: 'get',
            params,
        });
    },
};
