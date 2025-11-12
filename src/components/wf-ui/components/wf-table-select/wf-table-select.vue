<template>
    <view class="wf-table-select">
        <div class="wf-table-select__field" @click="handleClick">
            <u-field
                v-model="input"
                :label-width="0"
                right-icon="search"
                :placeholder="getPlaceholder(column, column.type)"
            ></u-field>
        </div>

        <u-popup
            v-model="show"
            mode="bottom"
            height="90%"
            border-radius="14"
            :mask-close-able="false"
            safe-area-inset-bottom
        >
            <view class="wf-table-select__search">
                <u-search
                    :placeholder="`请输入${singleSearch.label}`"
                    v-model="searchValue"
                    shape="square"
                    :clearabled="true"
                    :show-action="false"
                    bg-color="#f6f6f6"
                    @search="tableLoad(true)"
                    @clear="tableLoad(true)"
                ></u-search>
            </view>
            <scroll-view scroll-y="true" class="wf-table-select__content">
                <template v-if="multiple">
                    <checkbox-group @change="handleRowChange">
                        <template v-for="(item, index) in data">
                            <item
                                :key="index"
                                :index="index"
                                :item="item"
                                :value-key="valueKey"
                                :children-key="childrenKey"
                                :has-children-key="hasChildrenKey"
                                :multiple="multiple"
                                :selection-list="Array.from(selectionList)"
                                :c-column="cColumn"
                                :arrow-keys="arrowKeys"
                                @row-expand="handleRowExpand"
                            ></item>
                            <template v-if="item[childrenKey] || item[hasChildrenKey]">
                                <view v-show="arrowKeys.includes(item[valueKey])">
                                    <view style="text-align: center">
                                        <u-icon name="arrow-downward"></u-icon>
                                    </view>
                                    <template v-for="(cItem, cIndex) in item[childrenKey]">
                                        <item
                                            :key="cIndex"
                                            :index="cIndex"
                                            :item="cItem"
                                            :value-key="valueKey"
                                            :children-key="childrenKey"
                                            :has-children-key="hasChildrenKey"
                                            :multiple="multiple"
                                            :selection-list="Array.from(selectionList)"
                                            :c-column="cColumn"
                                            :arrow-keys="arrowKeys"
                                            @row-expand="handleRowExpand"
                                        ></item>
                                    </template>
                                </view>
                            </template>
                        </template>
                    </checkbox-group>
                </template>
                <template v-else>
                    <radio-group @change="handleRowChange">
                        <template v-for="(item, index) in data">
                            <item
                                :key="index"
                                :index="index"
                                :item="item"
                                :value-key="valueKey"
                                :children-key="childrenKey"
                                :has-children-key="hasChildrenKey"
                                :multiple="multiple"
                                :selection-list="Array.from(selectionList)"
                                :c-column="cColumn"
                                :arrow-keys="arrowKeys"
                                @row-expand="handleRowExpand"
                            ></item>
                            <template v-if="item[childrenKey] || item[hasChildrenKey]">
                                <view v-show="arrowKeys.includes(item[valueKey])">
                                    <view style="text-align: center">
                                        <u-icon name="arrow-downward"></u-icon>
                                    </view>
                                    <template v-for="(cItem, cIndex) in item[childrenKey]">
                                        <item
                                            :key="cIndex"
                                            :index="cIndex"
                                            :item="cItem"
                                            :value-key="valueKey"
                                            :children-key="childrenKey"
                                            :has-children-key="hasChildrenKey"
                                            :multiple="multiple"
                                            :selection-list="Array.from(selectionList)"
                                            :c-column="cColumn"
                                            :arrow-keys="arrowKeys"
                                            @row-expand="handleRowExpand"
                                        ></item>
                                    </template>
                                </view>
                            </template>
                        </template>
                    </radio-group>
                </template>
                <u-loadmore :status="loadStatus" @loadmore="tableLoad(false)" margin-bottom="30" v-if="needPage" />
            </scroll-view>
            <view class="wf-table-select__action">
                <view>
                    <checkbox-group @change="handleAllCheck" v-if="multiple">
                        <label>
                            <checkbox
                                class="transform7"
                                :value="allCheck"
                                :checked="totalDataLength() == Array.from(selectionList).length"
                            ></checkbox>
                            全选({{ Array.from(selectionList).length || 0 }})
                        </label>
                    </checkbox-group>
                </view>

                <view class="wf-table-select__action--right">
                    <button type="warn" size="mini" style="margin-right: 20rpx" @click="close">关闭</button>
                    <button type="warn" size="mini" style="margin-right: 20rpx" @click="handelClear">清空</button>
                    <button type="primary" size="mini" @click="handleSubmit">确定</button>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script>
import Props from '../../mixins/props.js';
import { getAsVal } from '../../util/index.js';
import Item from './item.vue';

export default {
    name: 'wf-table-select',
    components: { Item },
    mixins: [Props],
    computed: {
        multiple() {
            return this.column.multiple;
        },
        children() {
            return this.column.children || {};
        },
        cColumn() {
            return this.children.column;
        },
        cProps() {
            return this.children.props || {};
        },
        url() {
            return this.cProps.url;
        },
        method() {
            return this.cProps.method;
        },
        needPage() {
            return this.cProps.needPage;
        },
        currentPageKey() {
            return this.cProps.currentPageKey;
        },
        pageSizeKey() {
            return this.cProps.pageSizeKey;
        },
        totalKey() {
            return this.cProps.totalKey;
        },
        recordsKey() {
            return this.cProps.recordsKey || '';
        },
        resKey() {
            return this.cProps.resKey || 'data';
        },
        valueKey() {
            const key = this.column.props.value;
            if (!key) {
                console.error(
                    `[table-select](${this.column.label}): 未配置rowKey, 使用默认值'id', 可能会导致选择失效。`
                );
                return 'id';
            }
            return key;
        },
        lazy() {
            return this.cProps.lazy;
        },
        parentKey() {
            return this.cProps.parentKey || 'parentId';
        },
        childrenKey() {
            return this.cProps.childrenKey || 'children';
        },
        hasChildrenKey() {
            return this.cProps.hasChildrenKey || 'hasChildren';
        },
        checkStrictly() {
            return this.cProps.checkStrictly;
        },
        values() {
            return Array.from(this.selectionList)
                .map((item) => item[this.valueKey])
                .join(',');
        },
        labels() {
            const labels = Array.from(this.selectionList)
                .map((item) => item[this.labelKey])
                .join(' | ');
            if (typeof this.formatter == 'function') {
                const label = this.formatter(Array.from(this.selectionList)) || labels;
                return Array.isArray(label) ? label.join(' | ') : label;
            } else {
                return labels;
            }
        },
        singleSearch() {
            let data = this.children.column.find((item) => item.search == true);
            return data;
        },
    },
    data() {
        return {
            input: '',
            show: false,
            searchValue: '',
            isInit: false,
            page: {},
            data: [],
            selectionList: new Set(),
            allCheck: '1',
            loadStatus: 'loadmore',
            arrowKeys: [],
            text: '',
        };
    },
    onReachBottom() {
        if (this.loadStatus == 'nomore') return;
        this.tableLoad();
    },
    methods: {
        // 初始化显示
        initValue() {
            const val = this.text;
            if (val && typeof val == 'object') {
                const label = val[this.labelKey].split(' | ');
                const value = val[this.valueKey].split(',');
                this.input = val[this.labelKey];
                const arr = [];
                value.forEach((v, i) => {
                    if (v) {
                        arr.push({
                            [this.valueKey]: v,
                            [this.labelKey]: label[i],
                        });
                    }
                });
                this.selectionList = new Set(arr);
            } else {
                this.input = '';
                this.selectionList = new Set();
            }
        },
        // 弹窗
        handleClick() {
            if (this.disabled) return;
            this.show = true;
            if (!this.isInit) this.tableLoad(true);
        },
        // 行点击
        handleRowCheck(value) {
            if (!value) {
                this.selectionList = new Set();
                return;
            }
            const findRow = (data, key) => {
                if (!data) {
                    return;
                }
                for (let i = 0; i < data.length; i++) {
                    const s = data[i];
                    if (s[this.valueKey] == key) {
                        return s;
                    }
                    const r = findRow(s[this.childrenKey], key);
                    if (r) {
                        return r;
                    }
                }
                return;
            };
            if (this.multiple) {
                if (typeof value == 'string') value = value.split(',');

                const arr = [];
                value.forEach((v) => {
                    const r = findRow(this.data, v);
                    if (r) {
                        arr.push(r);
                    }
                });
                this.selectionList = new Set(arr);
            } else {
                const row = findRow(this.data, value);
                if (row) {
                    this.selectionList = [row];
                }
            }
        },
        // 行选择改变
        handleRowChange(e) {
            const { value } = e.detail;
            this.handleRowCheck(value);
        },
        // 全选
        handleAllCheck(e) {
            const { value } = e.detail;
            this.selectionList = new Set();
            if (value.length != 0) {
                const arr = [];
                const resolveChildren = (list) => {
                    if (!list || list.length == 0) return;
                    list.forEach((l) => {
                        arr.push(l);
                        resolveChildren(l[this.childrenKey]);
                    });
                };
                resolveChildren(this.data);
                this.selectionList = new Set(arr);
            }
        },
        // 行展开/收缩
        handleRowExpand({ row, index }) {
            const key = row[this.valueKey];
            const idx = this.arrowKeys.findIndex((a) => a == key);
            if (idx > -1) {
                this.arrowKeys.splice(idx, 1);
            } else {
                this.arrowKeys.push(key);

                if (!row[this.childrenKey] || row[this.childrenKey].length == 0) {
                    this.treeLoad(row, index);
                }
            }
        },
        // 清空
        handelClear() {
            this.selectionList = new Set();
        },

        close() {
            this.show = false;
        },
        // 提交
        handleSubmit() {
            this.input = this.labels;
            this.text = {
                [this.valueKey]: this.values,
                [this.labelKey]: this.labels,
            };
            console.log(this.text);
            this.show = false;
            this.$emit('label-change', this.text);
        },
        // 数据总条数，包含子集
        totalDataLength() {
            let total = 0;
            const getTotal = (list) => {
                if (!list || list.length == 0) return;
                list.forEach((l) => {
                    total++;

                    getTotal(l[this.childrenKey]);
                });
            };
            getTotal(this.data);
            return total;
        },
        // 树加载
        treeLoad(tree, index) {
            if (!this.lazy) {
                return;
            }
            const params = {
                [this.parentKey]: tree[this.valueKey],
            };
            this.getList(false, params).then((res) => {
                const { data, value } = res;
                // tree[this.childrenKey] = data;
                this.data[index][this.childrenKey] = data;
                this.handleRowCheck(data, value);
            });
        },
        // 列表加载
        tableLoad(clear = false) {
            this.getList(clear).then((res) => {
                const { total, data, value } = res;
                if (this.needPage) {
                    this.page.total = total;

                    if (data.length < this.page[this.pageSizeKey]) this.loadStatus = 'nomore';
                    else this.loadStatus = 'loadmore';

                    this.page[this.currentPageKey]++;
                }

                if (clear) this.data = data || [];
                else this.data = this.data.concat(data || []);

                this.handleRowCheck(data, value);
            });
        },
        // 获取列表
        getList(clear = false, query = {}) {
            return new Promise((resolve, reject) => {
                this.loadStatus = 'loading';
                if (clear) {
                    this.page = {
                        [this.currentPageKey]: 1,
                        [this.pageSizeKey]: 5,
                    };
                }
                const page = this.page;
                let value;
                if (this.isInit) {
                    value = this.values;
                } else if (this.text && typeof this.text == 'object') {
                    value = this.text[this.valueKey];
                }
                this.isInit = true;
                if (typeof this.column.onLoad == 'function') {
                    this.column
                        .onLoad({
                            page: this.page,
                            data: {
                                [this.singleSearch.prop]: this.searchValue,
                            },
                            value,
                        })
                        .then((res) => {
                            const { total, data } = res;
                            resolve({ total, data, value });
                        });
                } else {
                    const option = {
                        url: this.url,
                        method: this.method,
                    };

                    let params = {
                        [this.singleSearch.prop]: this.searchValue,
                    };
                    if (this.needPage) {
                        params = Object.assign(params, page);
                    }
                    if (this.method == 'get') {
                        option.params = { ...params, ...query };
                    } else {
                        option.data = { ...params, ...query };
                    }
                    this.$http.request(option).then((res) => {
                        const response = getAsVal(res, this.resKey);
                        if (!response) {
                            uni.showToast({
                                title: '未查询到数据或者返回层级配置错误',
                            });
                            return;
                        }
                        const total = getAsVal(response, this.totalKey) || 0;
                        const records = getAsVal(response, this.recordsKey) || [];
                        resolve({ total, data: records, value });
                    });
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.wf-table-select {
    width: 100%;

    &__field {
        position: relative;

        .u-field {
            padding: 20rpx 0;
        }

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 90%;
            height: 90%;
            z-index: 100;
            content: '';
        }
    }

    .transform7 {
        transform: scale(0.7);
    }

    &__search {
        padding: 30rpx;
    }

    &__content {
        /* #ifdef MP */
        height: calc(100% - 167rpx - env(safe-area-inset-bottom));
        /* #endif */
        /* #ifndef MP */
        height: calc(100% - 232rpx - env(safe-area-inset-bottom));
        /* #endif */
        box-sizing: border-box;
        background-color: #f6f6f6;

        &--item {
            background-color: #fff;
            margin: 16rpx;
            border-radius: 16rpx;
            padding: 16rpx;
            display: flex;
            align-items: center;
            justify-content: space-between;

            label {
                display: flex;
                align-items: center;
            }

            .row {
                margin-left: 20rpx;

                &-item {
                    display: flex;
                    align-items: center;
                }

                &-label {
                    color: #999;
                    font-size: 28rpx;
                    margin-right: 6rpx;
                }

                &-value {
                    flex: 1;
                    color: #565656;
                    font-size: 28rpx;
                    word-break: break-all;
                    word-wrap: break-word;
                    white-space: pre-wrap;
                }
            }
        }
    }

    &__action {
        position: fixed;
        left: 0;
        right: 0;
        bottom: env(safe-area-inset-bottom);
        z-index: 99;
        width: 100%;
        padding: 0 12px;
        height: 52px;
        background: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;

        &--right {
            display: flex;
            align-items: center;
        }
    }
}
</style>
