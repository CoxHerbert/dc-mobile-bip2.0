import http from '@/http/api.js';

export default {
    // 客户需求表主数据列表 map
    getMap(params) {
        return http.request({
            url: '/api/blade-bip/customer-rlist/get-lit-map',
            method: 'get',
            params,
        });
    },

    // 客户需求表主数据列表 不带map
    list(params) {
        return http.request({
            url: '/api/blade-bip/customer-rlist/list',
            method: 'get',
            params,
        });
    },

    // 提交保存
    submit(data) {
        return http.request({
            url: '/api/blade-bip/customer-rlist/submit',
            method: 'post',
            data,
        });
    },

    // 客户需求表删除
    remove(params) {
        return http.request({
            url: '/api/blade-bip/customer-rlist/remove',
            method: 'DELETE',
            params,
        });
    },
    // 客户需求表明细
    detail(params) {
        return http.request({
            url: '/api/blade-bip/customer-rlist/detail',
            method: 'get',
            params,
        });
    },

    // 客户需求表保存
    postCustomerRlistSubmit(data) {
        return http.request({
            url: '/api/blade-bip/customer-rlist/submit',
            method: 'post',
            data,
        });
    },

    // 客户需求表升版
    updateVersion(data) {
        return http.request({
            url: '/api/blade-bip/customer-rlist/upgrade',
            method: 'post',
            data,
        });
    },

    // 历史版本
    history(params) {
        return http.request({
            url: '/api/blade-bip/customer-rlist/historical-versions',
            method: 'get',
            params,
        });
    },

    // 获取配置项
    getConfigueList() {
        return http.request({
            url: '/api/blade-bip/customer-rlist/configue-list',
            method: 'get',
        });
    },

    // 工艺配置项表
    getTechnologyConfigueList(params) {
        return http.request({
            url: '/api/blade-bip/rlist-technology-item/technology-configue-list',
            method: 'get',
            params,
        });
    },
};
