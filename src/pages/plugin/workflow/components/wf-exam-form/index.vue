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
              :column="uploadOption"
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
    <div class="wf-exam-form__spacer"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'wf-exam-form',
  props: {
    process: {
      type: Object,
      default: () => ({}),
    },
    comment: String,
  },
  data() {
    return {
      examineForm: { attachment: [] },
      hideComment: false,
      hideAttchment: false,
      hideCopy: false,
      hideExamine: false,
      fileList: [],
      uploadOption: {
        action: '/api/blade-resource/oss/endpoint/put-file',
        propsHttp: {
          res: 'data',
          url: 'link',
          name: 'originalName',
        },
      },
    };
  },
  watch: {
    process: {
      handler(val) {
        const next = val || {};
        this.hideComment = !!next.hideComment;
        this.hideAttchment = !!next.hideComment || !!next.hideAttachment;
        this.hideCopy = !!next.hideCopy;
        this.hideExamine = !!next.hideExamine;
        if (next.copyUser) {
          this.examineForm.copyUser = next.copyUser;
        }
        if (next.copyUserName) {
          this.examineForm.$copyUser = next.copyUserName;
        }
        if (next.assignee) {
          this.examineForm.assignee = next.assignee;
        }
        if (next.assigneeName) {
          this.examineForm.$assignee = next.assigneeName;
        }
      },
      immediate: true,
      deep: true,
    },
    fileList: {
      handler(val) {
        if (Array.isArray(val) && val.length > 0) {
          this.examineForm.attachment = val.map((v) => ({
            name: v.label,
            url: v.value,
          }));
        } else {
          this.examineForm.attachment = [];
        }
      },
      deep: true,
    },
  },
  methods: {
    handleCommentInput() {
      this.$emit('update:comment', this.examineForm.comment);
    },
  },
});
</script>

<style lang="scss" scoped>
.wf-exam-form {
  padding: 0 30rpx;
  background: #fff;
}

.wf-exam-form__spacer {
  height: 150rpx;
  background-color: #f6f6f6;
  margin: 0 -30rpx;
}
</style>
