import http from '@/http/api.js';

export default {
    // 评审模版列表
    list() {
        return http.request({
            url: '/api/blade-bip/dc-review-dimension/review-dimension-template',
            method: 'get',
        });
    },
};
