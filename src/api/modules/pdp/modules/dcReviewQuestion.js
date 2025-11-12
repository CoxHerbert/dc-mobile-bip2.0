import http from '@/http/api.js';

export default {
    //   列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/dc-review-problem/list',
            method: 'get',
            params,
        });
    },
    getDetailById(params) {
        return http.request({
            url: '/api/blade-bip/dc-review-problem/get-detail-by-id',
            method: 'get',
            params,
        });
    },
    submit(data) {
        return http.request({
            url: '/api/blade-bip/dc-review-problem/submit',
            method: 'post',
            data,
        });
    },
};
