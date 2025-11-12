import http from '@/http/api.js';

export default {
    // 分页查询
    list(params) {
        return http.request({
            url: '/api/blade-bip/pdp-file-share/page-list',
            method: 'get',
            params,
        });
    },
};
