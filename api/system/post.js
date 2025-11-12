import http from '@/http/api.js';

// 部门管理
export const getList = (params) => {
    return http.request({
        url: '/api/blade-system/post/list',
        method: 'GET',
        params,
    });
};

export const remove = (ids) => {
    return http.request({
        url: '/api/blade-system/post/remove',
        method: 'post',
        params: {
            ids,
        },
    });
};

export const add = (row) => {
    return http.request({
        url: '/api/blade-system/post/submit',
        method: 'post',
        data: row,
    });
};

export const update = (row) => {
    return http.request({
        url: '/api/blade-system/post/submit',
        method: 'post',
        data: row,
    });
};
