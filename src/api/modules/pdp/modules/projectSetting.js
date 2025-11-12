import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/dc-pdp-func-user-config/list',
            method: 'get',
            params,
        });
    },
    submit(data) {
        return http.request({
            url: '/api/blade-bip/dc-pdp-func-user-config/submit',
            method: 'post',
            data,
        });
    },
};
