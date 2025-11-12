import http from '@/http/api.js';

// 部门管理
export const getList = (params) => {
    return http.request({
        url: '/api/blade-system/dept/lazy-list',
        method: 'GET',
        params,
    });
};
export const deptTree = (params) => {
    return http.request({
        url: '/api/blade-system/dept/tree',
        method: 'GET',
        params,
    });
};

export const remove = (ids) => {
    return http.request({
        url: '/api/blade-system/dept/remove',
        method: 'post',
        params: {
            ids,
        },
    });
};

export const add = (row) => {
    return http.request({
        url: '/api/blade-system/dept/submit',
        method: 'post',
        data: row,
    });
};

export const update = (row) => {
    return http.request({
        url: '/api/blade-system/dept/submit',
        method: 'post',
        data: row,
    });
};
