import http from '@/http/api.js';

export default {
    // 列表
    list(params) {
        return http.request({
            url: '/api/blade-bip/WireExecute/list',
            method: 'get',
            params,
        });
    },
    // 明细查询
    detail(params) {
        return http.request({
            url: '/api/blade-bip/WireExecute/execute-detail',
            method: 'get',
            params,
        });
    },
    // 删除
    remove() {
        return http.request({
            url: '/api/blade-bip/WireExecute/remove',
            method: 'get',
            params,
        });
    },
    // 打印列表
    printList(params) {
        return http.request({
            url: '/api/blade-bip/WireExecute/print-list',
            method: 'get',
            params,
        });
    },
    // 打印
    printDraw(params) {
        return http.request({
            url: '/api/blade-bip/WireExecute/print-draw',
            method: 'get',
            params,
        });
    },
    // 打印
    printOne(params) {
        return http.request({
            url: '/api/blade-bip/WireExecute/print-one',
            method: 'get',
            params,
        });
    },
    // 打印日志
    printLog(params) {
        return http.request({
            url: '/api/blade-bip/WireExecute/print-log',
            method: 'get',
            params,
        });
    },
};
