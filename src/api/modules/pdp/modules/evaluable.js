import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/fea-evaluation-problem/list',
            method: 'get',
            params,
        });
    },

    // 保存
    submit(data) {
        return http.request({
            url: '/api/blade-bip/fea-evaluation-problem/submit',
            method: 'post',
            data,
        });
    },

    // 删除
    remove(params) {
        return http.request({
            url: '/api/blade-bip/fea-evaluation-problem/remove',
            method: 'DELETE',
            params,
        });
    },

    planList(params) {
        return http.request({
            url: '/api/blade-bip/plan-item/list',
            method: 'get',
            params,
        });
    },
};
