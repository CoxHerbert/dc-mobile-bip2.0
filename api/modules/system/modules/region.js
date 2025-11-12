import http from '@/http/api.js';

export default {
    getList(current, size, params) {
        return http.request({
            url: '/api/blade-system/region/list',
            method: 'get',
            params: {
                ...params,
                current,
                size,
            },
        });
    },

    getLazyTreegetList(parentCode, params) {
        return http.request({
            url: '/api/blade-system/region/lazy-tree',
            method: 'get',
            params: {
                ...params,
                parentCode,
            },
        });
    },

    getLazyTreeLevelThree(params) {
        return http.request({
            url: '/api/blade-system/region/lazy-tree-level-three',
            method: 'get',
            params,
        });
    },

    getDetailgetList(code) {
        return http.request({
            url: '/api/blade-system/region/detail',
            method: 'get',
            params: {
                code,
            },
        });
    },

    removegetList(id) {
        return http.request({
            url: '/api/blade-system/region/remove',
            method: 'post',
            params: {
                id,
            },
        });
    },

    submitgetList(row) {
        return http.request({
            url: '/api/blade-system/region/submit',
            method: 'post',
            data: row,
        });
    },
};
