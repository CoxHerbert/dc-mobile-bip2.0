import http from '@/http/api.js';

const prefix = '/blade-workflow/app/task';

// 获取流程发起表单
export const getFormByProcessDefId = (params) => {
    return http.request({
        url: `${prefix}/getFormByProcessDefId`,
        method: 'GET',
        params,
    });
};

// 流程详情
export const detail = (params) => {
    return http.request({
        url: `${prefix}/detail`,
        method: 'GET',
        params,
    });
};

// 发起流程
export const startProcess = (data) => {
    return http.request({
        url: `${prefix}/startProcess`,
        method: 'POST',
        data,
    });
};

// 完成任务
export const completeTask = (data) => {
    return http.request({
        url: `${prefix}/completeTask`,
        method: 'POST',
        data,
    });
};

// 转办任务
export const transferTask = (data) => {
    return http.request({
        url: `${prefix}/transferTask`,
        method: 'POST',
        data,
    });
};

// 委托任务
export const delegateTask = (data) => {
    return http.request({
        url: `${prefix}/delegateTask`,
        method: 'POST',
        data,
    });
};

// 签收任务（签收成功后回到待办任务中）
export const claimTask = (data) => {
    return http.request({
        url: `${prefix}/claimTask`,
        method: 'POST',
        data,
    });
};

// 获取可退回节点
export const getBackNodes = (params) => {
    return http.request({
        url: `${prefix}/getBackNodes`,
        method: 'GET',
        params,
    });
};

// 退回到指定节点
export const rollbackTask = (data) => {
    return http.request({
        url: `${prefix}/rollbackTask`,
        method: 'POST',
        data,
    });
};

// 终止流程
export const terminateProcess = (data) => {
    return http.request({
        url: `${prefix}/terminateProcess`,
        method: 'POST',
        data,
    });
};

// 加签
export const addMultiInstance = (data) => {
    return http.request({
        url: `${prefix}/addMultiInstance`,
        method: 'POST',
        data,
    });
};

// 撤回/撤销
export const withdrawTask = (data) => {
    return http.request({
        url: `${prefix}/withdrawTask`,
        method: 'POST',
        data,
    });
};
