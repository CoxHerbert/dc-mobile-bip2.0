import { createStore } from 'vuex';
import loginInfo from './modules/login.js';
import dict from './modules/dict.js';
import getters from './getters.js';

const store = createStore({
    modules: {
        loginInfo,
        dict,
    },
    getters,
});

export default store;
