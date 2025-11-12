import http from '@/http/api.js';

export default {
    // 获取出货清单明细
    getOptDetail(params) {
        return http.request({
            url: '/api/blade-bip/dc/scm/ship/item/opt/detail',
            method: 'get',
            params,
        });
    },
    // 明细查询
    getDetail(params) {
        return http.request({
            url: '/api/blade-bip/dc/scm/ship/item/detail',
            method: 'get',
            params,
        });
    },
    // 明细查询
    saveShipItem(data) {
        return http.request({
            url: '/api/blade-bip/dc/scm/ship/item/submit',
            method: 'post',
            data,
        });
    },
};
