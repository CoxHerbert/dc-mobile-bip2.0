import http from '@/http/api.js';

export default {
    // 计划模板明细列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/configure/list',
            method: 'get',
            params,
        });
    },
    // 新增或修改
    submit(data) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/configure/submit',
            method: 'post',
            data,
        });
    },
    // 删除
    remove(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/configure/remove',
            method: 'DELETE',
            params,
        });
    },
    detail(params) {
        return http.request({
            url: '/api/blade-bip/dc/erp/order/configure/detail',
            method: 'get',
            params,
        });
    },
};
