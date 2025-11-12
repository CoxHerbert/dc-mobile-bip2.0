import http from '@/http/api.js';

export default {
    // 列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/note/list',
            method: 'get',
            params,
        });
    },

    // 详情
    detail(params) {
        return http.request({
            url: '/api/blade-bip/note/detail',
            method: 'get',
            params,
        });
    },

    // 保存
    submit(data) {
        return http.request({
            url: '/api/blade-bip/note/submit',
            method: 'post',
            data,
        });
    },

    // 删除
    remove(params) {
        return http.request({
            url: '/api/blade-bip/note/remove',
            method: 'DELETE',
            params,
        });
    },
};
