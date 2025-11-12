import http from '@/http/api.js';

export default {
    list(params) {
        return http.request({
            url: '/api/blade-bip/mps/process-maintenance/list',
            method: 'get',
            params,
        });
    },
    remove(params) {
        return http.request({
            url: '/api/blade-bip/mps/process-maintenance/delete',
            method: 'post',
            params,
        });
    },
    create(data) {
        return http.request({
            url: '/api/blade-bip/mps/process-maintenance/insert',
            method: 'post',
            data,
        });
    },
    update(data) {
        return http.request({
            url: '/api/blade-bip/mps/process-maintenance/update',
            method: 'post',
            data,
        });
    },
};
