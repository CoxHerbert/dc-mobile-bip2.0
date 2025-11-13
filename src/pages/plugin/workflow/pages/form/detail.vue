<template>
    <div class="workflow-form-detail">
        <van-skeleton v-if="waiting" :row="6" animate />
        <div class="detail" v-else>
            <div class="detail-head flex-between flex-c">
                <div class="detail-avatar" aria-hidden="true">{{ avatarText }}</div>
                <div class="flex-one c">
                    <div class="leave bold txt-cut1">{{ process.processDefinitionName }}</div>
                    <div class="name">{{ process.startUsername }}</div>
                </div>
                <van-tag v-if="process.status === 'todo'" type="success" size="small">审核中</van-tag>
                <van-tag v-else-if="process.status === 'delay'" type="danger" size="small">已超时</van-tag>
                <template v-else-if="process.status === 'done'">
                    <van-tag v-if="process.processIsFinished === 'unfinished'" type="success" size="small">审核中</van-tag>
                    <van-tag v-else-if="process.processIsFinished === 'finished'" type="success" size="small">已结束</van-tag>
                    <van-tag v-else-if="process.processIsFinished === 'terminate'" type="danger" size="small">已终止</van-tag>
                    <van-tag v-else-if="process.processIsFinished === 'withdraw'" type="danger" size="small">已撤销</van-tag>
                    <van-tag v-else-if="process.processIsFinished === 'recall'" type="danger" size="small">已撤回</van-tag>
                    <van-tag v-else-if="process.processIsFinished === 'reject'" type="danger" size="small">已驳回</van-tag>
                    <van-tag v-else-if="process.processIsFinished === 'deleted'" type="danger" size="small">已删除</van-tag>
                </template>
            </div>
            <van-tabs v-model:active="current" :border="false" class="detail-tabs">
                <van-tab v-for="(tab, index) in tabList" :key="tab.name" :title="tab.name" :name="index" />
            </van-tabs>
            <div class="content">
                <div v-show="current === 0" class="detail-card">
                    <div
                        class="split-line"
                        v-if="
                            summaryOption &&
                            ((summaryOption.column && summaryOption.column.length > 0) ||
                                (summaryOption.group && summaryOption.group.length > 0))
                        "
                    >
                        <renderer-compare-panel
                            v-if="enableRendererCompare"
                            v-model="form"
                            :option="summaryOption"
                        ></renderer-compare-panel>
                        <wf-form
                            v-else
                            v-model="form"
                            ref="summaryForm"
                            :option="summaryOption"
                        ></wf-form>
                    </div>
                    <div
                        class="split-line"
                        v-if="option && ((option.column && option.column.length > 0) || (option.group && option.group.length > 0))"
                    >
                        <renderer-compare-panel
                            v-if="enableRendererCompare"
                            v-model="form"
                            :option="option"
                        ></renderer-compare-panel>
                        <wf-form v-else ref="form" v-model="form" :option="option"></wf-form>
                    </div>
                    <div class="split-line" v-if="process.status === 'todo'">
                        <wkf-exam-form
                            ref="examineForm"
                            :process="process"
                            v-model:comment="comment"
                            @user-select="handleUserSelect"
                        ></wkf-exam-form>
                    </div>
                </div>
                <div class="flow-wrapper" v-show="current === 1">
                    <wkf-flow :flow="flow"></wkf-flow>
                </div>
                <WfBpmn v-if="current === 2" :bpmnOption="h5bpmn"></WfBpmn>
            </div>
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
            <van-dialog
                v-model:show="saveDraftShow"
                show-cancel-button
                message="保存至草稿箱并关闭？"
                @confirm="handleDraftSubmit(process.taskId)"
            />
            <van-dialog
                v-model:show="recoverDraftShow"
                show-cancel-button
                message="是否恢复之前保存的草稿？"
                @confirm="handleRevocerDraftSubmit"
                @cancel="form = tempVariables"
            />
        </div>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import { Base64 } from '@/utils/base64.js';
import RendererComparePanel from '@/components/dc/renderer/RendererComparePanel.vue';
import { isRendererTestEnvironment } from '@/utils/env';
import WkfFlow from '../../components/wf-flow/index';
import WfBpmn from '../../components/wf-bpmn/index.vue';
import WkfUserSelect from '../../components/wf-user-select/index';
import WkfButton from '../../components/wf-button/index';
import WkfExamForm from '../../components/wf-exam-form/index';
import exForm from '../../mixins/ex-form';
import draft from '../../mixins/draft';

export default defineComponent({
    name: 'WorkflowFormDetailPage',
    mixins: [exForm, draft],
    components: { WkfFlow, WkfUserSelect, WkfButton, WkfExamForm, WfBpmn, RendererComparePanel },
    data() {
        return {
            process: null,
            form: {},
            option: {},
            vars: [],
            submitLoading: false,
            current: 0,
            tabList: [{ name: '申请信息' }, { name: '流转信息' }, { name: '流转图' }],
            summaryOption: {},
            tempVariables: {},
            h5bpmn: {},
        };
    },
    computed: {
        enableRendererCompare() {
            return isRendererTestEnvironment();
        },
        avatarText() {
            const username = this.process?.startUsername || '';
            if (!username) return '';
            return username.substring(0, 1);
        },
    },
    created() {
        this.resolveRouteParams(this.$route.query);
    },
    watch: {
        '$route.query.p'(value) {
            this.resolveRouteParams({ p: value });
        },
    },
    methods: {
        resolveRouteParams(query = {}) {
            const { p } = query;
            if (!p) return;
            try {
                const param = JSON.parse(Base64.decode(p));
                const { taskId, processInsId } = param;
                if (taskId && processInsId) {
                    this.getDetail(taskId, processInsId);
                }
            } catch (error) {
                console.error('[workflow] 无法解析流程明细参数', error);
            }
        },
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
                                      this.handleNavigateTo({
                                          name: 'WorkflowMine',
                                          query: { current: '0' },
                                          replace: true,
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
                              this.handleNavigateTo({ name: 'WorkflowMine', query: { current: '0' }, replace: true });
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
});
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
.detail-avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90rpx;
    height: 90rpx;
    border-radius: 50%;
    background-color: #fab022;
    color: #fff;
    font-size: 34rpx;
    font-weight: 500;
}

.detail-card {
    background: #fff;
    margin: 20rpx 0;
    padding: 0 0 20rpx;
}

.flow-wrapper {
    padding: 30rpx;
}

.workflow-form-detail {
    min-height: 100vh;
    background: #f6f6f6;
}
</style>
