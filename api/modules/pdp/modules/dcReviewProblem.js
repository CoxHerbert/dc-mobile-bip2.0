import http from '@/http/api.js';

export default {
    //   问题抽屉提交
    submit(data) {
        return http.request({
            url: '/api/blade-bip/dc-review-problem/submit',
            method: 'post',
            data,
        });
    },
};
