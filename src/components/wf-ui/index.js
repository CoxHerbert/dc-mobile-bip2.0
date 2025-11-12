import { validateNull, validData, deepClone, findObject } from './util/index.js';

const prototypes = {
  validateNull,
  validData,
  deepClone,
  findObject,
  wfImage: 'https://oss.nutflow.vip/rider',
};

export default {
  install(appLike) {
    const target = appLike.config?.globalProperties || appLike.prototype || {};
    Object.keys(prototypes).forEach((key) => {
      target[key] = prototypes[key];
      if (typeof uni !== 'undefined' && uni.$u) {
        uni.$u[key] = prototypes[key];
      }
    });
  },
  author: 'SSC',
  version: '1.4.0',
};
