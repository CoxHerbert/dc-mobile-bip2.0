import http from '@/http/api.js';

// 角色管理
export const getList = (params) => {
    return http.request({
        url: '/api/blade-system/role/list',
        method: 'GET',
        params,
    });
};

export const remove = (ids) => {
    return http.request({
        url: '/api/blade-system/role/remove',
        method: 'post',
        params: {
            ids,
        },
    });
};

export const add = (row) => {
    return http.request({
        url: '/api/blade-system/role/submit',
        method: 'post',
        data: row,
    });
};

export const update = (row) => {
    return http.request({
        url: '/api/blade-system/role/submit',
        method: 'post',
        data: row,
    });
};

export const roleTree = (params) => {
    return http.request({
        url: '/api/blade-system/role/tree-by-id',
        method: 'GET',
        params,
    });
};

export const menuTree = (params) => {
    return http.request({
        url: '/api/blade-system/menu/grant-tree',
        method: 'GET',
        params,
    });
};

export const menuTreeKey = (params) => {
    return http.request({
        url: '/api/blade-system/menu/role-tree-keys',
        method: 'GET',
        params,
    });
};

export const grant = (data) => {
    return http.request({
        url: '/api/blade-system/role/grant',
        method: 'post',
        data,
    });
};
