import http from '@/http/api.js';

export default {
    //分解计划-领料查询-物料清单页面
    getMoItemMrList(params) {
        return http.request({
            url: '/api/blade-bip/mps/mo-item/mr-list',
            method: 'get',
            params,
        });
    },
    //二级列表
    getMoItemSecondList(params) {
        return http.request({
            url: '/api/blade-bip/mps/mo-item/second-list',
            method: 'get',
            params,
        });
    },
};
