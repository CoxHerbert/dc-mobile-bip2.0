<template>
    <view>
        <u-skeleton :loading="waiting" :animation="true"></u-skeleton>
        <view class="u-skeleton" v-if="waiting">
            <u-loading mode="flower"></u-loading>
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
        <view class="wf-form-start" v-else>
            <view class="split-line">
                <wf-form
                    v-if="
                        option &&
                        ((option.column && option.column.length > 0) || (option.group && option.group.length > 0))
                    "
                    v-model="form"
                    :option="option"
                    @submit="handleSubmit"
                >
                    <template #menu>
                        <u-button <!-- #ifdef MP -->
                            :custom-style="{ width: '320rpx'}"
                            <!-- #endif -->
                            type="success" size="medium" :loading="submitLoading" @click="handleDraft({ processDefId:
                            process.id, formKey: process.formKey, variables: form })" > 存为草稿
                        </u-button>
                    </template>
                </wf-form>
            </view>
            <view class="split-line">
                <wkf-exam-form
                    v-if="showExamForm"
                    ref="examineForm"
                    :process="process"
                    @user-select="handleUserSelect"
                ></wkf-exam-form>
            </view>

            <!-- 选人 -->
            <wkf-user-select
                ref="user-select"
                :check-type="checkType"
                :default-checked="defaultChecked"
                @onConfirm="handleUserSelectConfirm"
            ></wkf-user-select>
        </view>
        <!-- 保存至草稿箱 -->
        <u-modal
            v-model="saveDraftShow"
            content="保存至草稿箱并关闭？"
            show-cancel-button
            @confirm="handleDraftSubmit"
        ></u-modal>
        <!-- 恢复草稿箱 -->
        <u-modal
            v-model="recoverDraftShow"
            content="是否恢复之前保存的草稿？"
            show-cancel-button
            @confirm="handleRevocerDraftSubmit"
        ></u-modal>
    </view>
</template>

<script>
import wkfUserSelect from '../../components/wf-user-select/index';
import wkfExamForm from '../../components/wf-exam-form/index';
import exForm from '../../mixins/ex-form';
import draft from '../../mixins/draft';
// import { needHideTitleBar } from '@/utils/utils';
export default {
    name: 'wf-form-start',
    mixins: [exForm, draft],
    components: { wkfExamForm, wkfUserSelect },
    computed: {
        showExamForm() {
            const { hideComment, hideCopy, hideExamine } = this.process;
            return !hideComment || !hideCopy || !hideExamine;
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
            const { processId } = param;
            if (processId) this.getForm(processId);
        }
    },

    methods: {
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
			console.log(done)
            this.submitLoading = true;
            form.processId = this.process.id;
            form['wf_platform'] = 'app';
            this.handleStartProcess(form)
                .then(() => {
                    this.handleNavigateTo('/pages/plugin/workflow/pages/mine/index?current=1', '发起成功');
                })
                .catch(() => {
                    done();
                    this.submitLoading = false;
                });
        },
    },
};
</script>

<style lang="scss" scoped>
page {
    background: #f6f6f6;
}
.split-line {
    border-bottom: 20rpx solid #f6f6f6;
    min-height: 45px;
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
