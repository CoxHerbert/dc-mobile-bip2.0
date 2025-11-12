import http from '@/http/api.js';

export default {
    // 客户名称模糊查询
    getCustomerLikeList(params) {
        return http.request({
            url: '/api/blade-bip/customer/customer-like-list',
            method: 'get',
            params,
        });
    },

    // 客户主数据列表
    getCustomerList(params) {
        return http.request({
            url: '/api/blade-bip/customer/list',
            method: 'get',
            params,
        });
    },

    // 客户删除接口
    deleteCustomerRemove(params) {
        return http.request({
            url: '/api/blade-bip/customer/remove',
            method: 'DELETE',
            params,
        });
    },

    // 客户详情接口
    getDetail(params) {
        return http.request({
            url: '/api/blade-bip/customer/detail',
            method: 'get',
            params,
        });
    },

    getLog(data) {
        return http.request({
            url: '/api/blade-log/usual/list-by-log-id',
            method: 'post',
            data,
        });
    },

    // 客户保存接口
    postCustomerSubmit(data) {
        return http.request({
            url: '/api/blade-bip/customer/submit',
            method: 'post',
            data,
        });
    },

    // 企业名称模糊查询
    getCustomerFuzzySearchForEnterpriseName(params) {
        return http.request({
            url: '/api/blade-bip/customer/fuzzy-search-for-enterprise-name',
            method: 'get',
            params,
        });
    },

    // 企业工商照面查询
    getCustomerEnterpriseBusinessLicenseInquiry(params) {
        return http.request({
            url: '/api/blade-bip/customer/enterprise-business-license-inquiry',
            method: 'get',
            params,
        });
    },
};
