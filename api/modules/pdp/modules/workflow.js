import http from '@/http/api.js';

export default {
    // 流程创建url
    getWorkflow(params) {
        return http.request({
            url: '/api/blade-workflow/workflow/top-title',
            method: 'get',
            params,
        });
    },
};
