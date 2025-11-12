import http from '@/http/api.js';

export default {
    // 分解计划列表
    getMoItemLazyList(params) {
        return http.request({
            url: '/api/blade-bip/mps/mo-item/lazy-list',
            method: 'get',
            params,
        });
    },
    // 分解计划子项合集
    getMoItemSubsetList(params) {
        return http.request({
            url: '/api/blade-bip/mps/mo-item/subset-list',
            method: 'get',
            params,
        });
    },

    // 分解计划弹出框提交接口
    postMpsMoItemMroGenerate(data, params) {
        return http.request({
            url: '/api/blade-bip/mps/mo-item/mro-generate',
            method: 'post',
            data,
            params,
        });
    },

    // 删除分解计划
    remove(params) {
        return http.request({
            url: '/api/blade-bip/test/delete-item',
            method: 'get',
            params,
        });
    },

    // 创建临时分解计划接口
    postMpsMoItemSubmit(data) {
        return http.request({
            url: '/api/blade-bip/mps/mo-item/submit',
            method: 'post',
            data,
        });
    },

    // 取消排程
    DeleteMpsWorkScheduleRemove(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/remove',
            method: 'DELETE',
            params,
        });
    },

    // 新增分解计划获取工作小组
    postMpsMoItemAddDecompositionPlan(params) {
        return http.request({
            url: '/api/blade-bip/mps/mo-item/add-decomposition-plan',
            method: 'get',
            params,
        });
    },

    // 暂停
    getMpsMoItemItemPause(params) {
        return http.request({
            url: '/api/blade-bip/mps/mo-item/item-pause',
            method: 'get',
            params,
        });
    },

    // 重排
    getMpsWorkScheduleReschedule(params) {
        return http.request({
            url: '/api/blade-bip/mps/work-schedule/reschedule',
            method: 'get',
            params,
        });
    },
    // 物料请单
    getMpsMoItemMrPpBom(params) {
        return http.request({
            url: '/api/blade-bip/mps/mo-item/mr-pp-bom',
            method: 'get',
            params,
        });
    },
};
