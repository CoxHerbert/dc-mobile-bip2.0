import http from '@/http/api.js';

export default {
    getInspectionRecordOrderList(params) {
        return http.request({
            url: '/api/blade-bip/InspectionRecordOrder/list',
            method: 'get',
            params,
        });
    },
    getInspectionRecordOrderDetail(params) {
        return http.request({
            url: '/api/blade-bip/InspectionRecordOrder/record-detail',
            method: 'get',
            params,
        });
    },
};
