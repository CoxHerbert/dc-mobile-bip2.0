import http from '@/http/api.js';

export default {
    // 收藏 取消收藏
    collectRemark(remarkType, data) {
        return http.request({
            url: '/api/blade-bip/collect/remark?collectType=' + remarkType,
            method: 'post',
            headers: {
                'Content-Type': 'application/json', // 强制指定为 JSON 格式
            },
            data, // Axios 会自动序列化为 JSON
        });
    },

    // 查询收藏
    collectView(remarkType) {
        const params = { collectType: remarkType };
        return http.request({
            url: '/api/blade-bip/collect/view',
            method: 'get',
            params,
        });
    },
};
