import http from '@/http/api.js';

export default {
    getNoticeList(data) {
        return http.request({
            url: '/api/blade-auth/oauth/captcha',
            method: 'GET',
            data,
        });
    },
};
