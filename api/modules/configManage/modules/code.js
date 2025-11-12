import http from '@/http/api.js';

export default {
    // 代码生成器
    submit(data) {
        return http.request({
            url: '/api/blade-develop/code/generate',
            method: 'post',
            data,
        });
    },
};
