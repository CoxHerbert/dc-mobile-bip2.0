import http from '@/http/api.js';

// 工作组
export default {
    list(params) {
        return http.request({
            url: '/api/blade-bip/mps/produce-route/list',
            method: 'get',
            params,
        });
    },
    remove(params) {
        return http.request({
            url: '/api/blade-bip/mps/produce-route/delete',
            method: 'post',
            params,
        });
    },
    create(data) {
        return http.request({
            url: '/api/blade-bip/mps/produce-route/insert',
            method: 'post',
            data,
        });
    },
    update(data) {
        return http.request({
            url: '/api/blade-bip/mps/produce-route/edit',
            method: 'post',
            data,
        });
    },
};
