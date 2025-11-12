import http from '@/http/api.js';

export default {
    // 批量入职
    bulkOnboarding(data) {
        return http.request({
            url: '/api/blade-bip/laborRegister/bulk-onboarding',
            method: 'post',
            data,
        });
    },
    // 批量拒绝入职
    refusalToOnboard(data) {
        return http.request({
            url: '/api/blade-bip/laborRegister/refusal-to-onboard',
            method: 'post',
            data,
        });
    },
};
