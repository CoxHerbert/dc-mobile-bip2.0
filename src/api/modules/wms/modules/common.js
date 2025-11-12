import http from '@/http/api.js';

export default {
    // 仓库列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/dc-wms-common/list',
            method: 'get',
            params,
        });
    },
};
