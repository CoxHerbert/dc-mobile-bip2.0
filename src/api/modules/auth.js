import http from '@/http/api.js';

export default {
    // 根据uuid获取用户信息
    consumeTicket(params) {
        return http.request({
            url: '/blade-message/url-match-ticket/skip-url/consume-ticket',
            method: 'GET',
            params,
        });
    },
};
