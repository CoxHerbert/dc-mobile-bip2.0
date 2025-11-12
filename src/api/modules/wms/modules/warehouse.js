import http from '@/http/api.js';

export default {
    // 仓库列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/dc-wms-warehouse/list',
            method: 'get',
            params,
        });
    },
    // 根据供应商ID获取入库单明细行
    supperList(params) {
        return http.request({
            url: '/api/blade-bip/scm-in-stock-detail/find-po-detail-by-supplier-id',
            method: 'get',
            params,
        });
    },
    // 保存&修改
    submit(data) {
        return http.request({
            url: '/api/blade-bip/dc-wms-warehouse/submit',
            method: 'post',
            data,
        });
    },
    // 明细查询
    detail(params) {
        return http.request({
            url: '/api/blade-bip/dc-wms-warehouse/detail',
            method: 'get',
            params,
        });
    },
    // 删除仓库
    remove(params) {
        return http.request({
            url: '/api/blade-bip/dc-wms-warehouse/remove',
            method: 'delete',
            params,
        });
    },
    // 修改仓库人员
    submitPerson(data) {
        return http.request({
            url: '/api/blade-bip/dc-wms-warehouse/submit-person',
            method: 'post',
            data,
        });
    },

    // 批量创建车位
    batchgenerationlocation(data) {
        return http.request({
            url: '/api/blade-bip/dc-wms-warehouse/batch-generation-location',
            method: 'post',
            data,
        });
    },
    // 异动记录
    getImrList(params) {
        return http.request({
            url: '/api/blade-bip/imr/list',
            method: 'get',
            params,
        });
    },

    // 条码解析

    analyzebarcode(params) {
        return http.request({
            url: '/api/blade-bip/wms-out-stock-opt/analyze-barcode',
            method: 'get',
            params,
        });
    },

    // 扫产品条码获取库存信息
    codetogetdetails(params) {
        return http.request({
            url: '/api/blade-bip/wms-out-stock-opt/scan-the-code-to-get-details',
            method: 'get',
            params,
        });
    },

    // 自动出库-发起出库单
    autooutstock(data) {
        return http.request({
            url: '/api/blade-bip/wms-out-stock-opt/auto-out-stock',
            method: 'post',
            data,
        });
    },

    // 员工考核记录详情
    employeeAssessmentRecordDetail(params) {
        return http.request({
            url: '/api/blade-bip/EmployeeAssessmentRecord/detail',
            method: 'get',
            params,
        });
    },

    // 员工考核记录提交
    employeeAssessmentRecordSubmit(data) {
        return http.request({
            url: '/api/blade-bip/EmployeeAssessmentRecord/submit',
            method: 'post',
            data,
        });
    },
};
