import http from '@/http/api.js';

export default {
    // 获取当前用户小组信息
    getWorkGroupInfo() {
        return http.request({
            url: '/api/blade-bip/mps/work-group/get-work-group-info',
            method: 'get',
        });
    },
};
