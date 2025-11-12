import http from '@/http/api.js';

export default {
    // 分页查询列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/item/schedule/list',
            method: 'get',
            params,
        });
    },
    // 分页查询列表
    submit(data) {
        return http.request({
            url: '/api/blade-bip/item/schedule/updateDailyTimeCount',
            method: 'post',
            data,
        });
    },
};
