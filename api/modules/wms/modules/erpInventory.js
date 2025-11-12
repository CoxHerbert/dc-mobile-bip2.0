import http from '@/http/api.js';

export default {
    // 及时库存列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/erp-inventory',
            method: 'get',
            params,
        });
    },
};
