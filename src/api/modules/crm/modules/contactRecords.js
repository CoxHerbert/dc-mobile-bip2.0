import http from '@/http/api.js';

export default {
    // 跟进记录列表
    getContactRecordsList(params) {
        return http.request({
            url: '/api/blade-bip/contact-records/list',
            method: 'get',
            params,
        });
    },

    // 跟进记录列表map
    getContactRecordsGetLitMap(params) {
        return http.request({
            url: '/api/blade-bip/contact-records/get-lit-map',
            method: 'get',
            params,
        });
    },

    // 跟进记录新增
    getContactRecordsList(params) {
        return http.request({
            url: '/api/blade-bip/contact-records/list',
            method: 'get',
            params,
        });
    },

    // 跟进记录提交
    postContactRecordsSubmit(data) {
        return http.request({
            url: '/api/blade-bip/contact-records/submit',
            method: 'post',
            data,
        });
    },

    // 跟进记录删除
    deleteContactRecordsRemove(params) {
        return http.request({
            url: '/api/blade-bip/contact-records/remove',
            method: 'delete',
            params,
        });
    },
};
