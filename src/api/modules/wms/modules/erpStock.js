import http from '@/http/api.js';

export default {
    // 仓库列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/dc-erp-stock/list',
            method: 'get',
            params,
        });
    },
    // 保存&修改
    submit(data) {
        return http.request({
            url: '/api/blade-bip/dc-erp-stock/submit',
            method: 'post',
            data,
        });
    },
    // 明细查询
    detail(params) {
        return http.request({
            url: '/api/blade-bip/dc-erp-stock/detail',
            method: 'get',
            params,
        });
    },
    keeperList(params) {
        return http.request({
            url: '/api/blade-bip/dc-erp-warehouse-keeper/list',
            method: 'get',
            params,
        });
    },
};
