import http from '@/http/api.js';

export default {
    // 获取最新版本号
    getAppLatestVersion() {
        return http.request({
            url: '/api/blade-bip/test/pda/version/the-latest-version',
            method: 'get',
        });
    },
    // 分解计划弹出框数据接口
    getPdaVersionList(params) {
        return http.request({
            url: '/api/blade-bip/test/pda/version/list',
            method: 'get',
            params,
        });
    },
    // 删除pda app版本表信息
    deletePdaVersion(ids) {
        return http.request({
            url: `/api/blade-bip/test/pda/version/remove?ids=${ids}`,
            method: 'DELETE',
        });
    },
    // 提交或保存
    postPdaVersion(data) {
        return http.request({
            url: '/api/blade-bip/test/pda/version/submit',
            method: 'POST',
            data,
        });
    },
};
