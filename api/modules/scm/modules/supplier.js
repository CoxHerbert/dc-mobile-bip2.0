import http from '@/http/api.js';

// 列表
export default {
    getList(params) {
        return http.request({
            url: '/api/blade-bip/ScmSupplier/list',
            method: 'get',
            params,
        });
    },

    // 添加和修改
    submit(data) {
        return http.request({
            url: '//blade-bip/ScmSupplier/supplier-submit',
            method: 'post',
            data,
        });
    },

    // 详情
    getDetail(params) {
        return http.request({
            url: '/api/blade-bip/ScmSupplier/supplier-detail',
            method: 'get',
            params,
        });
    },

    // 审核
    supplierUpdate(data) {
        return http.request({
            url: '/api/blade-bip/ScmSupplier/supplier-update',
            method: 'post',
            data,
        });
    },

    // 删除
    remove(ids) {
        return http.request({
            url: '/api/blade-bip/ScmSupplier/supplier-remove',
            method: 'post',
            params: {
                ids,
            },
        });
    },
};
