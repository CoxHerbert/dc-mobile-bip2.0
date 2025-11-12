import http from '@/http/api.js';

export default {
    // 商机客户联系人
    list(params) {
        return http.request({
            url: '/api/blade-bip/customer-contacts/list',
            method: 'get',
            params,
        });
    },

    // 商机客户联系人增加
    submit(data) {
        return http.request({
            url: '/api/blade-bip/customer-contacts/submit',
            method: 'post',
            data,
        });
    },

    // 商机客户联系人删除
    delete(params) {
        return http.request({
            url: '/api/blade-bip/customer-contacts/remove',
            method: 'delete',
            params,
        });
    },

    // 详情
    detail(params) {
        return http.request({
            url: '/api/blade-bip/customer-contacts/detail',
            method: 'get',
            params,
        });
    },

    // 人员关系图接口
    relation(params) {
        return http.request({
            url: '/api/blade-bip/customer-contacts/relation',
            method: 'get',
            params,
        });
    },
    newRelation(params) {
        return http.request({
            url: '/api/blade-bip/customer-contacts/new-relation',
            method: 'get',
            params,
        });
    },
};
