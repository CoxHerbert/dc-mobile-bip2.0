import { dictionary } from '@/api/user';

/**
 * 获取url参数
 * @param name 参数名
 */
export const getQueryString = (name) => {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(decodeURI(r[2]));
    return null;
};

// 判断是否是微信浏览器
export const isWechat = () => {
    return String(navigator.userAgent.toLowerCase().match(/MicroMessenger/i)) === 'micromessenger';
};

// 判断是什么环境
export const isEnvironment = () => {
    let type = 'normal';
    if (/wxwork/i.test(navigator.userAgent)) {
        type = 'WECHAT_ENTERPRISE';
    } else if (/micromessenger/i.test(navigator.userAgent)) {
        type = 'WECHAT_MP';
    }
    return type;
};

// 判断是什么环境
export const isEnvironmentOld = () => {
     let type = null;
       if (/wxwork/i.test(navigator.userAgent)) {
           type = 'wechat_enterprise';
       } else if (/micromessenger/i.test(navigator.userAgent)) {
           type = 'wechat_open';
       }
       return type;
};

// 是否需要隐藏 title bar
export const needHideTitleBar = () => {
    return isEnvironment() !== null;
};

// 获取授权上一页路径
export const getCallbackUrl = () => {
    let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
    if (routes[routes.length - 1]) {
        let curRoute = routes[routes.length - 1].options.callbackUrl; //获取当前页面路由
        console.log('curRoute', routes[routes.length - 1].options);
        return curRoute;
    }
    return null;
};

export const isExternalUrl = (url) => {
    // 创建一个元素用于解析url
    const link = document.createElement('a');
    link.href = url;

    // 获取当前页面的域名
    const currentHost = window.location.hostname;

    // 比较传入的url的域名和当前页面的域名
    return link.hostname !== currentHost;
};

/**
 * 获取顶部地址栏地址
 */
export const getTopUrl = () => {
    return window.location.href.split('/#/')[0];
};

/**
 * 判断是否为空
 */
export function validatenull(val) {
    if (typeof val == 'boolean') {
        return false;
    }
    if (typeof val == 'number') {
        return false;
    }
    if (val instanceof Array) {
        if (val.length === 0) return true;
    } else if (val instanceof Object) {
        if (JSON.stringify(val) === '{}') return true;
    } else {
        if (val === 'null' || val == null || val === 'undefined' || val === undefined || val === '') return true;
        return false;
    }
    return false;
}

// 根据name获取地址拦参数值
export function getUrlCode(name) {
    return (
        decodeURIComponent(
            (new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(new URL(location.href)) || [, ''])[1].replace(
                /\+/g,
                '%20'
            )
        ) || null
    );
}

// 根绝value查询label
export function getlabelByValue(type, value) {
    return new Promise((resolve, reject) => {
        dictionary({
            code: 'DC_LABOR_POSITION',
        }).then((res) => {
            if (res.code == 200) {
                let label = res.data.find((item) => item.dictKey == value)?.dictValue;
                if (label) {
                    resolve(label);
                } else {
                    reject();
                }
            } else {
                reject();
            }
        });
    });
}

// 秒转小时
export const secondToHour = (seconds, decimal) => {
    try {
        if (decimal && decimal > 0 && typeof decimal === 'number') {
            return (seconds / 3600).toFixed(decimal);
        } else {
            return Math.ceil(seconds / 3600);
        }
    } catch (error) {
        return false;
    }
};

// 小时转秒，保留 n 位小数（默认不保留）
export const hourToSecond = (hour, n = 0) => {
    try {
        const result = hour * 3600;
        return Number(result.toFixed(n)); // 返回数值类型
    } catch (error) {
        return false;
    }
};

// 数据合并
export function mergeRecursive(source, target) {
    for (var p in target) {
        try {
            if (target[p].constructor == Object) {
                source[p] = mergeRecursive(source[p], target[p]);
            } else {
                source[p] = target[p];
            }
        } catch (e) {
            source[p] = target[p];
        }
    }
    return source;
}
