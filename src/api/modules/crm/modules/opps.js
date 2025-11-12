import http from '@/http/api.js';

export default {
    // 商机保存接口
    postOppsSubmit(data) {
        return http.request({
            url: '/api/blade-bip/opps/submit',
            method: 'post',
            data,
        });
    },

    // 商机主数据列表
    getOppsList(params) {
        return http.request({
            url: '/api/blade-bip/opps/list',
            method: 'get',
            params,
        });
    },

    // 商机查询列表
    getOppsDetail(params) {
        return http.request({
            url: '/api/blade-bip/opps/detail',
            method: 'get',
            params,
        });
    },

    // 商机删除接口
    DeleteOppsRemove(params) {
        return http.request({
            url: '/api/blade-bip/opps/remove',
            method: 'DELETE',
            params,
        });
    },

    // 商机上传附件
    getOppDsetail(params) {
        return http.request({
            url: '/api/blade-bip/opps/detail',
            method: 'get',
            params,
        });
    },

    // 商机详情
    getOppsUploadAttachments(data) {
        return http.request({
            url: '/api/blade-bip/opps/upload-attachments',
            method: 'post',
            data,
        });
    },
};
