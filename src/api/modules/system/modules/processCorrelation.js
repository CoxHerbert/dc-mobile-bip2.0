import http from '@/http/api.js';

export default {
    // 分页查询列表
    list(params) {
        return http.request({
            url: `/api/blade-bip/process-correlation/list`,
            method: 'get',
            params,
        });
    },
    // 分页查询列表
    detail(params) {
        return http.request({
            url: `/api/blade-bip/process-correlation/detail`,
            method: 'get',
            params,
        });
    },
    // 新增或修改
    submit(data) {
        return http.request({
            url: `/api/blade-bip/process-correlation/submit`,
            method: 'post',
            data,
        });
    },
    // 新增或修改
    remove(params) {
        return http.request({
            url: `/api/blade-bip/process-correlation/remove`,
            method: 'delete',
            params,
        });
    },
};
