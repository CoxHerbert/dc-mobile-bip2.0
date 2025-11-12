import http from '@/http/api.js';

export default {
    // 代办流程/任务数量
    getWorkCount() {
        return http.request({
            url: '/api/blade-bip/plan-item/work-count',
            method: 'get',
        });
    },
};
