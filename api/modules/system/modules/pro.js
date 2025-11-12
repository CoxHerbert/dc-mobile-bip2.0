import http from '@/http/api.js';

export default {
    // 列表分页查询
    getSupplierList(params) {
        return http.request({
            url: '/api/blade-erp/pro/supplier-list',
            method: 'get',
            params,
        });
    },
    // 列表分页查询
    getStockMaterialList(params) {
        return http.request({
            url: '/api/blade-erp/pro/stock-material-list',
            method: 'get',
            params,
        });
    },

    // 工序工作查询
    getWorkCenterList(params) {
        return http.request({
            url: '/api/blade-erp/pro/work-center-list',
            method: 'get',
            params,
        });
    },
    // 工序作业查询
    getActivityCenterList(params) {
        return http.request({
            url: '/api/blade-erp/pro/activity-center-list',
            method: 'get',
            params,
        });
    },
    // 工序外发详情
    getProDetail(params) {
        return http.request({
            url: '/api/blade-bip/ErpProcessOutsourc/pro-detail',
            method: 'get',
            params,
        });
    },
    // 工序外发保存
    proSubmit(data) {
        return http.request({
            url: '/api/blade-bip/ErpProcessOutsourc/pro-submit',
            method: 'post',
            data,
        });
    },
};
