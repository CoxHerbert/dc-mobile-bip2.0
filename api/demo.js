import http from '@/http/api.js';

// 获取验证码
const captcha = (data) => {
    return http.request({
        url: '/api/blade-auth/oauth/captcha',
        method: 'GET',
        data,
    });
};

export default {
    captcha,
};
