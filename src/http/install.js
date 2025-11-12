const apiModules = import.meta.glob('@/api/**/*.js', { eager: true });

const install = (appLike, vm = {}) => {
    const target = vm.$u ? vm : appLike.config?.globalProperties || appLike.prototype || {};
    if (!target.$u) {
        target.$u = {};
    }
    if (!target.$u.api) {
        target.$u.api = {};
    }
    Object.values(apiModules).forEach((module) => {
        const api = module.default || module;
        Object.keys(api || {}).forEach((key) => {
            target.$u.api[key] = api[key];
        });
    });
};

export default {
    install,
};
