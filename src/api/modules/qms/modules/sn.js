import http from '@/http/api.js';

// 收料通知查询

export default {
    getSrmReceiveByQrCode(params) {
        return http.request({
            url: '/api/blade-bip/SnReceive/getSrmReceiveByQrCode',
            method: 'get',
            params,
        });
    },

    // 批量生成sn
    batchGenerate(data) {
        return http.request({
            url: '/api/blade-bip/SnRecord/batchGenerate',
            method: 'post',
            data,
        });
    },

    // mo批量生成sn
    moBatchGenerate(params) {
        return http.request({
            url: '/api/blade-bip/SnRecord/moBatchGenerate',
            method: 'post',
            params,
        });
    },
    // mo生成sn查询
    getSnRecordMoList(params) {
        return http.request({
            url: '/api/blade-bip/SnRecord/moList',
            method: 'post',
            params,
        });
    },

    // 仪器配置列表
    getMachineConfigList(params) {
        return http.request({
            url: '/api/blade-bip/MachineConfig/list',
            method: 'get',
            params,
        });
    },

    // 仪器配置添加和修改
    machineConfigSubmit(data) {
        return http.request({
            url: '/api/blade-bip/MachineConfig/submit',
            method: 'post',
            data,
        });
    },

    // 仪器配置删除
    machineConfigRemove(ids) {
        return http.request({
            url: '/api/blade-bip/MachineConfig/remove',
            method: 'delete',
            params: {
                ids,
            },
        });
    },

    // 查询sn列表
    getSnRecordList(params) {
        return http.request({
            url: '/api/blade-bip/SnRecord/list',
            method: 'get',
            params,
        });
    },

    // 获取质检报告
    getInspectionReport(params) {
        return http.request({
            url: '/api/blade-bip/SnQuality/getQuality',
            method: 'get',
            params,
        });
    },

    // 获取报告列表
    getSnQualityList(params) {
        return http.request({
            url: '/api/blade-bip/SnQuality/list',
            method: 'get',
            params,
        });
    },

    // 绑定报告
    // snRecordSubmit(data) {
    //     return http.request({
    //         url: '/api/blade-bip/SnRecord/reportBindings',
    //         method: 'post',
    //         data,
    //     });
    // },

    // 获取测量报告
    getMeasurementReport(params) {
        return http.request({
            url: '/api/blade-bip/SnQuality/getMeasurementReport',
            method: 'get',
            params,
        });
    },

    // 列表
    getSnCheckMaterialList(params) {
        return http.request({
            url: '/api/blade-bip/SnCheckMaterial/list',
            method: 'get',
            params,
        });
    },

    // sip创建列表
    sipOrderList(params) {
        return http.request({
            url: '/api/blade-bip/SipOrder/list',
            method: 'get',
            params,
        });
    },

    // sip明细查询
    sipDetail(params) {
        return http.request({
            url: '/api/blade-bip/SipOrder/detail',
            method: 'get',
            params,
        });
    },

    // sip删除
    sipOrderRemove(ids) {
        return http.request({
            url: '/api/blade-bip/SipOrder/remove',
            method: 'delete',
            params: {
                ids,
            },
        });
    },

    // 配置项删除
    sipEntryRemove(ids) {
        return http.request({
            url: '/api/blade-bip/SipEntry/remove',
            method: 'delete',
            params: {
                ids,
            },
        });
    },

    // sip创建添加和编辑
    sipOrderSubmit(data) {
        return http.request({
            url: '/api/blade-bip/SipOrder/submit',
            method: 'post',
            data,
        });
    },

    // 头部详情
    sipOrderDetail(params) {
        return http.request({
            url: '/api/blade-bip/SipOrder/order-detail',
            method: 'get',
            params,
        });
    },

    // 检查项保存和修改
    entrySubmit(data) {
        return http.request({
            url: '/api/blade-bip/SipEntry/entrySubmit',
            method: 'post',
            data,
        });
    },
    // 检查项
    sipChecklist(params) {
        return http.request({
            url: '/api/blade-bip/SipChecklist/list',
            method: 'get',
            params,
        });
    },
    // 升版
    sipOrderUpgrade(params) {
        return http.request({
            url: '/api/blade-bip/SipEntry/upgrade',
            method: 'get',
            params,
        });
    },

    // 获取物料
    getMaterialList(params) {
        return http.request({
            url: '/api/blade-pda/common/material-search',
            method: 'get',
            params,
        });
    },

    // 批量操作
    batchFinish(params, data) {
        return http.request({
            url: '/api/blade-bip/SnCheckMaterial/batch-finish',
            method: 'post',
            params,
            data,
        });
    },
    listByMtoNo(params) {
        return http.request({
            url: '/api/blade-bip/SipOrder/mto-material-query',
            method: 'get',
            params,
        });
    },
	
	SnRecordCode(code) {
	    return http.request({
	        url: `/api/blade-bip/SnRecord/${code}`,
	        method: 'get',
	        
	    });
	},
	// /blade-bip/SnRecord/submit
	SnRecordsubmit(data) {
	    return http.request({
	        url: '/api/blade-bip/SnRecord/binding-submmit',
	        method: 'post',
	        data
	    });
	},
};
