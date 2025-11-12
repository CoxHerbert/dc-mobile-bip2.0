import http from '@/http/api.js';

export default {
    // 主数据列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/mmr-project-config/list',
            method: 'get',
            params,
        });
    },

    // 保存接口
    submit(data) {
        return http.request({
            url: '/api/blade-bip/mmr-project-config/submit',
            method: 'post',
            data,
        });
    },
    // 删除接口
    remove(params) {
        return http.request({
            url: '/api/blade-bip/mmr-project-config/remove',
            method: 'DELETE',
            params,
        });
    },
};
