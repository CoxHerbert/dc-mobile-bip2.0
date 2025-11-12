import http from '@/http/api.js';

// 列表
export default {
    getList(params) {
        return http.request({
            url: '/api/blade-bip/scm-in-stock/list',
            method: 'get',
            params,
        });
    },

    // 添加和修改
    submit(data) {
        return http.request({
            url: '/api/blade-bip/scm-in-stock/submit',
            method: 'post',
            data,
        });
    },

    // 详情
    getDetail(params) {
        return http.request({
            url: '/api/blade-bip/scm-in-stock/detail',
            method: 'get',
            params,
        });
    },

    //   // 保存
    //   supplierUpdate(data) {
    //     return http.request({
    //       url: '/api/blade-bip/dc-wms-in-stock/submit-audit',
    //       method: 'post',
    //       data,
    //     });
    //   },

    // 审核
    wareHouseAudit(data) {
        return http.request({
            url: '/api/blade-bip/scm-in-stock/audit',
            method: 'post',
            data,
        });
    },
    // 审核驳回
    wareHouseReject(data) {
        return http.request({
            url: '/api/blade-bip/dc-wms-in-stock/reject',
            method: 'post',
            data,
        });
    },
    // 删除
    remove(ids) {
        return http.request({
            url: '/api/blade-bip/dc-wms-in-stock-detail/remove',
            method: 'delete',
            params: {
                ids,
            },
        });
    },
};
