import http from '@/http/api.js';

export default {
    list(params) {
        return http.request({
            url: '/api/blade-bip/rlist-configue/list',
            method: 'get',
            params,
        });
    },
    detail(params) {
        return http.request({
            url: '/api/blade-bip/rlist-configue/detail',
            method: 'get',
            params,
        });
    },
    remove(params) {
        return http.request({
            url: '/api/blade-bip/rlist-configue/remove',
            method: 'DELETE',
            params,
        });
    },
    submit(data) {
        return http.request({
            url: '/api/blade-bip/rlist-configue/submit',
            method: 'post',
            data,
        });
    },
};
