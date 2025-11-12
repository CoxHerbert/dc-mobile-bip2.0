<template>
    <view
        class="comp-dc-select-dict"
        :class="{
            disabled: disabled,
        }"
    >
        <view @click="handleInputClick" class="input-wrapper">
            <view v-if="value" class="value">{{ label }}</view>
            <view v-else class="placholder">{{ placeholder }}</view>
        </view>
        <u-popup v-model="visible" mode="bottom" height="90%" border-radius="14" safe-area-inset-bottom>
            <template>
                <dc-radio
                    v-model="selectedValue"
                    :options="dictData || []"
                    :labelKey="'dictValue'"
                    :valueKey="'dictKey'"
                    @close="handleClose"
                ></dc-radio>
            </template>
        </u-popup>
    </view>
</template>
<script>
import DictCache from '@/components/dc/constant/dict-cache.js';
import Api from '@/api/index';
import DcRadio from '../dc-radio/index.vue';

function searchDictByKey(dict, key) {
    if (key == null && key == '') {
        return null;
    }
    try {
        for (let i = 0; i < dict.length; i++) {
            if (dict[i].key == key) {
                return dict[i].value;
            }
        }
    } catch (e) {
        return null;
    }
}

function arrayToTree(data) {
    const map = new Map();
    const tree = [];

    // 先将所有数据存入 Map，键为 id，值为对象本身
    data.forEach((item) => {
        map.set(item.id, { ...item, children: [] });
    });

    data.forEach((item) => {
        const node = map.get(item.id);
        if (item.parentId && map.has(item.parentId)) {
            // 如果有 parentId，则加入对应的父节点的 children
            map.get(item.parentId).children.push({
                ...node,
                code: node.code,
                id: node.id,
                label: node.dictValue,
                value: node.id,
            });
        } else {
            // 没有 parentId，则是根节点

            tree.push({
                ...node,
                code: node.code,
                id: node.id,
                label: node.dictValue,
                value: node.id,
            });
        }
    });

    return tree;
}

export default {
    emits: ['input', 'change'],
    name: 'dc-select-popup',
    components: {
        DcRadio,
    },
    props: {
        disabled: {
            type: Boolean,
            default() {
                return false;
            },
        },
        value: {
            type: String,
            default() {
                return '';
            },
        },
        placeholder: {
            type: String,
            default() {
                return '';
            },
        },
        labelKey: {
            type: String,
            default() {
                return 'dictValue';
            },
        },
        valueKey: {
            type: String,
            default() {
                return 'dictKey';
            },
        },
        dictKey: {
            type: String,
            default() {
                return '';
            },
            required: true,
        },
        mutiple: {
            type: String,
        },
    },
    data() {
        return {
            selectedValue: '',
            dictData: [],
            visible: false,
        };
    },
    async created() {
        await this.getDict();
    },
    computed: {
        label() {
            return (this.dictData || []).find((d) => d[this.valueKey] == this.value)?.[this.labelKey] || '';
        },
    },
    watch: {
        value: {
            handler(val) {
                this.selectedValue = val;
            },
            immediate: true,
        },
    },
    methods: {
        async getDict() {
            const dictData = await this.getData({ type: this.dictKey });
            this.dictData = dictData;
        },
        async handleInputClick() {
            if (this.disabled) {
                return;
            }
            this.visible = true;
            if (!this.dictData?.length) {
                await this.getDict();
            }
        },
        handleClose() {
            this.visible = false;
            this.$emit('input', this.selectedValue);
            this.$emit('change', this.selectedValue);
        },
        getData(dictMeta) {
            const storeDict = searchDictByKey(this.$store.getters.dict, dictMeta.type);
            if (storeDict && storeDict.length > 0) {
                return new Promise((resolve) => {
                    resolve(storeDict);
                });
            } else {
                const cacheObj = DictCache[dictMeta.type];
                return new Promise((resolve, reject) => {
                    switch (cacheObj?.type) {
                        case 'map':
                            Api.common
                                .getCommonMapCache(cacheObj.url, dictMeta.type)
                                .then((res) => {
                                    resolve(res?.data);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                            break;
                        case 'list':
                            Api.common
                                .getCommonListCache(cacheObj.url)
                                .then((res) => {
                                    const result = res.data.map((item) => {
                                        return {
                                            code: cacheObj.key,
                                            id: item[cacheObj.keys.id],
                                            label: item[cacheObj.keys.label],
                                            value: item[cacheObj.keys.id],
                                            orgCode: item.orgCode,
                                        };
                                    });
                                    resolve(result);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                            break;
                        default:
                            Api.system.dictbiz
                                .getDicts(dictMeta.type)
                                .then((res) => {
                                    const result = arrayToTree(res.data);
                                    resolve(result);
                                })
                                .catch((err) => {
                                    reject(err);
                                });
                    }
                });
            }
        },
    },
};
</script>
<style lang="scss">
.comp-dc-select-dict {
    position: relative;
    width: 100%;
    height: 100%;
    .value {
        width: 100%;
        height: 100%;
        line-height: 40px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .placholder {
        width: 100%;
        height: 100%;
        line-height: 40px;
        font-size: 14px;
        color: rgb(192, 196, 204);
    }
    &.disabled {
        width: calc(100% - 8px);
        background-color: rgba(0, 0, 0, 0.05);
    }
}
</style>
