import http from '@/http/api.js';
export const detail = (params) => {
    return http.request({
        url: '/api/blade-bip/mmr-plan-order-phase/detail',
        method: 'GET',
        params,
    });
};

export const submit = (data) => {
    return http.request({
        url: '/api/blade-bip/mmr-plan-order-phase/submit',
        method: 'POST',
        data,
    });
};
