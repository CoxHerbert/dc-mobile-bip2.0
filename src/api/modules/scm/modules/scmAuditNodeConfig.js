import http from '@/http/api.js';

// 列表
export default {
    list(params) {
        return http.request({
            url: '/api/blade-bip/scm-audit-node-config/list',
            method: 'get',
            params,
        });
    },

    // 添加和修改
    submit(data) {
        return http.request({
            url: '/api/blade-bip/scm-audit-node-config/submit',
            method: 'post',
            data,
        });
    },

    // 详情
    detail(params) {
        return http.request({
            url: '/api/blade-bip/scm-audit-node-config/detail',
            method: 'get',
            params,
        });
    },
    // 删除
    remove(ids) {
        return http.request({
            url: '/api/blade-bip/scm-audit-node-config/remove',
            method: 'delete',
            params: { ids },
        });
    },
};
