import http from '@/http/api.js';

export default {
    getList(params) {
        return http.request({
            url: '/api/blade-system/dept/list',
            method: 'get',
            params,
        });
    },

    getLazyList(params) {
        return http.request({
            url: '/api/blade-system/dept/lazy-list',
            method: 'get',
            params,
        });
    },

    remove(params) {
        return http.request({
            url: '/api/blade-system/dept/remove',
            method: 'post',
            params,
        });
    },

    add(data) {
        return http.request({
            url: '/api/blade-system/dept/submit',
            method: 'post',
            data,
        });
    },

    update(data) {
        return http.request({
            url: '/api/blade-system/dept/submit',
            method: 'post',
            data,
        });
    },

    getDept(id) {
        return http.request({
            url: '/api/blade-system/dept/detail',
            method: 'get',
            params: {
                id,
            },
        });
    },

    getDeptTree(tenantId) {
        return http.request({
            url: '/api/blade-system/dept/tree',
            method: 'get',
            params: {
                tenantId,
            },
        });
    },

    getDeptLazyTree(parentId) {
        return http.request({
            url: '/api/blade-system/dept/lazy-tree',
            method: 'get',
            params: {
                parentId,
            },
        });
    },
};
