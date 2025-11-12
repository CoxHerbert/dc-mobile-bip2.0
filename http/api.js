import { clientId, clientSecret } from '@/common/setting';
import { options } from '@/http/config.js';
import { Base64 } from '@/utils/base64.js';
import Request from '@/utils/luch-request/index.js';
import { isEnvironment } from '@/utils/utils.js';
import store from '@/store/';
const http = new Request(options);

http.interceptors.request.use(
    (config) => {
        config.baseURL = '/api';
        config.url = config.url.replace('/api', '');
        //console.log('请求拦截器', config);
        // 可使用async await 做异步操作
        // 假设有token值需要在头部需要携带

        let accessToken = uni.getStorageSync('accessToken');
        //let accessToken ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJibGFkZXguY24iLCJhdWQiOlsiYmxhZGV4Il0sInRva2VuX3R5cGUiOiJhY2Nlc3NfdG9rZW4iLCJjbGllbnRfaWQiOiJyaWRlciIsInRlbmFudF9pZCI6IjAwMDAwMCIsInVzZXJfaWQiOiJudWxsIiwib2F1dGhfaWQiOiIxODgwNDEwMjk5NDEyNTUzNzMwIiwiYWNjb3VudCI6IuS6uuWcqOaXhemAlCIsInVzZXJfbmFtZSI6IuS6uuWcqOaXhemAlCIsInJvbGVfbmFtZSI6Imd1ZXN0IiwiZXhwIjoxNzM3MTYzMzI2LCJuYmYiOjE3MzcxNTk3MjZ9.E-Fm-6fMNU9WYY-lfv9SWGLRdSeKJ-s7yUcU1RXppGc';
        if (!accessToken && isEnvironment() == null) {
            uni.reLaunch({
                url: `/pages/login/login-account`,
            });
        }

        if (accessToken) {
            config.header['Blade-Auth'] = 'bearer ' + accessToken;
        }
        if (process.env.NODE_ENV === 'development') {
            //    config.header['X-Dev-ID'] = 'EW-5530';
            config.header['X-Dev-ID'] = 'EW-5530';
            // config.header['X-Dev-ID'] = 'EW-6176';
            console.info('联调人员工号-------------------------', config.header['X-Dev-ID']);
        }
        config.header['Tenant-Id'] = '000000';
        // 安全请求header
        config.header['Blade-Requested-With'] = 'BladeHttpRequest';
        // 客户端认证参数
        config.header['Authorization'] = 'Basic ' + Base64.encode(clientId + ':' + clientSecret);

        // #ifndef H5
        if (process.env.NODE_ENV == 'development' && !url.startsWith('http')) {
            url = url.substring(url.indexOf('/api') + 4);
            config.url = url;
        }
        // #endif

        return config;
    },
    (config) => {
        // 可使用async await 做异步操作
        return Promise.reject(config);
    }
);

let isRefreshing = false;
let failedQueue = [];
const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};
http.interceptors.response.use(
    (response) => {
        // 若有数据返回则通过 李海洋修改过
        if (
            response.data.access_token ||
            response.data.key || 
            response.config.url == '/blade-pda/common/material-search'
        ) {
            return response.data;
        }
        let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
        if (routes[routes.length - 1]) {
            let curRoute = routes[routes.length - 1].route; //获取当前页面路由
            if (
                curRoute.indexOf('pages/plugin/workflow') > -1 &&
                !isEnvironment() &&
                (response.data.error_code == 2004 || response.data.error_code == 401)
            ) {
                uni.reLaunch({
                    url: `/pages/login/login-account?redirect=/${curRoute}`,
                });
            } else if (response.data.error_description == '认证信息错误或无效') {
                uni.removeStorageSync('loginInfo');
                uni.removeStorageSync('accessToken');
                // window.location.reload();
            }
        }

        // 服务端返回的状态码不等于200，则reject()
        if (
            (response.data.success == false || response.data.code != 200) &&
            response.data.error_description != '用户不存在'
        ) {
            if (response.data.error_description != '认证信息错误或无效') {
                uni.showToast({
                    title: response.data.error_description || response.data.msg,
                    icon: 'none',
                });
            }

            return Promise.reject(response);
        }
        return response.data;
    },
    async (error) => {
		
   
        const originalRequest = error.config;
        if (error.statusCode === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                    .then((token) => {
                        originalRequest.header['Blade-Auth'] = 'Bearer ' + token;
                        return http.request(originalRequest);
                    })
                    .catch((err) => {
                        return Promise.reject(err);
                    });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                let userInfo = uni.getStorageSync('loginInfo');
                const newToken = await store.dispatch('refreshTokenFn', userInfo);
                processQueue(null, newToken);
                originalRequest.header['Blade-Auth'] = 'Bearer ' + newToken;
                return http.request(originalRequest);
            } catch (err) {
                processQueue(err, null);
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        } else {
            error.data?.msg ||
                (error.data?.error_description &&
                    uni.showToast({
                        title: error.data.msg || error.data.error_description,
                        icon: 'none',
                    }));
					
        }

        return Promise.reject(error);
    }
);

export default http;
