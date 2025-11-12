import http from '@/http/api.js';

export default {
    detail(params) {
        return http.request({
            url: '/api/blade-bip/mmr-staff-schedule/detail-by-order-id',
            method: 'get',
            params,
        });
    },
};
