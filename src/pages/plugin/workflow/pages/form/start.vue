<template>
    <div class="workflow-form-start">
        <van-skeleton v-if="waiting" :row="6" animate />
        <div class="wf-form-start" v-else>
            <div class="split-line">
                <renderer-compare-panel
                    v-if="
                        enableRendererCompare &&
                        option &&
                        ((option.column && option.column.length > 0) || (option.group && option.group.length > 0))
                    "
                    v-model="form"
                    :option="option"
                    @submit="handleSubmit"
                >
                    <template #menu>
                        <van-button
                            type="success"
                            size="small"
                            :loading="submitLoading"
                            block
                            @click="handleDraft({ processDefId: process.id, formKey: process.formKey, variables: form })"
                        >
                            存为草稿
                        </van-button>
                    </template>
                </renderer-compare-panel>
                <wf-form
                    v-else-if="
                        option &&
                        ((option.column && option.column.length > 0) || (option.group && option.group.length > 0))
                    "
                    v-model="form"
                    :option="option"
                    @submit="handleSubmit"
                >
                    <template #menu>
                        <van-button
                            type="success"
                            size="small"
                            :loading="submitLoading"
                            block
                            @click="handleDraft({ processDefId: process.id, formKey: process.formKey, variables: form })"
                        >
                            存为草稿
                        </van-button>
                    </template>
                </wf-form>
            </div>
            <div class="split-line">
                <wkf-exam-form
                    v-if="showExamForm"
                    ref="examineForm"
                    :process="process"
                    @user-select="handleUserSelect"
                ></wkf-exam-form>
            </div>

            <wkf-user-select
                ref="user-select"
                :check-type="checkType"
                :default-checked="defaultChecked"
                @onConfirm="handleUserSelectConfirm"
            ></wkf-user-select>
        </div>
        <van-dialog
            v-model:show="saveDraftShow"
            show-cancel-button
            message="保存至草稿箱并关闭？"
            @confirm="handleDraftSubmit"
        />
        <van-dialog
            v-model:show="recoverDraftShow"
            show-cancel-button
            message="是否恢复之前保存的草稿？"
            @confirm="handleRevocerDraftSubmit"
        />
    </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Base64 } from '@/utils/base64.js';
import RendererComparePanel from '@/components/dc/renderer/RendererComparePanel.vue';
import { isRendererTestEnvironment } from '@/utils/env';
import wkfUserSelect from '../../components/wf-user-select/index';
import wkfExamForm from '../../components/wf-exam-form/index';
import exForm from '../../mixins/ex-form';
import draft from '../../mixins/draft';

export default defineComponent({
    name: 'WorkflowFormStartPage',
    mixins: [exForm, draft],
    components: { wkfExamForm, wkfUserSelect, RendererComparePanel },
    computed: {
        showExamForm() {
            const { hideComment, hideCopy, hideExamine } = this.process;
            return !hideComment || !hideCopy || !hideExamine;
        },
        enableRendererCompare() {
            return isRendererTestEnvironment();
        },
    },
    data() {
        return {
            form: {},
            option: {},
            submitLoading: false,
            zcoldValue: {},
        };
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
                const { processId } = param;
                if (processId) {
                    this.getForm(processId);
                }
            } catch (error) {
                console.error('[workflow] 无法解析流程参数', error);
            }
        },
        getForm(processDefId) {
            this.getStartForm(processDefId).then((res) => {
                let { form, appForm, startForm } = res;
                if (form) {
                    // #ifdef H5 || APP
                    const option = { ...eval('(' + form + ')'), labelPosition: 'top' };
                    // #endif
                    // #ifdef MP
                    const option = { ...JSON.parse(appForm), labelPosition: 'top' };
                    // #endif
                    const { column, group } = option;

                    const groupArr = [];
                    const columnArr = this.filterAvueColumn(column, startForm).column;
                    if (group && group.length > 0) {
                        // 处理group
                        group.forEach((gro) => {
                            gro.column = this.filterAvueColumn(gro.column, startForm).column;
                            if (gro.column.length > 0) groupArr.push(gro);
                        });
                    }

                    option.column = columnArr;
                    option.group = groupArr;
                    this.option = option;
                    this.waiting = false;
                    console.log('this.option.column===========>', JSON.parse(JSON.stringify(this.option)));

                    // 查询是否有草稿箱
                    this.initDraft({ processDefId }).then((data) => {
                        this.recoverDraftShow = true;
                    });
                }
            });
        },
        handleSubmit(form, done) {
            this.submitLoading = true;
            form.processId = this.process.id;
            form['wf_platform'] = 'app';
            this.handleStartProcess(form)
                .then(() => {
                    this.handleNavigateTo(
                        { name: 'WorkflowMine', query: { current: '1' }, replace: true },
                        '发起成功'
                    );
                })
                .catch(() => {
                    done();
                    this.submitLoading = false;
                });
        },
    },
});
</script>

<style lang="scss" scoped>
page {
    background: #f6f6f6;
}
.split-line {
    border-bottom: 20rpx solid #f6f6f6;
    min-height: 45px;
}

.workflow-form-start {
    min-height: 100vh;
    background: #f6f6f6;
}
</style>
