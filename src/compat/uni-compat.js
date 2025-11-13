import { Toast } from 'vant';

function resolveRouteLocation(url) {
  if (!url) {
    return null;
  }
  const [path, queryString = ''] = url.split('?');
  const query = {};
  if (queryString) {
    queryString.split('&').forEach((part) => {
      if (!part) return;
      const [key, value = ''] = part.split('=');
      if (!key) return;
      query[decodeURIComponent(key)] = decodeURIComponent(value.replace(/\+/g, ' '));
    });
  }
  return { path, query };
}

function wrapNavigate(router, method) {
  return (options = {}) => {
    const target = typeof options === 'string' ? { url: options } : options || {};
    const location = resolveRouteLocation(target.url || target.path || target.fullPath);
    if (!location) {
      console.warn(`[uni-compat] ${method} called without url`);
      return;
    }
    const { replace = method !== 'navigateTo', force = false } = target;
    if (router && router[replace ? 'replace' : 'push']) {
      const navigation = router[replace ? 'replace' : 'push'];
      navigation.call(router, { path: location.path, query: location.query }).catch((error) => {
        if (force && error && error.name === 'NavigationDuplicated') {
          router.replace({ path: location.path, query: location.query });
        }
      });
    } else {
      const rawUrl = target.url || location.path;
      const hasQuery = target.url ? target.url.includes('?') : Object.keys(location.query).length > 0;
      const queryPart = target.url && target.url.includes('?') ? target.url.split('?')[1] : '';
      if (method === 'reLaunch') {
        window.location.replace(rawUrl + (hasQuery && !rawUrl.includes('?') && queryPart ? `?${queryPart}` : ''));
      } else if (method === 'redirectTo') {
        window.location.assign(rawUrl);
      } else {
        window.location.href = rawUrl;
      }
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

export function initUniCompat(adapter, router) {
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

  uni.navigateTo = wrapNavigate(router, 'navigateTo');
  uni.redirectTo = wrapNavigate(router, 'redirectTo');
  uni.reLaunch = wrapNavigate(router, 'reLaunch');
  uni.navigateBack = ({ delta = 1 } = {}) => {
    if (router) {
      router.go(-Math.abs(delta || 1));
    } else {
      window.history.go(-Math.abs(delta || 1));
    }
  };

  uni.getStorageSync = storageProxy((key) => window.localStorage.getItem(key));
  uni.setStorageSync = storageProxy((key, value) => window.localStorage.setItem(key, value));
  uni.removeStorageSync = storageProxy((key) => window.localStorage.removeItem(key));
  uni.clearStorageSync = storageProxy(() => window.localStorage.clear());

  uni.request = createRequest();

  globalThis.uni = uni;
}
