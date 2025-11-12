import http from '@/http/api.js';

export default {
    list(params) {
        return http.request({
            url: '/api/blade-develop/model/list',
            method: 'get',
            params,
        });
    },

    getModelPrototype(params) {
        return http.request({
            url: '/api/blade-develop/model/model-prototype',
            method: 'get',
            params,
        });
    },
};
