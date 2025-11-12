import { validateNull, validData, deepClone, findObject } from './util/index.js';

const prototypes = {
    validateNull,
    validData,
    deepClone,
    findObject,
    wfImage: 'https://oss.nutflow.vip/rider',
};

export default {
    install(Vue) {
        // 注册全局方法
        Object.keys(prototypes).forEach((key) => {
            Vue.prototype[key] = prototypes[key];
            uni.$u[key] = prototypes[key];
        });
    },
    author: 'SSC',
    version: '1.4.0',
};
