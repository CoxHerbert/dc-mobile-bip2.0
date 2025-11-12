import http from '@/http/api.js';

export default {
    // 列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/dc-wms-out-stock/list',
            method: 'get',
            params,
        });
    },
    // 详情
    detail(params) {
        return http.request({
            url: '/api/blade-bip/dc-wms-out-stock/detail',
            method: 'get',
            params,
        });
    },
    // 详情
    detailByCode(params) {
        return http.request({
            url: '/api/blade-bip/dc-wms-out-stock/detail-by-code',
            method: 'get',
            params,
        });
    },
    // 审核
    audit(data) {
        return http.request({
            url: '/api/blade-bip/dc-wms-out-stock/audit',
            method: 'post',
            data,
        });
    },
};
