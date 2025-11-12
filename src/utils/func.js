const install = (appLike, vm = {}) => {
    const target = appLike.config?.globalProperties || appLike.prototype || {};
    const context = vm.$u ? vm : target;

    if (!target.$u) {
        target.$u = {};
    }
    if (!context.$u) {
        context.$u = target.$u;
    }

    const login = (userInfo, redirect) => {
        console.log(userInfo, redirect);
    };

    const logout = () => {
        if (context.$u && typeof context.$u.vuex === 'function') {
            context.$u.vuex('userInfo', {
                avatar: '',
                nick_name: '游客',
                tenant_id: '暂无',
            });
            context.$u.vuex('accessToken', '');
            context.$u.vuex('isLogin', false);
        }
        if (typeof uni !== 'undefined' && uni.redirectTo) {
            uni.redirectTo({
                url: '/pages/login/login-account',
            });
        }
    };

    const checkLogin = (e = {}) => {
        if (!context.isLogin) {
            if (typeof uni !== 'undefined' && uni.navigateTo) {
                uni.navigateTo({
                    url: '/pages/login/login-account',
                });
            }
            return false;
        }
        return true;
    };

    const route = (url) => {
        if (typeof uni === 'undefined') {
            window.location.href = url;
            return;
        }
        let accessToken = uni.getStorageSync('accessToken');
        if (!accessToken) {
            uni.showToast({
                title: '请先登录',
                icon: 'none',
            });
            const pages = (typeof getCurrentPages === 'function' ? getCurrentPages() : []) || [];
            const currentPage = pages[pages.length - 1];
            setTimeout(() => {
                uni.navigateTo({
                    url: `/pages/login/login-account?redirect=/${currentPage?.route || ''}`,
                });
            }, 500);
            return false;
        }
        uni.navigateTo({
            url: url,
        });
    };

    const paramsToObj = (url) => {
        if (url.indexOf('?') !== -1) {
            url = url.split('?')[1];
        }
        const arr = url.split('&');
        const obj = {};
        for (let i of arr) {
            obj[i.split('=')[0]] = i.split('=')[1];
        }
        return obj;
    };

    const refreshPage = () => {
        if (typeof uni === 'undefined') {
            window.location.reload();
            return;
        }
        const pages = getCurrentPages();
        const currentPage = pages[pages.length - 1];
        const path = '/' + currentPage.route + context.$u.queryParams(currentPage.options);
        if (context.$u.test.contains(currentPage.route, 'tabbar')) {
            uni.reLaunch({
                url: path,
                fail: (err) => {
                    console.log(err);
                },
            });
        } else {
            uni.redirectTo({
                url: path,
                fail: (err) => {
                    console.log(err);
                },
            });
        }
    };

    const showToast = (data = {}) => {
        if (typeof uni === 'undefined') {
            console.log('[toast]', data);
            return;
        }
        if (typeof data == 'string') {
            uni.showToast({
                title: data,
                icon: 'none',
            });
        } else {
            uni.showToast({
                title: data.title,
                icon: data.icon || 'none',
                image: data.image || '',
                mask: data.mask || false,
                position: data.position || 'center',
                duration: data.duration || 1500,
                success: () => {
                    setTimeout(() => {
                        if (data.back && typeof uni.navigateBack === 'function') return uni.navigateBack();
                        data.success && data.success();
                    }, data.duration || 1500);
                },
            });
        }
    };

    target.$u.func = {
        login,
        logout,
        route,
        checkLogin,
        paramsToObj,
        refreshPage,
        showToast,
    };
};
export default {
    install,
};
