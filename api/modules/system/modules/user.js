import http from '@/http/api.js';
export default {
    getList(params) {
        return http.request({
            url: '/api/blade-system/user/page',
            method: 'get',
            params,
        });
    },

    remove(ids) {
        return http.request({
            url: '/api/blade-system/user/remove',
            method: 'post',
            params: {
                ids,
            },
        });
    },

    add(row) {
        return http.request({
            url: '/api/blade-system/user/submit',
            method: 'post',
            data: row,
        });
    },

    update(row) {
        return http.request({
            url: '/api/blade-system/user/update',
            method: 'post',
            data: row,
        });
    },

    getUser(id) {
        return http.request({
            url: '/api/blade-system/user/detail',
            method: 'get',
            params: {
                id,
            },
        });
    },

    checkOldPw(params) {
        return http.request({
            url: '/api/blade-system/dc-system-user/check-old-pw',
            method: 'get',
            params,
        });
    },

    updatePassword(data) {
        return http.request({
            url: '/api/blade-system/dc-system-user/update-password',
            method: 'post',
            data,
        });
    },
    // 保存已选
    collectSelectUser(params) {
        return http.request({
            url: '/api/blade-bip/collect/remark',
            method: 'post',
            noErrorMsg: true,
            data: params,
        });
    },
    // 查询已选
    recentlySelectedUsers() {
        return http.request({
            url: '/api/blade-bip/bip-blade-user/frequently-used-users',
            method: 'get',
        });
    },
    getUserInfo() {
        return http.request({
            url: '/blade-bip/home-user/h5-user-info',
            method: 'get',
        });
    },
    getUserDailyAttendanceInfo(params) {
        return http.request({
            url: '/blade-bip/home-user/user-daily-attendance-info',
            method: 'get',
            params,
        });
    },
};
