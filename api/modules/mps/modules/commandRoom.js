// 指挥室数据大屏接口
import http from '@/http/api.js';

export default {
    // 待办
    toDo() {
        return http.request({
            url: '/api/blade-bip/test/mps/command-board/get-warehouse-todo',
            method: 'get',
        });
    },
    // 待审核
    pendingApproval() {
        return http.request({
            url: '/api/blade-bip/test/mps/command-board/get-warehouse-audit',
            method: 'get',
        });
    },

    // 未来2周收货
    futureReceipt() {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order-opt/statistics',
            method: 'get',
        });
    },

    // 基本信息
    basicInfo() {
        return http.request({
            url: '/api/blade-bip/test/mps/command-board/get-assemble-base-info',
            method: 'get',
        });
    },

    // 各组品质不良情况（周）
    adverseSituation() {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order-opt/statistics',
            method: 'get',
        });
    },

    // 各组报工工时（周）
    reportwork() {
        return http.request({
            url: '/api/blade-bip/test/mps/command-board/get-group-report-hour',
            method: 'get',
        });
    },

    // 生产组预测人力/实际人力比（未来两周）
    predictingManpower() {
        return http.request({
            url: '/api/blade-bip/test/mps/command-board/get-assemble-future-human-rate',
            method: 'get',
        });
    },

    // 专案数量（未来两周）
    numberProjects() {
        return http.request({
            url: '/api/blade-bip/mmr-plan-order-opt/statistics',
            method: 'get',
        });
    },

    //  测量室和QMS来料款数
    qinmaterials(mode) {
        return http.request({
            url:
                mode === 'test'
                    ? '/blade-bip/test/mps/command-board/get-measuring-feed-sources'
                    : '/blade-bip/test/mps/command-board/get-quality-feed-sources',
            method: 'get',
        });
    },

    // 测量室和QMS平均耗时
    averageTime(mode) {
        return http.request({
            url:
                mode === 'test'
                    ? '/blade-bip/test/mps/command-board/get-measuring-average-time'
                    : '/blade-bip/test/mps/command-board/get-quality-average-time',
            method: 'get',
        });
    },

    // 未来2周待检验（QMS）
    pendQualityTest() {
        return http.request({
            url: '/api/blade-bip/test/mps/command-board/get-quality-future-check',
            method: 'get',
        });
    },
};
