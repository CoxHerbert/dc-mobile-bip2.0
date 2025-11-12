import http from '@/http/api.js';

const prefix = '/blade-workflow/app/process';

// 可发起流程列表
export const list = (params) => {
    return http.request({
        url: `${prefix}/list`,
        method: 'GET',
        params,
    });
};

// 待办列表
export const todoList = (params) => {
    return http.request({
        url: `${prefix}/todoList`,
        method: 'GET',
        params,
    });
};

// 办结列表
export const doneList = (params) => {
    return http.request({
        url: `${prefix}/doneList`,
        method: 'GET',
        params,
    });
};

// 我的已办列表
export const myDoneList = (params) => {
    return http.request({
        url: `${prefix}/myDoneList`,
        method: 'GET',
        params,
    });
};

// 我的申请列表
export const sendList = (params) => {
    return http.request({
        url: `${prefix}/sendList`,
        method: 'GET',
        params,
    });
};

// 待签列表
export const claimList = (params) => {
    return http.request({
        url: `${prefix}/claimList`,
        method: 'GET',
        params,
    });
};
