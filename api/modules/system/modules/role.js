import http from '@/http/api.js';

export default {
    getList(params) {
        return http.request({
            url: '/api/blade-system/role/list',
            method: 'get',
            params,
        });
    },
    grantTree() {
        return http.request({
            url: '/api/blade-system/menu/grant-tree',
            method: 'get',
        });
    },

    grant(roleIds, menuIds, dataScopeIds, apiScopeIds, topMenuIds) {
        return http.request({
            url: '/api/blade-system/role/grant',
            method: 'post',
            data: {
                roleIds,
                menuIds,
                dataScopeIds,
                apiScopeIds,
                topMenuIds,
            },
        });
    },

    removeids() {
        return http.request({
            url: '/api/blade-system/role/remove',
            method: 'post',
            params: {
                ids,
            },
        });
    },

    addrow() {
        return http.request({
            url: '/api/blade-system/role/submit',
            method: 'post',
            data: row,
        });
    },

    updaterow() {
        return http.request({
            url: '/api/blade-system/role/submit',
            method: 'post',
            data: row,
        });
    },

    getRoleroleIds() {
        return http.request({
            url: '/api/blade-system/menu/role-tree-keys',
            method: 'get',
            params: {
                roleIds,
            },
        });
    },

    getRoleTreetenantId() {
        return http.request({
            url: '/api/blade-system/role/tree',
            method: 'get',
        });
    },

    getRoleTreeByIdroleId() {
        return http.request({
            url: '/api/blade-system/role/tree-by-id',
            method: 'get',
            params: {
                roleId,
            },
        });
    },
};
