import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-erp/v-prd-mo-material/list',
            method: 'get',
            params,
        });
    },
};
