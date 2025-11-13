const TRUE_VALUES = ['1', 'true', 'yes', 'on'];
const FALSE_VALUES = ['0', 'false', 'no', 'off'];

function resolveBooleanFlag(value, fallback = false) {
    if (typeof value === 'boolean') {
        return value;
    }
    if (typeof value === 'string') {
        const normalized = value.trim().toLowerCase();
        if (TRUE_VALUES.includes(normalized)) return true;
        if (FALSE_VALUES.includes(normalized)) return false;
    }
    return fallback;
}

export function isRendererTestEnvironment() {
    if (typeof window === 'undefined') {
        return false;
    }

    const { hostname = '', search = '' } = window.location;
    const params = new URLSearchParams(search);
    if (params.has('rendererCompare')) {
        return resolveBooleanFlag(params.get('rendererCompare'), true);
    }

    const flag = import.meta.env?.VITE_RENDER_COMPARE;
    if (typeof flag !== 'undefined') {
        return resolveBooleanFlag(String(flag), false);
    }

    if (/test|staging|preview/i.test(hostname)) {
        return true;
    }

    return false;
}
