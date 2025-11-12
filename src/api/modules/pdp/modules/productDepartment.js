import http from '@/http/api.js';

export default {
    // 计划模板列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/dc-mmr-product-dept/list',
            method: 'get',
            params,
        });
    },
    // 提交或保存
    submit(data) {
        return http.request({
            url: '/api/blade-bip/dc-mmr-product-dept/submit',
            method: 'post',
            data,
        });
    },
    // 模板详情
    detail(params) {
        return http.request({
            url: '/api/blade-bip/dc-mmr-product-dept/detail',
            method: 'get',
            params,
        });
    },
    // 模板删除
    remove(params) {
        return http.request({
            url: '/api/blade-bip/dc-mmr-product-dept/remove',
            method: 'delete',
            params,
        });
    },
};
