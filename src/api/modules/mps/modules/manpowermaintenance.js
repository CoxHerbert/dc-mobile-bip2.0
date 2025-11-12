import http from '@/http/api.js';

export default {
    // 人力日历
    getWorkManpowerList(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-manpower/list',
            method: 'get',
            params,
        });
    },

    //   新增数据接口
    postWorkManpowerInsert(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-manpower/insert',
            method: 'post',
            params,
        });
    },

    //   树形数据接口
    getWorkManpowerTreeGroup(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-manpower/tree-group',
            method: 'get',
            params,
        });
    },
};
