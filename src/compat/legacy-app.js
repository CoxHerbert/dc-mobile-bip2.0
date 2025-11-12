export function createLegacyAdapter(app) {
  const globalProperties = app.config.globalProperties;
  if (!globalProperties.$u) {
    globalProperties.$u = {};
  }
  if (!globalProperties.$u.api) {
    globalProperties.$u.api = {};
  }
  if (!globalProperties.$u.queryParams) {
    globalProperties.$u.queryParams = (data = {}) => {
      const query = Object.keys(data)
        .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
        .join('&');
      return query ? `?${query}` : '';
    };
  }
  if (!globalProperties.$u.test) {
    globalProperties.$u.test = {
      contains: (str = '', value = '') => String(str).includes(value),
    };
  }
  if (!globalProperties.$u.vuex) {
    globalProperties.$u.vuex = (name, value) => {
      const store = globalProperties.$store;
      if (!store) return;
      const nameSplit = name.split('.');
      const last = nameSplit.pop();
      let state = store.state;
      nameSplit.forEach((key) => {
        if (!state[key]) {
          state[key] = {};
        }
        state = state[key];
      });
      state[last] = value;
    };
  }

  const legacyVue = {
    prototype: globalProperties,
    config: { globalProperties },
  };

  const use = (plugin, ...options) => {
    if (!plugin) return;
    if (typeof plugin.install === 'function') {
      plugin.install(legacyVue, ...options);
    } else if (typeof plugin === 'function') {
      plugin(legacyVue, ...options);
    }
  };

  return {
    app,
    globalProperties,
    legacyVue,
    use,
  };
}

export function mountLegacyProperties(adapter, properties) {
  Object.entries(properties).forEach(([key, value]) => {
    adapter.globalProperties[key] = value;
  });
}
