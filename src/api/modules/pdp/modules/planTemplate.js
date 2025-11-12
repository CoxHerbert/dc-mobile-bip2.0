import http from '@/http/api.js';

export default {
    // 计划模板列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/plan-template/list',
            method: 'get',
            params,
        });
    },
    // 提交或保存
    submit(data) {
        return http.request({
            url: '/api/blade-bip/plan-template/submit',
            method: 'post',
            data,
        });
    },
    // 模板详情
    detail(params) {
        return http.request({
            url: '/api/blade-bip/plan-tempitem/detail',
            method: 'get',
            params,
        });
    },
    // 模板删除
    remove(params) {
        return http.request({
            url: '/api/blade-bip/plan-template/remove',
            method: 'delete',
            params,
        });
    },
};
