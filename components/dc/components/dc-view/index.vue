<template>
    <view style="display: inline-block">{{ viewText || value || '-' }} </view>
</template>

<script>
import cacheApi from '@/components/dc/api/index';
import cacheData from '@/components/dc/constant/cacheData';

export default {
    model: {
        prop: 'value',
        event: 'input',
    },
    props: {
        // v-model 绑定值
        value: {
            type: [String, Number, Object, Array],
            default: null,
        },
        // 需要展示的类名 比如用户 user
        objectName: {
            type: String,
            default: null,
        },
        // 显示的键名
        showLabel: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            iptTagData: [],
            model: null,
        };
    },
    watch: {
        value: {
            handler: async function (newVal) {
                try {
                    this.model = cacheData[this.objectName];
                    let ids;
                    if (Array.isArray(newVal)) {
                        ids = newVal.map((item) => item?.id || item);
                    } else if (typeof newVal === 'object' && newVal !== null) {
                        ids = [newVal?.id];
                    } else if (typeof newVal === 'string') {
                        ids = newVal.split(',');
                    } else if (typeof newVal === 'number') {
                        ids = [String(newVal)];
                    } else {
                        ids = '';
                    }
                    if (!ids || (Array.isArray(ids) && ids.length === 0)) return;

                    await cacheApi.cache.getView({
                        url: this.model.url,
                        data: ids,
                    });

                    const currentGlobalData = this.$store.getters.globalData[this.model.url];
                    console.log(currentGlobalData, 'currentGlobalData');
                    this.iptTagData = ids.map((id) => currentGlobalData[id] || id);
                } catch (error) {
                    console.error(error);
                }
            },
            deep: true,
            immediate: true,
        },
    },
    computed: {
        viewText() {
            if (Array.isArray(this.iptTagData) && this.iptTagData.length) {
                return this.iptTagData
                    .map((item) => {
                        let value = item?.id;
                        if (this.model?.defaultLabel || this.showLabel) {
                            try {
                                value = item[this.model?.defaultLabel || this.showLabel];
                            } catch (error) {
                                value = item?.id;
                            }
                        }
                        return value;
                    })
                    .join('，');
            } else {
                return '-';
            }
        },
    },
};
</script>

<style lang="scss" scoped></style>
