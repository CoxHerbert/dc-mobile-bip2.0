<template>
    <view class="wf-exam-form">
        <u-form class="wf-form" :model="examineForm">
            <u-form-item label="批复意见：" label-width="150" label-position="top" v-if="!hideComment">
                <u-input
                    type="textarea"
                    v-model="examineForm.comment"
                    height="70rpx"
                    placeholder="批复意见"
                    @input="$emit('update:comment', examineForm.comment)"
                />
            </u-form-item>
            <u-form-item label="附件：" label-width="150" label-position="top" v-if="!hideAttchment">
                <wf-upload
                    v-model="fileList"
                    :column="{
                        action: '/api/blade-resource/oss/endpoint/put-file',
                        propsHttp: {
                            res: 'data',
                            url: 'link',
                            name: 'originalName',
                        },
                    }"
                    :disabled="false"
                ></wf-upload>
            </u-form-item>
            <u-form-item label="抄送人：" label-width="150" label-position="top" v-if="!hideCopy">
                <u-input
                    disabled
                    v-model="examineForm.$copyUser"
                    placeholder="请选择 抄送人"
                    @click="$emit('user-select', { type: 'copy', checkType: 'checkbox' })"
                />
            </u-form-item>
            <u-form-item label="指定审批人：" label-width="150" label-position="top" v-if="!hideExamine">
                <u-input
                    disabled
                    v-model="examineForm.$assignee"
                    placeholder="如不选择则使用默认处理人，驳回时无效。多选时若下一节点为多实例则按选择顺序赋值，若不是择只有第一个生效。"
                    @click="$emit('user-select', { type: 'assignee', checkType: 'checkbox' })"
                />
            </u-form-item>
        </u-form>
        <view style="height: 150rpx; background-color: #f6f6f6; margin: 0 -30rpx"></view>
    </view>
</template>

<script>
export default {
    name: 'wf-exam-form',
    props: {
        process: {
            type: Object,
            default: () => {
                return {};
            },
        },
        comment: String,
    },
    watch: {
        process: {
            handler(val) {
                if (!val) return;
                if (val.hideComment) this.hideComment = true;
                if (val.hideComment || val.hideAttachment) this.hideAttchment = true;
                if (val.hideCopy) this.hideCopy = true;
                if (val.hideExamine) this.hideExamine = true;
                if (val.copyUser) this.$set(this.examineForm, 'copyUser', val.copyUser);
                if (val.copyUserName) this.$set(this.examineForm, '$copyUser', val.copyUserName);
            },
            deep: true,
            immediate: true,
        },
        fileList: {
            handler(val) {
                if (val && val.length > 0) {
                    this.$set(
                        this.examineForm,
                        'attachment',
                        val.map((v) => {
                            return {
                                name: v.label,
                                url: v.value,
                            };
                        })
                    );
                }
            },
            deep: true,
        },
    },
    data() {
        return {
            examineForm: { attachment: [] },
            hideComment: false,
            hideAttchment: false,
            hideCopy: false,
            hideExamine: false,
            fileList: [],
        };
    },
};
</script>
<style lang="scss" scoped>
.wf-exam-form {
    padding: 0 30rpx;
    background: #fff;
}
</style>
