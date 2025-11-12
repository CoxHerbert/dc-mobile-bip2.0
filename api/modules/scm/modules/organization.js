import http from '@/http/api.js';

export default {
    // 组织列表
    getList(params) {
        return http.request({
            url: '/api/blade-bip/ScmOrg/list',
            method: 'get',
            params,
        });
    },

    // 添加和修改
    submit(data) {
        return http.request({
            url: '/api/blade-bip/ScmOrg/submit',
            method: 'post',
            data,
        });
    },

    // 删除
    remove(ids) {
        return http.request({
            url: '/api/blade-bip/ScmOrg/remove',
            method: 'delete',
            params: {
                ids,
            },
        });
    },
};
