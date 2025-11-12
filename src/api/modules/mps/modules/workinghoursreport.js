import http from '@/http/api.js';

export default {
    list(params) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/list',
            method: 'get',
            params,
        });
    },

    detail(params) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/detail',
            method: 'get',
            params,
        });
    },

    submit(data) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/submit',
            method: 'post',
            data,
        });
    },

    // 删除
    remove(params) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/remove-report',
            method: 'delete',
            params,
        });
    },

    // 明细列表
    planList(params) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/plan-list',
            method: 'get',
            params,
        });
    },

    // 计划明细
    planDetail(params) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/plan-detail',
            method: 'get',
            params,
        });
    },

    // 计划提交
    reporSavetSubmit(data, params) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/report-save',
            method: 'post',
            data,
            params,
        });
    },

    //获取明细
    queryDetailErp(params) {
        return http.request({
            url: '/api/blade-bip/mps/Wksr/query-erp',
            method: 'get',
            params,
        });
    },

    // 获取plan计划信息
    getPlanInfo(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/get-plan-info',
            method: 'get',
            params,
        });
    },

    // 缺料查询接口
    getMaterialInfo(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/get-material-info',
            method: 'get',
            params,
        });
    },
};
