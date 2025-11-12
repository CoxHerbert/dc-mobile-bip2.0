import http from '@/http/api.js';

export default {
    // 提交流程
    sumbitProcess(data) {
        return http.request({
            url: '/api/blade-bip/change-record/sumbitProcess',
            method: 'post',
            data,
        });
    },
    // 分页查询列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/change-record/list',
            method: 'get',
            params,
        });
    },
};
