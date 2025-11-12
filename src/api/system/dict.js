import http from '@/http/api.js';

//
export const dictionary = (params) => {
    return http.request({
        url: '/api/blade-system/dict/dictionary',
        method: 'GET',
        params,
    });
};

export const parentList = (params) => {
    return http.request({
        url: '/api/blade-system/dict/parent-list',
        method: 'GET',
        params,
    });
};

export const remove = (ids) => {
    return http.request({
        url: '/api/blade-system/dict/remove',
        method: 'post',
        params: {
            ids,
        },
    });
};

export const add = (row) => {
    return http.request({
        url: '/api/blade-system/dict/submit',
        method: 'post',
        data: row,
    });
};

export const update = (row) => {
    return http.request({
        url: '/api/blade-system/dict/submit',
        method: 'post',
        data: row,
    });
};

export const dictTree = (params) => {
    return http.request({
        url: '/api/blade-system/dict/tree?code=DICT',
        method: 'GET',
        params,
    });
};

export const child = (params) => {
    return http.request({
        url: '/api/blade-system/dict/child-list',
        method: 'GET',
        params,
    });
};
