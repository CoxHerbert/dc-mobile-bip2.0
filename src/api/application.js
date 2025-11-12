import http from '@/http/api.js';

// 入库单列表
export const inventorylist = (params) => {
    return http.request({
        url: '/api/blade-bip/dc-wms-in-stock/list',
        method: 'GET',
        params,
    });
};

// 入库单详情
export const inventoryDetail = (params) => {
    return http.request({
        url: '/api/blade-bip/dc-wms-in-stock/detail',
        method: 'GET',
        params,
    });
};

// 根据单据查询入库单详情
export const detailByInStockNumber = (params) => {
    return http.request({
        url: '/api/blade-bip/dc-wms-in-stock-detail/query-source-documents-by-type',
        method: 'GET',
        params,
    });
};

// 入库单审核通过
export const inventoryAudit = (data) => {
    return http.request({
        url: '/api/blade-bip/dc-wms-in-stock/submit-audit',
        method: 'post',
        data,
    });
};

// 入库单审核驳回
export const inventoryAuditReject = (data) => {
    return http.request({
        url: '/api/blade-bip/dc-wms-in-stock/reject',
        method: 'post',
        data,
    });
};

// 入库单保存
export const inventoryAdd = (data) => {
    return http.request({
        url: '/api/blade-bip/dc-wms-in-stock/submit-detail',
        method: 'post',
        data,
    });
};

// 用户
export const userList = (data) => {
    return http.request({
        url: '/api/blade-bip/bip-blade-user/select-data',
        method: 'post',
        data,
    });
};



