import http from '@/http/api.js';

export default {
    // scm-出库单-list
    getList(params) {
        return http.request({
            url: '/api/blade-bip/scm-out-stock/list',
            method: 'get',
            params,
        });
    },
    // scm-出库单-detail
    getDetail(params) {
        return http.request({
            url: '/api/blade-bip/scm-out-stock/detail',
            method: 'get',
            params,
        });
    },
    // scm-出库单-submit
    submit(data) {
        return http.request({
            url: '/api/blade-bip/scm-out-stock/submit',
            method: 'post',
            data,
        });
    },
    // scm-出库单-remove
    remove(params) {
        return http.request({
            url: '/api/blade-bip/scm-out-stock/remove',
            method: 'delete',
            params,
        });
    },
    // scm-出库单-audit
    audit(data) {
        return http.request({
            url: '/api/blade-bip/scm-out-stock/audit',
            method: 'post',
            data,
        });
    },
};
