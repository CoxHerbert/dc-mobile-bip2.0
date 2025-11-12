const requireComponent = require.context('./', true, /\.vue$/);

const install = (Vue) => {
    if (install.installed) return;
    install.installed = true;

    requireComponent.keys().forEach((fileName) => {
        const config = requireComponent(fileName);
        const component = config.default || config;
        const componentName = component.name;
        if (componentName) {
            Vue.component('wf-' + componentName, component);
        } else {
            console.warn(`Component in ${fileName} has no name`);
        }
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    install,
};
