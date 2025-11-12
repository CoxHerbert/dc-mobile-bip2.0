import http from '@/http/api.js';

export default {
    // 分页查询列表
    list(params) {
        return http.request({
            url: `/api/blade-bip/ErpProcessOutsourc/list`,
            method: 'get',
            params,
        });
    },
    // 工序外发详情
    proDetail(params) {
        return http.request({
            url: `/api/blade-bip/ErpProcessOutsourc/pro-detail`,
            method: 'get',
            params,
        });
    },
    // 新增或修改
    submit(data) {
        return http.request({
            url: `/api/blade-bip/ErpProcessOutsourc/submit`,
            method: 'post',
            data,
        });
    },
    // 工序外发保存
    proSubmit(data) {
        return http.request({
            url: `/api/blade-bip/ErpProcessOutsourc/pro-submit`,
            method: 'post',
            data,
        });
    },
    // 工序外发到erp
    proOutsourcing(params) {
        return http.request({
            url: `/api/blade-bip/ErpProcessOutsourc/pro-outsourcing`,
            method: 'post',
            params,
        });
    },
    // 删除
    remove(params) {
        return http.request({
            url: `/api/blade-bip/ErpProcessOutsourc/remove`,
            method: 'delete',
            params,
        });
    },
};
