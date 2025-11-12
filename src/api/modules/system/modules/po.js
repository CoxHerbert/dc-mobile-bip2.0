import http from '@/http/api.js';

export default {
    // 列表分页查询
    getUnreceivedList(params) {
        return http.request({
            url: '/api/blade-bip/po/unreceived-list',
            method: 'get',
            params,
        });
    },
    // 标签补打
    replayPrint(data) {
        return http.request({
            url: '/api/blade-bip/po/replay-print',
            method: 'post',
            data,
        });
    },
};
