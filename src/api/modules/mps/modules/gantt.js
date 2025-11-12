import http from '@/http/api.js';

export default {
    // 数据展示
    getMpsWorkSchedules(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/list',
            method: 'get',
            params,
        });
    },
    // 排程时间查询
    getGanttDate() {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/get-date',
            method: 'get',
        });
    },
    // 排程时间查询
    getMtoList() {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/get-mto',
            method: 'get',
        });
    },
    // 排程时间查询
    postAutoSchedule() {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/auto-schedule',
            method: 'post',
        });
    },
    // 自动排程接口
    postAutoSchedule() {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/auto-schedule',
            method: 'post',
        });
    },
    // 修改排程
    updateMoSchedule(data) {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/update',
            method: 'post',
            data,
        });
    },
};
