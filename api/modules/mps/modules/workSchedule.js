import http from '@/http/api.js';

export default {
    // 缺料查询接口
    getMaterialInfo(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/get-material-info',
            method: 'get',
            params,
        });
    },
};
