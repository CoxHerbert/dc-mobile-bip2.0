const state = {
    dict: new Array(),
    globalData: {},
};

const mutations = {
    UpdateGlobalData(state, data) {
        state.globalData = data;
    },
    SET_DICT: (state, { key, value }) => {
        if (key !== null && key !== '') {
            state.dict.push({
                key: key,
                value: value,
            });
        }
    },
    REMOVE_DICT: (state, key) => {
        try {
            for (let i = 0; i < state.dict.length; i++) {
                if (state.dict[i].key == key) {
                    state.dict.splice(i, 1);
                    return true;
                }
            }
        } catch (e) {}
    },
    CLEAN_DICT: (state) => {
        state.dict = new Array();
    },
};

const actions = {
    // 设置字典
    setDict({ commit }, data) {
        commit('SET_DICT', data);
    },
    // 删除字典
    removeDict({ commit }, key) {
        commit('REMOVE_DICT', key);
    },
    // 清空字典
    cleanDict({ commit }) {
        commit('CLEAN_DICT');
    },
    // 获取字典
    GetDict({ state }, _key) {
        console.log(_key);
        if (_key == null && _key == '') {
            return null;
        }
        try {
            for (let i = 0; i < state.dict.length; i++) {
                if (state.dict[i].key == _key) {
                    return state.dict[i].value;
                }
            }
        } catch (e) {
            return null;
        }
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions,
};
