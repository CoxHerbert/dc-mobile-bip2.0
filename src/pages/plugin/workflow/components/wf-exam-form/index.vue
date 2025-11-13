<template>
    <div class="wf-exam-form">
        <van-form class="wf-form">
            <van-cell-group inset>
                <van-field
                    v-if="!hideComment"
                    class="wf-form-field"
                    label="批复意见："
                    label-width="150"
                    type="textarea"
                    autosize
                    v-model="examineForm.comment"
                    placeholder="批复意见"
                    @update:model-value="handleCommentInput"
                />
                <van-field v-if="!hideAttchment" class="wf-form-field" label="附件：" label-width="150">
                    <template #input>
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
                    </template>
                </van-field>
                <van-field
                    v-if="!hideCopy"
                    class="wf-form-field"
                    label="抄送人："
                    label-width="150"
                    v-model="examineForm.$copyUser"
                    placeholder="请选择 抄送人"
                    readonly
                    clickable
                    @click="$emit('user-select', { type: 'copy', checkType: 'checkbox' })"
                />
                <van-field
                    v-if="!hideExamine"
                    class="wf-form-field"
                    label="指定审批人："
                    label-width="150"
                    v-model="examineForm.$assignee"
                    placeholder="如不选择则使用默认处理人，驳回时无效。多选时若下一节点为多实例则按选择顺序赋值，若不是择只有第一个生效。"
                    readonly
                    clickable
                    @click="$emit('user-select', { type: 'assignee', checkType: 'checkbox' })"
                />
            </van-cell-group>
        </van-form>
        <div style="height: 150rpx; background-color: #f6f6f6; margin: 0 -30rpx"></div>
    </div>
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
    methods: {
        handleCommentInput() {
            this.$emit('update:comment', this.examineForm.comment);
        },
    },
};
</script>

<style lang="scss" scoped>
.wf-exam-form {
    padding: 0 30rpx;
    background: #fff;
}
</style>
