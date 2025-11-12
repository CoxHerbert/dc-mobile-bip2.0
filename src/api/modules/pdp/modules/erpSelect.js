import http from '@/http/api.js';

export default {
    //   客户查询
    customers(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/customers',
            method: 'get',
            params,
        });
    },
    //   币种
    currencies(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/currencies',
            method: 'get',
            params,
        });
    },

    //   物料编码
    materials(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/materials',
            method: 'get',
            params,
        });
    },

    //   项目名称
    projectNames(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/projectNames',
            method: 'get',
            params,
        });
    },

    //   项目编号
    projectNumbers(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/projectNumbers',
            method: 'get',
            params,
        });
    },

    //   TPM
    tpm(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/tpm',
            method: 'get',
            params,
        });
    },

    //

    // 月结
    collectionTerms(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/collectionTerms',
            method: 'get',
            params,
        });
    },

    // 销售员
    salers(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/salers',
            method: 'get',
            params,
        });
    },

    // 运营跟单
    documentaries(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/documentaries',
            method: 'get',
            params,
        });
    },

    //   表格删除
    delete(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/item/remove',
            method: 'DELETE',
            params,
        });
    },

    // 客户产品
    productSeriation(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/productSeriation',
            method: 'get',
            params,
        });
    },

    // 审核人
    headerAudit(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/select/header-audit',
            method: 'get',
            params,
        });
    },
};
