import http from '@/http/api.js';

export default {
    /**
     * 获取微信JS-SDK配置信息
     * @param {String} url - 当前页面URL
     */
    getWxConfig(url) {
        return http.request({
            url: '/api/blade-auth/social/skip-url/getWxJsapiTicket',
            method: 'get',
            params: { url },
        });
    },

    /**
     * 获取企业微信JS-SDK配置信息
     * @param {String} url - 当前页面URL
     */
    getWwConfig(url) {
        return http.request({
            url: '/api/blade-auth/social/skip-url/getQyWxJsapiTicket',
            method: 'get',
            params: { url },
        });
    },

    /**
     * 获取微信用户信息
     * @param {String} code - 微信授权code
     */
    getWxUserInfo(code) {
        return http.request({
            url: '/api/wx/user-info',
            method: 'get',
            params: { code },
        });
    },

    /**
     * 获取企业微信用户信息
     * @param {String} code - 企业微信授权code
     */
    getWwUserInfo(code) {
        return http.request({
            url: '/api/ww/user-info',
            method: 'get',
            params: { code },
        });
    },

    /**
     * 获取微信AccessToken
     */
    getWxAccessToken() {
        return http.request({
            url: '/api/wx/access-token',
            method: 'get',
        });
    },

    /**
     * 获取企业微信AccessToken
     */
    getWwAccessToken() {
        return http.request({
            url: '/api/ww/access-token',
            method: 'get',
        });
    },

    /**
     * 获取微信jsapiTicket
     */
    getWxJsApiTicket() {
        return http.request({
            url: '/api/wx/jsapi-ticket',
            method: 'get',
        });
    },

    /**
     * 获取企业微信jsapiTicket
     */
    getWwJsApiTicket() {
        return http.request({
            url: '/api/ww/jsapi-ticket',
            method: 'get',
        });
    },
};
