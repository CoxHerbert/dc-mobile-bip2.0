const getters = {
    loginInfo: (state) => state.loginInfo.loginInfo,
    userInfo: (state) => state.loginInfo.userInfo,
    accessToken: (state) => state.loginInfo.accessToken,
    globalData: (state) => state.dict.globalData,
    dict: (state) => state.dict.dict,
};
export default getters;
