import { Toast } from 'vant';

function wrapNavigate(method) {
  return (options = {}) => {
    const url = typeof options === 'string' ? options : options.url;
    if (!url) {
      console.warn(`[uni-compat] ${method} called without url`);
      return;
    }
    if (method === 'reLaunch') {
      window.location.replace(url);
    } else if (method === 'redirectTo') {
      window.location.assign(url);
    } else {
      window.location.href = url;
    }
  };
}

function storageProxy(fn) {
  return (...args) => {
    try {
      return fn(...args);
    } catch (error) {
      console.warn('[uni-compat] storage error', error);
      return undefined;
    }
  };
}

function createRequest() {
  return (options = {}) => {
    const { url, method = 'GET', data, header = {}, timeout } = options;
    if (!url) {
      return Promise.reject(new Error('uni.request: url is required'));
    }
    const controller = new AbortController();
    if (typeof timeout === 'number' && timeout > 0) {
      setTimeout(() => controller.abort(), timeout);
    }
    const upperMethod = method.toUpperCase();
    const fetchOptions = {
      method: upperMethod,
      headers: { ...header },
      body: ['GET', 'HEAD'].includes(upperMethod) ? undefined : JSON.stringify(data),
      signal: controller.signal,
    };
    if (fetchOptions.body && !fetchOptions.headers['Content-Type']) {
      fetchOptions.headers['Content-Type'] = 'application/json';
    }

    const task = fetch(url, fetchOptions)
      .then(async (response) => {
        const contentType = response.headers.get('content-type') || '';
        let result;
        if (contentType.includes('application/json')) {
          result = await response.json();
        } else {
          result = await response.text();
        }
        const payload = { data: result, statusCode: response.status, header: Object.fromEntries(response.headers.entries()) };
        options.success && options.success(payload);
        return payload;
      })
      .catch((error) => {
        options.fail && options.fail(error);
        throw error;
      })
      .finally(() => {
        options.complete && options.complete();
      });

    task.abort = () => controller.abort();
    return task;
  };
}

export function initUniCompat(adapter) {
  if (typeof window === 'undefined') {
    return;
  }
  const uni = globalThis.uni || {};
  if (!uni.$u) {
    uni.$u = adapter.globalProperties.$u;
  }

  uni.showToast = (options = {}) => {
    if (typeof options === 'string') {
      Toast(options);
      return;
    }
    Toast({
      message: options.title || '',
      type: options.icon === 'none' ? 'text' : options.icon,
      duration: options.duration || 1500,
    });
  };

  uni.navigateTo = wrapNavigate('navigateTo');
  uni.redirectTo = wrapNavigate('redirectTo');
  uni.reLaunch = wrapNavigate('reLaunch');
  uni.navigateBack = () => window.history.back();

  uni.getStorageSync = storageProxy((key) => window.localStorage.getItem(key));
  uni.setStorageSync = storageProxy((key, value) => window.localStorage.setItem(key, value));
  uni.removeStorageSync = storageProxy((key) => window.localStorage.removeItem(key));
  uni.clearStorageSync = storageProxy(() => window.localStorage.clear());

  uni.request = createRequest();

  globalThis.uni = uni;
}
