import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/delivered/list',
            method: 'get',
            params,
        });
    },

    // 删除
    remove(params) {
        return http.request({
            url: '/api/blade-bip/delivered/remove',
            method: 'DELETE',
            params,
        });
    },

    // 详情
    detail(params) {
        return http.request({
            url: '/api/blade-bip/delivered/delivered-detail',
            method: 'get',
            params,
        });
    },

    //启动会编辑提交
    submit(data) {
        return http.request({
            url: '/api/blade-bip/delivered/submit',
            method: 'post',
            data,
        });
    },

    // 启动会创建
    createDelivered(data) {
        return http.request({
            url: '/api/blade-bip/delivered/delivered-submit',
            method: 'post',
            data,
        });
    },
};
