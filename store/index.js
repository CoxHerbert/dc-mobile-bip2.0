import Vue from 'vue';
import Vuex from 'vuex';
import loginInfo from './modules/login.js';
import dict from './modules/dict.js';
import getters from './getters.js';
Vue.use(Vuex);
const store = new Vuex.Store({
    modules: {
        loginInfo,
        dict,
    },
    getters,
});
export default store;
