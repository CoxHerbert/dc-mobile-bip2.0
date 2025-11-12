import http from '@/http/api.js';

export default {
    // excel导入
    upload(data) {
        return http.request({
            url: '/api/blade-bip/WireBomItem/importExcel',
            method: 'post',
            data,
        });
    },
    // 图纸匹配
    drawingMatch(params) {
        return http.request({
            url: '/api/blade-bip/WireBomItem/drawingMatch',
            method: 'post',
            params,
        });
    },

    // 列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/WireBomItem/list',
            method: 'get',
            params,
        });
    },

    // 明细查询
    detail(params) {
        return http.request({
            url: '/api/blade-bip/WireBomItem/detail',
            method: 'get',
            params,
        });
    },
};
