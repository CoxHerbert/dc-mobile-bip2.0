import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/fea-evaluation/list',
            method: 'get',
            params,
        });
    },

    // 保存
    subimt(data) {
        return http.request({
            url: '/api/blade-bip/fea-evaluation/submit',
            method: 'post',
            data,
        });
    },

    // 删除
    remove(ids) {
        return http.request({
            url: '/api/blade-bip/fea-evaluation/remove',
            method: 'DELETE',
            params: {
                ids,
            },
        });
    },

    // 明细
    details(params) {
        return http.request({
            url: '/api/blade-bip/fea-evaluation/details',
            method: 'get',
            params,
        });
    },

    demo(params) {
        return http.request({
            url: '/api/blade-bip/dc-fea/init-template',
            method: 'get',
            params,
        });
    },
};
