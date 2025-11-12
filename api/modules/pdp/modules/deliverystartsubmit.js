import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/delivered-item/list',
            method: 'get',
            params,
        });
    },
    // 提交
    submit(data) {
        return http.request({
            url: '/api/blade-bip/delivered-item/submit',
            method: 'post',
            data,
        });
    },
    // 删除
    remove(params) {
        return http.request({
            url: '/api/blade-bip/delivered-item/remove',
            method: 'DELETE',
            params,
        });
    },
    // 明细列表
    getProjectDelivered(params) {
        return http.request({
            url: '/api/blade-bip/delivered/find-project-delivered',
            method: 'get',
            params,
        });
    },
};
