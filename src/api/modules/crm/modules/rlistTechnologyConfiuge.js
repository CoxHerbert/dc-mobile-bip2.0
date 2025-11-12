import http from '@/http/api.js';

export default {
    list(params) {
        return http.request({
            url: '/api/blade-bip/rlist-technology-confiuge/list',
            method: 'get',
            params,
        });
    },
    detail(params) {
        return http.request({
            url: '/api/blade-bip/rlist-technology-confiuge/detail',
            method: 'get',
            params,
        });
    },
    remove(params) {
        return http.request({
            url: '/api/blade-bip/rlist-technology-confiuge/remove',
            method: 'DELETE',
            params,
        });
    },
    submit(data) {
        return http.request({
            url: '/api/blade-bip/rlist-technology-confiuge/submit',
            method: 'post',
            data,
        });
    },
};
