import http from '@/http/api.js';

export default {
    // 列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/WireBom/bom-list',
            method: 'get',
            params,
        });
    },
    // 明细查询
    detail(params) {
        return http.request({
            url: '/api/blade-bip/WireBom/bom-detail',
            method: 'get',
            params,
        });
    },

    // 明细查询
    remove(params) {
        return http.request({
            url: '/bldae-bip/WireBom/remove',
            method: 'get',
            params,
        });
    },
};
