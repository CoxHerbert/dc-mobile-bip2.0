<template>
    <view>
        <u-popup v-model="visible" mode="bottom" height="90%" border-radius="14" safe-area-inset-bottom>
            <view class="search-item">
                <u-input
                    @click="onClick"
                    class="search-input"
                    v-model="searchLable"
                    placeholder="选择"
                    type="select"
                    :customStyle="{ borderRadius: '14rpx', flex: 1 }"
                ></u-input>
                <u-select
                    v-model="show"
                    :list="[
                        {
                            label: '物料编码',
                            value: 'FNUMBER',
                        },
                        {
                            label: '物料名称',
                            value: 'FNAME',
                        },
                        {
                            label: '规格型号',
                            value: 'FSPECIFICATION',
                        },
                    ]"
                    mode="single-column"
                    title="查询条件"
                    @confirm="handleSubmit"
                ></u-select>
                <span style="width: 68%">
                    <u-search
                        :placeholder="`请输入${searchLable}`"
                        v-model="searchValue"
                        shape="square"
                        :clearabled="true"
                        :show-action="false"
                        bg-color="#f6f6f6"
                        @search="getList(true)"
                        @clear="getList(true)"
                    ></u-search>
                </span>
            </view>

            <scroll-view scroll-y="true" class="check-item">
                <view v-if="checkType == 'radio'">
                    <u-radio-group v-model="value" wrap style="width: 100%">
                        <u-radio v-for="(item, index) in list" :key="index" :name="item.id" :disabled="item.disabled">
                            <view class="flex-between flex-c item">
                                <view class="flex-one" v-for="(itemColumn, index) in column" :key="index">
                                    <view class="real-name">{{ itemColumn.label }}</view>
                                    <view class="dept-name">{{ item[itemColumn.prop] }}</view>
                                </view>
                            </view>
                        </u-radio>
                    </u-radio-group>
                </view>
                <view v-else>
                    <u-checkbox-group wrap>
                        <u-checkbox
                            v-model="item.checked"
                            v-for="(item, index) in list"
                            :key="index"
                            :name="item.id"
                            @change="handleCheckChange"
                        >
                            <view class="flex-between flex-c item">
                                <view class="flex-one" v-for="(itemColumn, index) in column" :key="index">
                                    <view class="real-name">{{ itemColumn.label }}</view>
                                    <view class="dept-name">{{ item[itemColumn.prop] }}</view>
                                </view>
                            </view>
                        </u-checkbox>
                    </u-checkbox-group>
                </view>
            </scroll-view>
            <view class="foot-item flex-c" :class="checkType == 'radio' ? 'flex-evenly' : 'flex-between'">
                <u-checkbox-group @change="handleCheckedAll" v-if="checkType != 'radio'">
                    <u-checkbox v-model="allChecked">全选</u-checkbox>
                </u-checkbox-group>
                <view :class="checkType == 'checkbox' ? 'flex-between' : ''">
                    <u-button @click="handleClose" type="primary" shape="square" size="medium">关闭</u-button>
                    <u-button
                        @click="handleClear"
                        type="error"
                        shape="square"
                        size="medium"
                        style="margin: 0px 10rpx"
                        :hair-line="false"
                    >
                        清空
                    </u-button>
                    <u-button @click="handleConfirm" type="primary" shape="square" size="medium">确定</u-button>
                </view>
            </view>
        </u-popup>
    </view>
</template>
<script>
export default {
    name: 'wf-user-select',
    props: {
        defaultChecked: {
            type: String,
            default: () => {
                return '';
            },
        },
        params: {
            type: Object,
            default: () => {
                return {};
            },
        },
        fnUrl: {
            type: String,
            default: () => {
                return '';
            },
        },
        customOption: Object,
        checkType: {
            type: String,
            default: () => {
                return 'radio';
            },
        },
        cColumn: {
            type: Object,
            default: () => ({
                children: {
                    props: {
                        url: '',
                        label: '',
                    },
                },
                props: {
                    label: '',
                },
            }),
        },
    },
    computed: {
        qparams() {
            return this.params;
        },
        column() {
            return this.cColumn.children.column;
        },
    },

    data() {
        return {
            searchLable: '物料编码',
            searchName: 'FNUMBER',
            show: false,
            value: null,
            visible: false,
            allChecked: false, //全选
            searchValue: null, //搜索内容
            checkList: new Set(),
            page: {
                size: 10,
                current: 1,
            },
            list: [],
            init: false,
            loadStatus: 'loadmore',
        };
    },
    methods: {
        handleSubmit(data) {
            this.searchLable = data[0].label;
            this.searchName = data[0].value;
        },
        onClick() {
            this.show = true;
        },

        //全选
        handleCheckedAll() {
            let flag = this.allChecked;
            this.list.map((e) => {
                if (flag) {
                    e.checked = true;
                    this.checkList.add(e);
                } else {
                    e.checked = false;
                    this.checkList.delete(e);
                }
            });
        },
        handleClear() {
            this.$emit('onConfirm', '', '');
            this.value = '';
        },
        handleClose() {
            this.selectionClear();
            this.visible = false;
        },
        selectionClear() {
            this.list.forEach((l) => (l.checked = false));
            this.checkList = new Set();
            this.allChecked = false;
            this.value = '';
        },
        handleCheckChange({ value, name }) {
            const row = this.list.find((l) => l.id == name);
            if (value) this.checkList.add(row);
            else this.checkList.delete(row);
        },
        handleConfirm() {
            if (this.checkType == 'radio') {
                if (!this.value) {
                    uni.showToast({
                        icon: 'none',
                        title: '请至少选择一项',
                    });
                    return;
                }
                const selectData = this.list.find((u) => u.id == this.value);
                if (selectData) this.$emit('onConfirm', selectData);
            } else {
                const checkList = Array.from(this.checkList);
                if (checkList.length == 0) {
                    uni.showToast({
                        icon: 'none',
                        title: '请至少选择一项',
                    });
                    return;
                }
                const ids = [];
                const names = [];
                checkList.forEach((c) => {
                    ids.push(c.id);
                    names.push(c.realName);
                });
                this.$emit('onConfirm', ids.join(','), names.join(','));
            }
            this.handleClose();
        },
        changeDefaultChecked() {
            let defaultChecked = this.defaultChecked;
            if (!this.defaultChecked) defaultChecked = '';

            if (this.checkType == 'radio') {
                this.value = defaultChecked;
            } else {
                const checks = defaultChecked.split(',');
                const checkList = [];
                this.list.forEach((l) => {
                    if (l.checked || checks.includes(l.id)) {
                        this.$set(l, 'checked', true);
                        checkList.push(l);
                        this.checkList.add(l);
                    } else this.$set(l, 'checked', false);
                });
                if (checkList.length == this.list.length) this.allChecked = true;
                else this.allChecked = false;
            }
        },
        getList(clear) {
            uni.showLoading({
                title: '加载中...',
                mask: true, // 是否显示透明蒙层，防止触摸穿透
            });
            if (clear)
                this.page = {
                    current: 1,
                    size: 10,
                };
            const { current, size } = this.page;

            this.$http
                .request({
                    url: this.fnUrl,
                    method: 'GET',
                    params: {
                        current,
                        size,
                        currentPage: current,
                        pageSize: size,
                        [this.searchName]: this.searchValue,
                        ...this.qparams,
                    },
                })
                .then((res) => {
                    uni.hideLoading();
                    console.log(res);
                    const { records } = res.data ? res.data : res;
                    let list = records || res.data || [];
                    if (list.length < size) this.loadStatus = 'nomore';
                    else this.loadStatus = 'loadmore';

                    if (clear) this.list = list;
                    else this.list = this.list.concat(list);

                    this.page.current++;
                    this.init = true;
                    this.changeDefaultChecked();
                });
        },
    },
    mounted() {},
};
</script>
<style lang="scss" scoped>
@import '../../static/styles/common';
.search-item {
    padding: 30rpx;
    border-bottom: 20rpx solid #f6f6f6;
    display: flex;
    align-items: center;
    width: 100%;
}
.search-input {
    background-color: #f6f6f6;
    padding: 0px 20rpx !important;
    height: 64rpx;
    border-radius: 10rpx;
    margin-right: 20rpx;
}

.flex-between {
    flex-direction: column;
    align-items: flex-start;
}
.flex-one {
    display: flex;
    align-items: center;
}

.check-item {
    padding: 0rpx 16rpx;
    background-color: #f6f6f6;
}
.u-radio {
    background-color: #fff;
    margin-bottom: 20rpx;
    border-radius: 10rpx;
}

.check-item {
    height: calc(100% - 244rpx);
    box-sizing: border-box;
    ::v-deep.u-checkbox__label {
        width: 100%;
    }
    .item {
        width: 100%;
        margin-left: 15rpx;
        .icon {
            width: 86rpx;
            height: 86rpx;
            border-radius: 50%;
            margin-right: 15rpx;
        }
        .real-name {
            color: #333;
            font-size: 30rpx;
            margin-right: 20rpx;
        }
        .dept-name {
            flex: 1;
            color: #a09fa5;
            font-size: 26rpx;
        }
    }
}
.foot-item {
    width: 100%;
    padding: 0 30rpx;
    height: 100rpx;
    border-top: 2rpx solid #f6f6f6;
}
</style>
<style lang="scss">
.check-item {
    .u-radio,
    .u-checkbox {
        padding: 10rpx 30rpx;
    }
}
</style>
