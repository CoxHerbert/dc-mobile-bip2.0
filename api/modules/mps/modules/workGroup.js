import http from '@/http/api.js';

// 工作组
export default {
    list(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-group/list',
            method: 'get',
            params,
        });
    },
    remove(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-group/delete',
            method: 'post',
            params,
        });
    },
    create(data) {
        return http.request({
            url: '/api/blade-bip/mps/work-group/insert',
            method: 'post',
            data,
        });
    },
    update(data) {
        return http.request({
            url: '/api/blade-bip/mps/work-group/edit',
            method: 'post',
            data,
        });
    },
};
