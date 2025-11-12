import http from '@/http/api.js';

export default {
    getList(params) {
        return http.request({
            url: '/api/blade-system/dict-biz/list',
            method: 'get',
            params,
        });
    },

    getParentList(params) {
        return http.request({
            url: '/api/blade-system/dict-biz/parent-list',
            method: 'get',
            params,
        });
    },

    getChildList(params) {
        return http.request({
            url: '/api/blade-system/dict-biz/child-list',
            method: 'get',
            params,
        });
    },

    remove(params) {
        return http.request({
            url: '/api/blade-system/dict-biz/remove',
            method: 'post',
            params,
        });
    },

    add(data) {
        return http.request({
            url: '/api/blade-system/dict-biz/submit',
            method: 'post',
            data,
        });
    },

    update(data) {
        return http.request({
            url: '/api/blade-system/dict-biz/submit',
            method: 'post',
            data,
        });
    },

    getDict(params) {
        return http.request({
            url: '/api/blade-system/dict-biz/detail',
            method: 'get',
            params,
        });
    },
    getDictTree() {
        return http.request({
            url: '/api/blade-system/dict-biz/tree?code=DICT',
            method: 'get',
        });
    },

    getDictionary(params) {
        return http.request({
            url: '/api/blade-system/dict-biz/dictionary',
            method: 'get',
            params,
        });
    },

    getDicts(code) {
        return http.request({
            url: `/api/blade-system/dict-biz/dictionary?code=${code}`,
            method: 'get',
        });
    },
};
