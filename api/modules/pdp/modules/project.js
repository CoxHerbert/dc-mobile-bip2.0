import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/project/list',
            method: 'get',
            params,
        });
    },
    // 新增或修改
    submit(data) {
        return http.request({
            url: '/api/blade-bip/project/submit',
            method: 'post',
            data,
        });
    },
    // 项目详情
    detail(params) {
        return http.request({
            url: '/api/blade-bip/project/detail',
            method: 'get',
            params,
        });
    },
    endCustomerCodeList(params) {
        return http.request({
            url: '/api/blade-bip/end-customer-project-code/list',
            method: 'get',
            params,
        });
    },
    // 项目删除
    delete(params) {
        return http.request({
            url: '/api/blade-bip/project/remove',
            method: 'DELETE',
            params,
        });
    },

    // 获取项目信息
    findProjectVo(params) {
        return http.request({
            url: '/api/blade-bip/project/find-project-vo',
            method: 'GET',
            params,
        });
    },

    // 可创建交付启动会的项目列表
    findProjectDelivered(params) {
        return http.request({
            url: '/api/blade-bip/delivered/find-project-delivered',
            method: 'GET',
            params,
        });
    },
};
