import http from '@/http/api.js';

export default {
    // 详情附件
    getPmsFileManagerGetFileById(params) {
        return http.request({
            url: '/api/blade-bip/pms-file-manager/get-file-by-id',
            method: 'get',
            params,
        });
    },
};
