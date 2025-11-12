import http from '@/http/api.js';

export default {
    // 代工厂数据
    list(params) {
        return http.request({
            url: '/api/blade-bip/foundry/list',
            method: 'get',
            params,
        });
    },

    // 商代工厂保存数据
    submit(data) {
        return http.request({
            url: '/api/blade-bip/foundry/submit',
            method: 'post',
            data,
        });
    },
    // 商代工厂删除数据
    remove(ids) {
        return http.request({
            url: `/api/blade-bip/foundry/remove?ids=${ids}`,
            method: 'DELETE',
        });
    },
};
