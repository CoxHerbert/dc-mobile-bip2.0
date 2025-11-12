<script>
import { getUrlCode, isEnvironment, isEnvironmentOld } from '@/utils/utils.js';
import store from '@/store/';

export default {
    data() {
        return {
            refreshLock: false,
        };
    },
    created() {
        if (sessionStorage.getItem('store')) {
            this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(sessionStorage.getItem('store'))));
        }
        // 在页面刷新时将Vuex里的信息保存到sessionStorage里
        window.addEventListener('beforeunload', () => {
            sessionStorage.setItem('store', JSON.stringify(this.$store.state));
        });
    },
    onLaunch: function () {
        //this.refreshToken();
        console.log('App Launch');

        this.watchRorter();
        // this.getJsapiTicket()
    },

    methods: {
        //老的鉴权需要
        routerWAtcher() {
            const token = uni.getStorageSync('accessToken');
            let { href } = window.location;

            // 如果是web端未登录跳转登录页
            if (!token && isEnvironmentOld() == null) {
                console.log(3333);
                uni.reLaunch({
                    url: `/pages/login/login-account`,
                });
                return false;
            }

            if (token) {
                store.dispatch('getUserInfo');
            }

            // 不需要鉴权页面直接进入
            const noAuth = ['pages/login/social', 'pages/notice/list'];
            const isNoAuth = noAuth.some((val) => href.includes(val));
            if (isNoAuth) {
                return false;
            }

            /**
             * 未登录时在微信或企业微信进行授权登录
             * 微信环境 需要鉴权环境
             * wechat_open 微信  wechat_enterprise 企业微信  account账号密码
             */
            const searchValues = [
                'pages/home/auditResult',
                'pages/home/selflogin',
                'pages/home/registSuccess',
                'pages/home/home',
                'pages/user/profile',
                'pages/plugin/workflow/pages/form/start',
            ];
            const isAuth = searchValues.some((val) => href.includes(val));

            // 微信环境  不允许访问的页面跳转404 其他页面授权登录
            if (isEnvironmentOld() == 'wechat_open') {
                console.log('jinlai1' + href.includes('pages/login/login-account'));
                // 不允许访问的页面跳转404
                if (!isAuth || href.includes('pages/login/login-account')) {
                    uni.reLaunch({
                        url: `/pages/home/404`,
                    });
                }
                // 未登录进行授权登录
                if (!token) {
                    this.authorizeFn();
                }
            }
            // 企业微信  未登录直接授权
            if (isEnvironmentOld() == 'wechat_enterprise') {
                if (href.includes('pages/login/login-account')) {
                    return false;
                }
                if (!token) {
                    this.authorizeFn();
                }
            }

            let loginInfo = uni.getStorageSync('loginInfo');
            if (token && loginInfo.real_name) {
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                if (params.get('FRUrl')) {
                    window.location.href = `${params.get('FRUrl')}&username=${loginInfo.real_name}`;
                }
            }
        },
        // 新的鉴权也需要
        newRouterWAtcher() {
            const token = uni.getStorageSync('accessToken');
            let { href } = window.location;
            // console.log('href', href);
            // console.log('href', token);
            // console.log('href', isEnvironment());
            const out =
                location.pathname.replace(/^\/h5(\/|$)/, '/') === '/pages/login/UserInfoTransition'
                    ? `/pages/login/transfer?urlTicketId=${
                          new URLSearchParams(location.search).get('urlTicketId') || ''
                      }`
                    : null;
            // 如果是web端未登录跳转登录页
            if (!token && isEnvironment() == 'normal') {
                console.log(4444);
                uni.reLaunch({
                    url: `/pages/login/login-account?redirect=${out}`,
                });
                return false;
            }

            if (token) {
                store.dispatch('getUserInfo');
            }

            // 不需要鉴权页面直接进入
            const noAuth = ['pages/login/social', 'pages/notice/list', 'pages/login/UserInfoTransition'];
            const isNoAuth = noAuth.some((val) => href.includes(val));
            if (isNoAuth) {
                return false;
            }

            /**
             * 未登录时在微信或企业微信进行授权登录
             * 微信环境 需要鉴权环境
             * WECHAT_MP 微信  WECHAT_ENTERPRISE 企业微信  account账号密码
             */
            const searchValues = [
                'pages/home/auditResult',
                'pages/home/selflogin',
                'pages/home/registSuccess',
                'pages/home/home',
                'pages/user/profile',
                'pages/plugin/workflow/pages/form/start',
            ];
            const isAuth = searchValues.some((val) => href.includes(val));

            // 微信环境  不允许访问的页面跳转404 其他页面授权登录
            if (isEnvironment() == 'WECHAT_MP') {
                console.log('jinlai1' + href.includes('pages/login/login-account'));
                // 不允许访问的页面跳转404
                if (!isAuth || href.includes('pages/login/login-account')) {
                    uni.reLaunch({
                        url: `/pages/home/404`,
                    });
                }
                // 未登录进行授权登录
                if (!token) {
                    this.authorizeFnNew();
                }
            }
            // 企业微信  未登录直接授权
            if (isEnvironment() == 'WECHAT_ENTERPRISE') {
                if (href.includes('pages/login/login-account')) {
                    return false;
                }
                if (!token) {
                    this.authorizeFnNew();
                }
            }

            let loginInfo = uni.getStorageSync('loginInfo');
            if (token && loginInfo.real_name) {
                const url = new URL(window.location.href);
                const params = new URLSearchParams(url.search);
                if (params.get('FRUrl')) {
                    window.location.href = `${params.get('FRUrl')}&username=${loginInfo.real_name}`;
                }
            }
        },
        // 监听路由
        watchRorter() {
            // const token = uni.getStorageSync('accessToken');
            let { href } = window.location;
            if (href.indexOf('urlTicketId') == -1) {
                console.log(1111);
                this.routerWAtcher();
            } else {
                console.log(2222);
                this.newRouterWAtcher();
            }
        },

        // 授权登录
        authorizeFn() {
            let { origin, href } = window.location;
            let data = {
                callbackUrl:
                    origin.indexOf('h5') >= 0 || origin.indexOf('test') >= 0
                        ? decodeURIComponent(`${origin}/pages/login/social?callbackUrl=${href}`)
                        : decodeURIComponent(`${origin}/h5/pages/login/social?callbackUrl=${href}`),
                code: getUrlCode('code'),
                state: getUrlCode('state'),
            };

            // 使用全局$http
            this.$u.api
                .authorize({
                    redirectUrl: decodeURIComponent(data.callbackUrl),
                    type: isEnvironmentOld(),
                })
                .then((res) => {
                    if (res.code == 200) {
                        window.location.href = res.data;
                    }
                });
        },

        // 授权登录
        authorizeFnNew() {
            let { origin, href } = window.location;
            let data = {
                callbackUrl:
                    origin.indexOf('h5') >= 0 || origin.indexOf('test') >= 0
                        ? decodeURIComponent(`${origin}/pages/login/social-new?callbackUrl=${href}`)
                        : decodeURIComponent(`${origin}/h5/pages/login/social-new?callbackUrl=${href}`),
                code: getUrlCode('code'),
                state: getUrlCode('state'),
            };
            this.$u.api
                .authorize({
                    redirectUrl: decodeURIComponent(data.callbackUrl),
                    type: isEnvironment(),
                })
                .then((res) => {
                    if (res.code == 200) {
                        window.location.href = res.data;
                    }
                });
        },

        // 定时检测token
        refreshToken() {
            let userInfo = uni.getStorageSync('loginInfo');
            userInfo && store.dispatch('refreshTokenFn', userInfo);
        },
    },
};
</script>
<style lang="scss">
/*uview全局样式*/
@import 'uview-ui/index.scss';
/*app全局样式*/
@import 'static/style/app.scss';

// 修改checkbox样式
checkbox.curdCheck .wx-checkbox-input,
checkbox.curdCheck .uni-checkbox-input {
    border-radius: 50% !important;
    border-color: #c8c9cc !important;
    color: #f78431 !important;
}

checkbox.curdCheck .wx-checkbox-input-checked,
checkbox.curdCheck .uni-checkbox-input-checked {
    // background-color: #f78431;
    color: #f78431 !important;
    border-color: #f78431 !important;
}

.uni-picker-container,
.wx-picker-container {
    z-index: 10074;
}

uni-modal {
    z-index: 19999 !important;
}

.uni-modal {
    padding: 24rpx 34rpx 54rpx;
    box-sizing: border-box;

    .uni-modal__title {
        font-weight: bold;
    }

    .uni-modal__bd {
        padding: 1em 0.67em 1.5em;
        font-size: 28rpx;
        margin-bottom: 20rpx;
    }

    .uni-modal__btn {
        flex: none;
        width: 120px;
        height: 64rpx;
        line-height: 64rpx;
        background: #f78431;
        border-radius: 4px 4px 4px 4px;
        font-size: 28rpx;

        &:first-child {
            background: #f5f5f5;
        }
    }

    .uni-modal__ft {
        justify-content: space-around;

        &::after {
            display: none;
        }

        &:first-child {
            background: #f5f5f5;
        }
    }
}
</style>

<style>
page {
    background: #f7f7f7;
    /* max-width: 800rpx; */
}

.container,
.navbar-wapper {
    position: relative;
    min-width: 600rpx;
    max-width: 900rpx;
    margin: 0px auto;
    background: linear-gradient(180deg, #d2dff7 0%, rgba(255, 255, 255, 0) 100%) !important;
}
</style>
