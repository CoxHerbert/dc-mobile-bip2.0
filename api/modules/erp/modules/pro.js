import http from '@/http/api.js';

export default {
    // erp客户查询
    erpCustomer(params) {
        return http.request({
            url: '/api/blade-erp/pro/erp-customer-list',
            method: 'get',
            params,
        });
    },
    // 销售订单查询
    erpSaleOrder(params) {
        return http.request({
            url: '/api/blade-erp/pro/sale-order-list',
            method: 'get',
            params,
        });
    },
    // 项目名称查询
    erpProject(params) {
        return http.request({
            url: '/api/blade-erp/pro/project-name-list',
            method: 'get',
            params,
        });
    },
};
