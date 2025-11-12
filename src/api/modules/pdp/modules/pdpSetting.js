import http from '@/http/api.js';

export default {
    // 列表甘特图展示
    getProcessModelList(params) {
        return new Promise((resolve, reject) => {
            http.request({
                url: '/api/blade-workflow/design/model/list',
                method: 'get',
                params,
            })
                .then((res) => {
                    const { code, data } = res.data;
                    if (code === 200) {
                        res.data.data.records = res.data.data.records.map((row) => {
                            return {
                                ...row,
                                id: row.modelKey,
                                id_: row.id,
                            };
                        });
                        resolve(res);
                    } else {
                        reject(res);
                    }
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};
