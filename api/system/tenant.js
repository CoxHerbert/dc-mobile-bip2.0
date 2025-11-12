import http from '@/http/api.js';

// 租户
export const tenantSelect = (params) => {
    return http.request({
        url: '/api/blade-system/tenant/select',
        method: 'GET',
        params,
    });
};
