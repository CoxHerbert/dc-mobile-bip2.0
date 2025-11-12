import http from '@/http/api.js';

export default {
    // 看板接口
    list() {
        return http.request({
            url: '/api/blade-bip/test/mps-notice-board/init-module-data',
            method: 'get',
        });
    },

    // 各部门地区分布人数
    departmentandregion() {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order-opt/distribution-of-personnel-by-department-and-region',
            method: 'get',
        });
    },

    // 技能等级人员分布
    skillLevels() {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order-opt/skill-personnel-division',
            method: 'get',
        });
    },

    // 待分配人数
    waitingPersonnel() {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order-opt/waiting-personnel',
            method: 'get',
        });
    },

    // 人员PO/FREE
    personnelAttendance() {
        return http.request({
            url: '/api/blade-bip/dc-mmr-manpower-statistics/list',
            method: 'get',
        });
    },

    // 统计
    statistics() {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order-opt/statistics',
            method: 'get',
        });
    },

    // 未来2周收货
    warehouseReceivePrepare() {
        return http.request({
            url: '/api/blade-bip/test/mps/command-board/get-warehouse-receive-prepare',
            method: 'get',
        });
    },

    // 现场计划单-看板列表
    planOrderList(params) {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order-opt/mmr-plan-order-list',
            method: 'get',
            params,
        });
    },

    // 中心地图
    mapData(params) {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order-opt/select-stationed-locations-based-on-the-region',
            method: 'get',
            params,
        });
    },
};
