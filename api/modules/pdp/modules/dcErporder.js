import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/dc/erpOrder/item-list',
            method: 'get',
            params,
        });
    },

    // 详情
    detail(params) {
        return http.request({
            url: '/api/blade-bip/dc/erpOrder/detail',
            method: 'get',
            params,
        });
    },

    //   保存
    submit(data) {
        return http.request({
            url: '/api/blade-bip/dc/erpOrder/submit',
            method: 'post',
            data,
        });
    },
    // 保存
    saveItem(data) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/ne/save-item',
            method: 'post',
            data,
        });
    },

    // 提交
    pass(data) {
        return http.request({
            url: '/api/blade-bip/dc/erpOrder/pass',
            method: 'post',
            data,
        });
    },

    // 驳回
    reject(data) {
        return http.request({
            url: '/api/blade-bip/dc/erpOrder/reject',
            method: 'post',
            data,
        });
    },

    // 主数据列表
    erpList(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/item/list',
            method: 'get',
            params,
        });
    },

    orderSubmit(data) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/item/submit',
            method: 'post',
            data,
        });
    },

    orderSubmitList(data) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/item/submit-list',
            method: 'post',
            data,
        });
    },

    orderSubmitTpmList(data) {
        return http.request({
            url: '/api/blade-bip/dc/erpOrder/submit-tpm',
            method: 'post',
            data,
        });
    },

    //  字典
    dict(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/biz/type-map',
            method: 'get',
            params,
        });
    },

    // 删除

    remove(params) {
        return http.request({
            url: '/api/blade-bip/dc/erpOrder/remove',
            method: 'DELETE',
            params,
        });
    },

    neList(params) {
        return http.request({
            // url: '/api/blade-bip/dc/erp/order/ne/list',
            url: '/api/blade-bip/dc/erp/order/ne/list',
            method: 'get',
            params,
        });
    },

    nePass(data, query) {
        return http.request({
            url: query?.orgId
                ? `/blade-bip/dc/erp/order/ne/pass?orgId=${query?.orgId}&stockOrgId=${query?.stockOrgId}`
                : '/blade-bip/dc/erp/order/ne/pass',
            method: 'post',
            data,
        });
    },
    neReject(data) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/ne/reject',
            method: 'post',
            data,
        });
    },

    neDetail(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/ne/detail',
            method: 'get',
            params,
        });
    },
    neGetDetail(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/ne/get-detail',
            method: 'get',
            params,
        });
    },
    neSubmit(data) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/ne/submit',
            method: 'post',
            data,
        });
    },
    neDelete(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/ne/remove',
            method: 'DELETE',
            params,
        });
    },
    getAuditUsers(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/header-audit',
            method: 'get',
            params,
        });
    },
};
