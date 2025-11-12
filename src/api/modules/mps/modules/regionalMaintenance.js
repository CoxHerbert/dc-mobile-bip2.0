import http from '@/http/api.js';

export default {
    // 主列表数据接口
    list(params) {
        return http.request({
            url: '/api/blade-bip/mps/regional-maintenance/list',
            method: 'get',
            params,
        });
    },
    // 删除接口数据接口
    remove(params) {
        return http.request({
            url: '/api/blade-bip/mps/regional-maintenance/delete',
            method: 'post',
            params,
        });
    },
    // 新增数据接口
    create(data) {
        return http.request({
            url: '/api/blade-bip/mps/regional-maintenance/insert',
            method: 'post',
            data,
        });
    },
    // 编辑接口数据接口
    update(data) {
        return http.request({
            url: '/api/blade-bip/mps/regional-maintenance/update',
            method: 'post',
            data,
        });
    },
};
