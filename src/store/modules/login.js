import user from '@/api/user';
import { isEnvironment } from '@/utils/utils.js';
const state = {
    userInfo: null,
    accessToken: uni.getStorageSync('accessToken'),
    refreshToken: uni.getStorageSync('refreshToken'),
    loginInfo: null,
    lang: uni.getStorageSync('dcLang') || 'cn', // vn || cn
};

const mutations = {
    SET_TOKEN(state, data) {
        state.accessToken = data;
        uni.setStorageSync('accessToken', data);
    },
    SET_REFRESH_TOKEN: (state, token) => {
        state.refreshToken = token;
        uni.setStorageSync('refreshToken', token);
    },
    SET_LANG(state, data) {
        state.lang = data.lang;
        uni.setStorageSync('dcLang', data.lang);
    },
    LOGIN_USERINFO(state, data) {
        data.nick_name = data.name;
        data.dept_name = data.deptName;
        state.userInfo = data;
        uni.setStorageSync('userInfo', data);
        console.log(state.userInfo);
    },
    LOGIN_INFO(state, data) {
        state.loginInfo = data;
        uni.setStorageSync('loginInfo', data);
    },
    LOGOUT(state) {
        state.userInfo = null;
        state.accessToken = null;
        state.loginInfo = null;
        uni.removeStorageSync('userInfo');
        uni.removeStorageSync('loginInfo');
        uni.removeStorageSync('accessToken');
        let { href } = window.location;
        if (isEnvironment() == 'WECHAT_MP' || isEnvironment() == 'WECHAT_ENTERPRISE') {
            window.location.href = href;
        } else if (href.includes('www.eastwinbip.com')) {
            window.location.href = `https://www.eastwinbip.com/h5/pages/login/login-account`;
        } else {
            uni.redirectTo({
                url: '/pages/login/login-account',
            });
        }
    },
};

const actions = {
    setTokenPair({ commit }, userInfo) {
        const { accessToken, refreshToken } = userInfo;
        if (accessToken) {
            commit('SET_TOKEN', accessToken);
        }
        if (refreshToken) {
            commit('SET_REFRESH_TOKEN', refreshToken);
        }
    },
    setUserInfo({ commit }, userInfo) {
        commit('LOGIN_INFO', userInfo);
    },
    //刷新token
    refreshTokenFn({ state, commit }, userInfo) {
        return new Promise((resolve, reject) => {
            user.refreshToken(userInfo.refresh_token, userInfo.tenant_id)
                .then((res) => {
                    commit('SET_TOKEN', res.access_token);
                    commit('LOGIN_INFO', res);
                    resolve(res.access_token);
                })
                .catch((error) => {
                    localStorage.removeItem('accessToken');
                    reject(error);
                });
        });
    },
    getUserInfo({ commit, state }) {
        return new Promise((resolve, reject) => {
            user.userInfo()
                .then((res) => {
                    const data = res.data;
                    commit('LOGIN_USERINFO', data);
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
};

export default {
    state,
    mutations,
    actions,
};
