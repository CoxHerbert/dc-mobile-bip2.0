import http from '@/http/api.js';

const prefix = '/blade-workflow/app/draft';

export const getDetail = (params) => {
    return http.request({
        url: `${prefix}/detail`,
        method: 'get',
        params,
    });
};

export const submit = (row) => {
    return http.request({
        url: `${prefix}/submit`,
        method: 'post',
        data: row,
    });
};
