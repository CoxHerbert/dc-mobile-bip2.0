import http from '@/http/api.js';

// 获取通知公告列表
export const getList = (params) => {
    return http.request({
        url: '/api/blade-desk/notice/list',
        method: 'GET',
        params,
    });
};

export const remove = (ids) => {
    return http.request({
        url: '/api/blade-desk/notice/remove',
        method: 'post',
        params: {
            ids,
        },
    });
};

export const add = (row) => {
    return http.request({
        url: '/api/blade-desk/notice/submit',
        method: 'post',
        data: row,
    });
};

export const update = (row) => {
    return http.request({
        url: '/api/blade-desk/notice/submit',
        method: 'post',
        data: row,
    });
};
