import http from '@/http/api.js';

export default {
    // 列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/CrmCustomerArea/list',
            method: 'get',
            params,
        });
    },

    // 保存或新增
    submit(data) {
        return http.request({
            url: '/api/blade-bip/CrmCustomerArea/submit',
            method: 'post',
            data,
        });
    },
    // 商代工厂删除数据
    remove(params) {
        return http.request({
            url: `/api/blade-bip/CrmCustomerArea/remove`,
            method: 'delete',
            params,
        });
    },
};
