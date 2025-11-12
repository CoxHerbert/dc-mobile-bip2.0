import http from '@/http/api.js';

// 列表
export default {
    list(params) {
        return http.request({
            url: '/api/blade-bip/dc-scm-exchange-rate/list',
            method: 'get',
            params,
        });
    },
    detail(params) {
        return http.request({
            url: '/api/blade-bip/dc-scm-exchange-rate/detail',
            method: 'get',
            params,
        });
    },
    submit(params) {
        return http.request({
            url: '/api/blade-bip/dc-scm-exchange-rate/submit',
            method: 'post',
            data: params,
        });
    },
    remove(params) {
        return http.request({
            url: '/api/blade-bip/dc-scm-exchange-rate/remove',
            method: 'delete',
            params,
        });
    },
};
