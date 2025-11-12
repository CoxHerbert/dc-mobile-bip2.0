import http from '@/http/api.js';

// 获取token
const token = (tenantId, username, password, type) => {
    return http.request({
        url: '/api/blade-auth/oauth/token',
        method: 'POST',
        header: {
            'Tenant-Id': tenantId,
        },
        params: {
            tenantId,
            username,
            password,
            grant_type: 'password',
            scope: 'all',
            type,
        },
    });
};

const refreshToken = (refresh_token, tenantId) => {
    return http.request({
        url: '/api/blade-auth/oauth/token',
        method: 'post',
        headers: {
            'Tenant-Id': tenantId,
        },
        params: {
            tenantId,
            refresh_token,
            grant_type: 'refresh_token',
            scope: 'all',
        },
    });
};

// 微信登录
const loginBySocial = (data) => {
    return http.request({
        url: '/api/blade-auth/oauth/token',
        method: 'post',
        headers: {
            'Tenant-Id': '000000',
        },
        params: {
            tenantId: '000000',
            ...data,
            grant_type: 'social',
            scope: 'all',
        },
    });
};
// 获取用户信息
const userInfo = () => {
    return http.request({
        url: '/api/blade-system/user/info',
        method: 'GET',
    });
};

// 获取用户信息
export const getUser = (id) => {
    return http.request({
        url: '/api/blade-system/user/detail',
        method: 'GET',
        params: {
            id,
        },
    });
};

// 微信授权
export const authorize = (params) => {
    return http.request({
        url: '/api/blade-bip/wechat/public-account/authorize',
        method: 'GET',
        params,
    });
};

// 上传图片
export const upload = (formData) => {
    return http.request({
        url: '/api/blade-resource/oss/endpoint/put-file-attach',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        formData,
    });
};

// 登记注册
export const laborRegister = (data) => {
    return http.request({
        url: '/api/blade-bip/laborRegister/submit',
        method: 'post',
        data,
    });
};

// 暂存用户
export const userCreate = (data) => {
    return http.request({
        url: '/api/blade-bip/laborRegister/user-create',
        method: 'post',
        data,
    });
};

// 修改登记注册
export const updatelaborRegister = (data) => {
    return http.request({
        url: '/api/blade-bip/laborRegister/update',
        method: 'post',
        data,
    });
};

// 字典
export const dictionary = (params) => {
    return http.request({
        url: '/api/blade-system/dict-biz/dictionary',
        method: 'GET',
        params,
    });
};

// 获取登记信息
export const laborRegisterDetail = (params) => {
    return http.request({
        url: '/api/blade-bip/laborRegister/detail',
        method: 'GET',
        params,
    });
};

// 异常明细记录
export const noticeDetail = (params) => {
    return http.request({
        url: '/api/blade-bip/exp-notice/job/notice-detail',
        method: 'GET',
        params,
    });
};

// 查询外协公司
export const laborCompanyList = (params) => {
    return http.request({
        url: '/api/blade-bip/LaborCompany/list',
        method: 'GET',
        params,
    });
};

// 查询租户列表
export const tenantList = (params) => {
    return http.request({
        url: '/api/blade-bip/org/list-cache',
        method: 'GET',
        params,
    });
};

// 查询人员选择
export const laborRegisterList = (params) => {
    return http.request({
        url: '/api/blade-bip/laborRegister/list',
        method: 'GET',
        params,
    });
};

// 查询在职人员
export const laborRegisterListSelect = (params) => {
    return http.request({
        url: '/api/blade-bip/laborRegister/list-select',
        method: 'GET',
        params,
    });
};

export default {
    token,
    userInfo,
    refreshToken,
    loginBySocial,
    authorize,
    upload,
    dictionary,
    laborRegister,
    laborRegisterDetail,
    updatelaborRegister,
    noticeDetail,
    userCreate,
    laborCompanyList,
    tenantList,
    laborRegisterList,
    laborRegisterListSelect,
};
