import http from '@/http/api.js';

// 列表
export default {
    getList(params) {
        return http.request({
            url: '/api/blade-bip/ScmPurchaseRequest/list',
            method: 'get',
            params,
        });
    },

    // 添加和修改
    submit(data) {
        return http.request({
            url: '/api/blade-bip/ScmPurchaseRequest/pr-submit',
            method: 'post',
            data,
        });
    },

    // 详情
    getDetail(params) {
        return http.request({
            url: '/api/blade-bip/ScmPurchaseRequest/pr-detail',
            method: 'get',
            params,
        });
    },

    // 审核
    toExamine(data) {
        return http.request({
            url: '/api/blade-bip/ScmPurchaseRequest/pr-commit',
            method: 'post',
            data,
        });
    },

    // 采购申请作废
    invalid(data) {
        return http.request({
            url: '/api/blade-bip/ScmPurchaseRequest/pr-invalid',
            method: 'post',
            data,
        });
    },

    // 删除
    remove(ids) {
        return http.request({
            url: '/api/blade-bip/ScmPurchaseRequest/pr-remove',
            method: 'post',
            params: {
                ids,
            },
        });
    },
};
