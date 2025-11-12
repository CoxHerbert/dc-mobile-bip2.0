<template>
    <view>
        <u-card
            v-for="(item, index) in list"
            :key="index"
            :border="false"
            :show-head="false"
            :head-border-bottom="false"
            margin="0 30rpx 30rpx"
        >
            <view slot="body" @click="dynamicRoute(item, 'detail')">
                <view class="head flex-between flex-c">
                    <view class="flex-one flex-between flex-c">
                        <view class="status-icon">
                            <view class="status-icon-delay" v-if="item.status == 'delay'">超时</view>
                            <view class="status-icon-normal" v-else-if="item.status == 'todo'">正常</view>
                            <template v-else-if="item.status == 'done' || !item.stautus">
                                <view class="status-icon-normal" v-if="item.processIsFinished == 'unfinished'"
                                    >正常</view
                                >
                                <view class="status-icon-normal" v-else-if="item.processIsFinished == 'finished'"
                                    >结束</view
                                >
                                <view class="status-icon-delay" v-else-if="item.processIsFinished == 'terminate'"
                                    >终止</view
                                >
                                <view class="status-icon-delay" v-else-if="item.processIsFinished == 'withdraw'"
                                    >撤销</view
                                >
                                <view class="status-icon-delay" v-else-if="item.processIsFinished == 'recall'"
                                    >撤回</view
                                >
                                <view class="status-icon-delay" v-else-if="item.processIsFinished == 'reject'"
                                    >驳回</view
                                >
                                <view class="status-icon-delay" v-else-if="item.processIsFinished == 'deleted'"
                                    >删除</view
                                >
                            </template>
                        </view>
                        <text class="flex-one title txt-cut1">{{ item.processDefinitionName }}</text>
                    </view>
                    <block v-if="item.applyUser.avatar"
                        ><image :src="item.applyUser.avatar" mode="" class="avatar"></image
                    ></block>
                    <block v-else>
                        <image
                            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                            mode=""
                            class="avatar"
                        ></image>
                    </block>
                </view>
                <view class="cell" v-if="item.variables && item.variables.serialNumber">
                    <text class="label">流水号：</text>
                    <text class="value">{{ item.variables.serialNumber }}</text>
                </view>
                <view class="cell">
                    <text class="label">分类：</text>
                    <text class="value">{{ item.categoryName }}</text>
                </view>
                <view class="cell" v-if="type != 2">
                    <text class="label">当前节点：</text>
                    <text class="value">{{ item.taskName }}</text>
                </view>
                <view class="cell">
                    <text class="label">申请人：</text>
                    <text class="value">{{ item.startUsername }}</text>
                </view>
                <view class="cell" v-if="type != 2">
                    <text class="label">申请时间：</text>
                    <text class="value">{{ item.createTime }}</text>
                </view>
                <block v-if="type == 2">
                    <view class="cell">
                        <text class="label">操作节点：</text>
                        <text class="value">{{ item.taskName }}</text>
                    </view>
                    <view class="cell">
                        <text class="label">发起时间：</text>
                        <text class="value">{{ item.createTime }}</text>
                    </view>
                </block>

                <u-line class="u-line" direction="col"></u-line>
            </view>
            <view v-if="showBtn" slot="foot">
                <view class="foot">
                    <view class="reject t-a-c" @click.stop="handleExam(item, false)">拒绝</view>
                    <view class="line">|</view>
                    <view class="pass t-a-c" @click.stop="handleExam(item, true)">同意</view>
                </view>
            </view>
        </u-card>

        <u-modal v-model="show" ref="modal" title="审批意见" show-cancel-button async-close @confirm="handleSubmit">
            <wf-form v-if="show" ref="form" v-model="form" :option="option"></wf-form>
        </u-modal>
    </view>
</template>
<script>
import WkfExamForm from '../wf-exam-form/index';
import exForm from '../../mixins/ex-form';

export default {
    name: 'wf-card',
    mixins: [exForm],
    components: { WkfExamForm },
    props: {
        list: {
            type: Array,
        },
        showBtn: {
            default: false,
        },
        type: Number,
    },
    data() {
        return {
            show: false,
            form: {},
            option: {
                menuBtn: false,
                column: [
                    {
                        label: '',
                        prop: 'comment',
                        type: 'textarea',
                        placeholder: '审批意见',
                        height: '200',
                        border: true,
                    },
                ],
            },
            task: {},
            pass: false,
        };
    },
    methods: {
        handleExam(item, pass) {
            this.task = item;
            this.pass = pass;
            const comment = this.findObject(this.option.column, 'comment');
            if (!pass) {
                comment.rules = [{ required: true, message: '请输入审批意见' }];
                this.show = true;
            } else {
                this.dynamicRoute(item, 'detail');
            }
        },
        handleSubmit() {
            this.$refs.form.validate((valid, done) => {
                if (valid) {
                    const { comment } = this.form;
                    this.handleCompleteTask(this.pass, {}, comment, this.task).then(() => {
                        this.show = false;
                        this.form = {};
                        this.task = {};
                        uni.showToast({ title: '处理成功' });
                        setTimeout(() => {
                            this.$emit('refresh');
                            if (done && typeof done == 'function') done();
                        }, 1000);
                    });
                } else {
                    this.$refs.modal.clearLoading();
                    if (done && typeof done == 'function') done();
                }
            });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../static/styles/common';
.name {
    font-weight: 600;
    font-size: 30rpx;
}

.head {
    margin-bottom: 24rpx;
    .title {
        font-size: 28rpx;
        color: #222;
        font-weight: 600;
        margin: 0 10rpx;
    }
    .avatar {
        width: 66rpx;
        height: 66rpx;
        border-radius: 50%;
    }
    .status-icon {
        width: 74rpx;
        color: #fff;
        &-delay {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20rpx;
            padding-right: 8rpx;
            background: url('../../static/images/icon_delay.png') no-repeat;
            background-size: 100% 100%;
        }
        &-normal {
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 20rpx;
            padding-right: 8rpx;
            background: url('../../static/images/icon_normal.png') no-repeat;
            background-size: 100% 100%;
        }
    }
}

.cell + .cell {
    margin-top: 20rpx;
}
.cell {
    display: flex;
    align-items: center;
    font-size: 28rpx;
    .label {
        color: #999;
    }
    .value {
        color: #565656;
    }
}

.foot {
    font-size: 34rpx;
    display: flex;
    justify-content: space-evenly;
    font-weight: 600;
    .line {
        color: #efefef;
    }
    .pass {
        color: #4b9eff;
    }
    .reject {
        color: #222;
    }
}
/* #ifdef MP-WEIXIN*/
.foot {
    padding: 28rpx 0;
}
/* #endif */
</style>
