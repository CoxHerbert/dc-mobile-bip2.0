<template>
    <view>
        <u-skeleton :loading="waiting" :animation="true"></u-skeleton>
        <view class="u-skeleton" v-if="waiting">
            <view style="display: flex; justify-content: space-between; align-items: flex-end">
                <view class="u-skeleton-circle"></view>
                <view class="u-skeleton-fillet" style="width: 550rpx; height: 50rpx"></view>
            </view>
            <view class="u-skeleton-fillet" style="height: 80rpx; margin: 50rpx 0"></view>
            <view class="u-skeleton-fillet"></view>
            <view class="u-skeleton-fillet"></view>
            <view class="u-skeleton-fillet"></view>
            <view class="u-skeleton-fillet"></view>
            <view class="u-skeleton-fillet" style="width: 400rpx"></view>
        </view>
        <view class="detail" v-else>
            <!-- 头部 -->
            <view class="detail-head flex-between flex-c">
                <u-avatar :text="process.startUsername" bg-color="#FAB022"></u-avatar>
                <view class="flex-one c">
                    <view class="leave bold txt-cut1">{{ process.processDefinitionName }}</view>
                    <view class="name">{{ process.startUsername }}</view>
                </view>
                <u-tag v-if="process.status == 'todo'" text="审核中" type="success" size="mini" />
                <u-tag v-else-if="process.status == 'delay'" text="已超时" type="error" size="mini" />
                <template v-else-if="process.status == 'done'">
                    <u-tag v-if="process.processIsFinished == 'unfinished'" text="审核中" type="success" size="mini" />
                    <u-tag
                        v-else-if="process.processIsFinished == 'finished'"
                        text="已结束"
                        type="success"
                        size="mini"
                    />
                    <u-tag
                        v-else-if="process.processIsFinished == 'terminate'"
                        text="已终止"
                        type="error"
                        size="mini"
                    />
                    <u-tag v-else-if="process.processIsFinished == 'withdraw'" text="已撤销" type="error" size="mini" />
                    <u-tag v-else-if="process.processIsFinished == 'recall'" text="已撤回" type="error" size="mini" />
                    <u-tag v-else-if="process.processIsFinished == 'reject'" text="已驳回" type="error" size="mini" />
                    <u-tag v-else-if="process.processIsFinished == 'deleted'" text="已删除" type="error" size="mini" />
                </template>
            </view>
            <!-- tab -->
            <u-tabs :list="tabList" :is-scroll="false" :current="current" @change="current = $event"></u-tabs>
            <!-- 内容 -->
            <view class="content">
                <u-card
                    v-show="current == 0"
                    :show-head="false"
                    margin="20rpx 0"
                    padding="0"
                    :border="false"
                    :body-style="{ backgroundColor: '#f6f6f6' }"
                >
                    <view slot="body">
                        <view
                            class="split-line"
                            v-if="
                                summaryOption &&
                                ((summaryOption.column && summaryOption.column.length > 0) ||
                                    (summaryOption.group && summaryOption.group.length > 0))
                            "
                        >
                            <wf-form v-model="form" ref="summaryForm" :option="summaryOption"></wf-form>
                        </view>
                        <view
                            class="split-line"
                            v-if="
                                option &&
                                ((option.column && option.column.length > 0) ||
                                    (option.group && option.group.length > 0))
                            "
                        >
                            <wf-form ref="form" v-model="form" :option="option"></wf-form>
                        </view>
                        <view class="split-line" v-if="process.status == 'todo'">
                            <wkf-exam-form
                                ref="examineForm"
                                :process="process"
                                :comment.sync="comment"
                                @user-select="handleUserSelect"
                            ></wkf-exam-form>
                        </view>
                    </view>
                </u-card>
                <view class="" style="padding: 30rpx" v-show="current == 1"><wkf-flow :flow="flow"></wkf-flow></view>
                <!-- <WfBpmn v-if="current == 2" :bpmnOption="bpmnOption"></WfBpmn> -->
                <WfBpmn v-if="current == 2" :bpmnOption="h5bpmn"></WfBpmn>
            </view>
            <!-- 选人 -->
            <wkf-user-select
                ref="user-select"
                :check-type="checkType"
                :default-checked="defaultChecked"
                @onConfirm="handleUserSelectConfirm"
            ></wkf-user-select>
            <wkf-button
                :loading="submitLoading"
                :button-list="buttonList"
                :process="process"
                :comment="comment"
                @draft="handleDraft({ taskId: process.taskId, variables: form })"
                @examine="handleExamine"
                @user-select="handleUserSelect"
                @rollback="handleRollbackTask"
                @terminate="handleTerminateProcess"
                @withdraw="handleWithdrawTask"
            ></wkf-button>
            <!-- 保存至草稿箱 -->
            <u-modal
                v-model="saveDraftShow"
                content="保存至草稿箱并关闭？"
                show-cancel-button
                @confirm="handleDraftSubmit(process.taskId)"
            ></u-modal>
            <!-- 恢复草稿箱 -->
            <u-modal
                v-model="recoverDraftShow"
                content="是否恢复之前保存的草稿？"
                show-cancel-button
                @confirm="handleRevocerDraftSubmit"
                @cancel="form = tempVariables"
            ></u-modal>
        </view>
    </view>
</template>
<script>
import WkfFlow from '../../components/wf-flow/index';
import WfBpmn from '../../components/wf-bpmn/index.vue';
import WkfUserSelect from '../../components/wf-user-select/index';
import WkfButton from '../../components/wf-button/index';
import WkfExamForm from '../../components/wf-exam-form/index';
import exForm from '../../mixins/ex-form';
import draft from '../../mixins/draft';
// import { needHideTitleBar } from '@/utils/utils';
export default {
    name: 'wf-form-detail',
    mixins: [exForm, draft],
    components: { WkfFlow, WkfUserSelect, WkfButton, WkfExamForm, WfBpmn },
    data() {
        return {
            process: null,
            form: {},
            option: {},
            vars: [], // 需要提交的字段
            submitLoading: false, // 提交时按钮loading
            current: 0,
            tabList: [{ name: '申请信息' }, { name: '流转信息' }, { name: '流转图' }],
            summaryOption: {}, // 汇总表单option
            tempVariables: {},
            h5bpmn: {},
        };
    },
    onLoad(option) {
        // const hideTitlebar  = needHideTitleBar();
        // if(hideTitlebar) {
        //     uni.setNavigationBarStyle({
        //         navigationStyle: 'custom', // 隐藏默认导航栏
        //     });
        // }

        const { p } = option;
        if (p) {
            const param = JSON.parse(Buffer.from(p, 'base64').toString());
            const { taskId, processInsId } = param;
            if (taskId && processInsId) this.getDetail(taskId, processInsId);
        }
    },
    methods: {
        // 获取任务详情
        getDetail(taskId, processInsId) {
            this.h5bpmn = {
                taskId: taskId,
                processInsId: processInsId,
                token: uni.getStorageSync('accessToken'),
            };
            this.getTaskDetail(taskId, processInsId).then((res) => {
                const { process, form, flow } = res;
                this.process = process;
                const { variables, status } = process;

                if (status == 'todo') {
                    // 查询是否有草稿箱
                    this.initDraft({ taskId })
                        .then((data) => {
                            this.tempVariables = { ...variables };
                            this.recoverDraftShow = true;
                        })
                        .catch(() => {
                            this.form = variables;
                        });
                } else {
                    this.form = variables;
                }

                let { allForm, allAppForm, taskForm, formList } = form;
                if (formList && formList.length > 0) {
                    const options = {
                        menuBtn: false,
                        detail: true,
                        labelPosition: 'top',
                        // labelWidth: 240,
                        group: [],
                    };
                    formList.forEach((f) => {
                        const { content, appContent, taskName, taskKey } = f;
                        // #ifdef H5 || APP
                        const { option } = this.handleResolveOption(eval('(' + content + ')'), taskForm, 'done');
                        // #endif
                        // #ifdef MP
                        const { option } = this.handleResolveOption(JSON.parse(appContent), taskForm, 'done');
                        // #endif
                        options.group.push({
                            label: taskName || taskKey,
                            column: option.column,
                            collapse: allForm ? false : true,
                        });
                    });
                    this.summaryOption = options;
                }
                if (allForm) {
                    // #ifdef H5 || APP
                    const { option, vars } = this.handleResolveOption(eval('(' + allForm + ')'), taskForm, status);
                    // #endif
                    // #ifdef MP
                    const { option, vars } = this.handleResolveOption(JSON.parse(allAppForm), taskForm, status);
                    // #endif
                    option.menuBtn = false;
                    for (let key in variables) {
                        if (this.validateNull(variables[key])) delete variables[key];
                    }
                    // 如果是可行性评估
                    if (process.processDefinitionKey === 'feasibilityAsessment') {
                        option.column?.forEach((_, index) => {
                            if (_.component === 'wf-feasibility') {
                                option.column[index].columns = Array.isArray(process.variables.feaEvaluationConclusion)
                                    ? process.variables.feaEvaluationConclusion
                                    : JSON.parse(process.variables.feaEvaluationConclusion);
                            }
                        });
                    }
                    this.option = {
                        ...option,
                        labelPosition: 'top',
                        // labelWidth: 200,
                    };
                    this.vars = vars;
                }
                if (!this.option.column) this.option.column = [];
                if (process.variables && process.variables.serialNumber) {
                    this.option.column.unshift({
                        label: '流水号',
                        prop: 'serialNumber',
                        span: 24,
                        detail: true,
                    });
                }
                this.waiting = false;
            });
        },
        handleResolveOption(option, taskForm, status) {
            const { column, group } = option;
            let vars = [];
            if (status != 'todo') {
                // 已办，删除字段默认值
                option.detail = true;
                if (column && column.length > 0) {
                    // 处理column
                    column.forEach((col) => this.handleResolveEvent(col));
                }

                if (group && group.length > 0) {
                    // 处理group
                    group.forEach((gro) => {
                        if (gro.column && gro.column.length > 0) {
                            gro.column.forEach((col) => this.handleResolveEvent(col));
                        }
                    });
                }
            } else {
                const columnFilter = this.filterAvueColumn(column, taskForm);
                const columnArr = columnFilter.column;
                vars = columnFilter.vars || [];

                const groupArr = [];
                if (group && group.length > 0) {
                    // 处理group
                    group.forEach((gro) => {
                        const groupFilter = this.filterAvueColumn(gro.column, taskForm);
                        gro.column = groupFilter.column;
                        vars = vars.concat(groupFilter.vars);
                        if (gro.column.length > 0) groupArr.push(gro);
                    });
                }

                option.column = columnArr;
                option.group = groupArr;
            }
            return { option, vars };
        },
        handleResolveEvent(col) {
            const _this = this;
            delete col.value;
            // #ifndef MP
            let event = ['change', 'blur', 'click', 'focus'];
            event.forEach((e) => {
                if (col[e]) col[e] = eval((col[e] + '').replace(/this/g, '_this'));
            });
            if (col.event)
                Object.keys(col.event).forEach(
                    (key) => (col.event[key] = eval((col.event[key] + '').replace(/this/g, '_this')))
                );
            // #endif
            if (col.type == 'dynamic') col.children.column.forEach((cc) => _this.handleResolveEvent(cc));
        },
        // 审核
        handleExamine(pass) {
            this.submitLoading = true;
            const { form, summaryForm } = this.$refs;
            if (form) {
                this.$refs.form.validate((valid, done) => {
                    if (valid) {
                        const variables = {};
                        this.vars.forEach((v) => {
                            if (!this.validateNull(this.form[v])) {
                                variables[v] = this.form[v];
                                if (this.form[`$${v}`]) variables[`$${v}`] = this.form[`$${v}`];
                            }
                        });

                        // 可行性评估提交处理
                        if (this.process.processDefinitionKey === 'feasibilityAsessment') {
                            variables.feaEvaluationConclusion = JSON.stringify(this.form.feaEvaluationConclusion);
                        }

                        this.handleCompleteTask(pass, variables)
                            .then(() => {
                                uni.showToast({
                                    title: '处理成功',
                                });
                                setTimeout(() => {
                                    uni.redirectTo({
                                        url: '/pages/plugin/workflow/pages/mine/index?current=0',
                                    });
                                    done();
                                }, 1000);
                            })
                            .catch(() => {
                                if (typeof done == 'function') done();
                                this.submitLoading = false;
                            });
                    } else {
                        done();
                        this.submitLoading = false;
                    }
                });
            } else if (summaryForm) {
                this.handleCompleteTask(pass, {})
                    .then(() => {
                        uni.showToast({
                            title: '处理成功',
                        });
                        setTimeout(() => {
                            uni.redirectTo({
                                url: '/pages/plugin/workflow/pages/mine/index?current=0',
                            });
                        }, 1000);
                    })
                    .catch(() => {
                        this.submitLoading = false;
                    });
            } else
                uni.showToast({
                    title: '找不到需要提交的表单',
                    icon: 'error',
                });
        },
    },
};
</script>
<style lang="scss" scoped>
@import '../../static/styles/common';
page {
    background: #f6f6f6;
}
.split-line {
    border-bottom: 20rpx solid #f6f6f6;
    min-height: 45px;
}
.detail {
    &-head {
        background: #fff;
        padding: 30rpx;
        .c {
            margin: 0 20rpx;
            .leave {
                color: #333;
                font-size: 34rpx;
            }
            .name {
                color: #666;
                font-size: 30rpx;
            }
        }
    }
    .content {
        padding: 0 0 30rpx;
    }
}
.u-skeleton {
    height: 100vh;
    padding: 30rpx;

    .u-skeleton-circle {
        height: 90rpx;
        width: 90rpx;
        margin-bottom: 30rpx;
    }

    .u-skeleton-fillet {
        height: 100rpx;
        width: 100%;
        margin-bottom: 30rpx;
    }
}
</style>
