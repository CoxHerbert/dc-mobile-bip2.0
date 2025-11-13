<template>
  <div>
    <div class="wf-button safe-area-inset-bottom" v-if="process.status === 'todo'">
      <div class="wf-button-left">
        <van-button
          v-if="getButton('wf_pass')"
          size="small"
          :loading="loading"
          type="primary"
          @click="$emit('examine', true)"
        >
          <span v-if="['recall', 'reject'].includes(process.processIsFinished)">重新提交</span>
          <span v-else>{{ getButton('wf_pass').name }}</span>
        </van-button>
        <van-button
          v-if="getButton('wf_reject')"
          size="small"
          :loading="loading"
          type="danger"
          @click="$emit('examine', false)"
        >
          <span v-if="nodeList.length > 1">{{ getButton('wf_reject').name }}</span>
          <span v-else>取消申请</span>
        </van-button>
      </div>
      <div class="wf-button-right" v-if="buttonList.length > 2">
        <wf-popover
          :show="moreBtnShow"
          position="absolute"
          direction="bottom"
          width="200rpx"
          right="30rpx"
          top="-20rpx"
          translateY="-100%"
          triangleRight="100rpx"
          triangleBottom="-22rpx"
          backgroundColor="#eee"
          @close="moreBtnShow = false"
        >
          <div class="menu-item" @click="handleOperate('draft')">暂存</div>
          <div v-if="getButton('wf_transfer')" class="menu-item" @click="handleOperate('transfer')">
            {{ getButton('wf_transfer').name }}
          </div>
          <div v-if="getButton('wf_delegate')" class="menu-item" @click="handleOperate('delegate')">
            {{ getButton('wf_delegate').name }}
          </div>
          <div v-if="getButton('wf_rollback')" class="menu-item" @click="handleRollback">
            {{ getButton('wf_rollback').name }}
          </div>
          <div v-if="getButton('wf_terminate')" class="menu-item" @click="modalShow = true">
            {{ getButton('wf_terminate').name }}
          </div>
          <div
            v-if="process.isMultiInstance && getButton('wf_add_instance')"
            class="menu-item"
            @click="handleOperate('addInstance')"
          >
            {{ getButton('wf_add_instance').name }}
          </div>
        </wf-popover>
        <van-button size="small" :loading="loading" type="default" @click="moreBtnShow = !moreBtnShow">
          更多操作
        </van-button>
      </div>
    </div>
    <div
      class="wf-button safe-area-inset-bottom"
      v-if="process.status === 'done' && process.isOwner && process.isReturnable"
    >
      <div class="wf-button-center">
        <van-button
          v-if="process.isOwner && process.isReturnable"
          size="small"
          :loading="loading"
          type="warning"
          @click="handleWithdraw('start')"
        >
          撤回
        </van-button>
        <van-button
          v-if="process.isOwner && process.isReturnable"
          size="small"
          :loading="loading"
          type="danger"
          @click="handleWithdraw('end')"
        >
          撤销
        </van-button>
      </div>
    </div>
    <div style="height: 110rpx"></div>
    <van-action-sheet
      v-model:show="actionSheetVisible"
      :actions="nodeList"
      cancel-text="取消"
      description="选择要退回到的节点"
      @select="handleNodeSelect"
      close-on-click-action
    />
    <van-dialog
      v-model:show="modalShow"
      show-cancel-button
      title="警告"
      message="确定要终止此流程吗？"
      @confirm="handleTerminate"
    />
    <van-dialog
      v-model:show="withdrawModalShow"
      show-cancel-button
      title="警告"
      :message="withdrawContent"
      @confirm="$emit('withdraw', withdrawType)"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { Toast } from 'vant';
import { getBackNodes } from '../../api/task.js';

export default defineComponent({
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    buttonList: {
      type: Array,
      default: () => [],
    },
    process: {
      type: Object,
      default: () => ({}),
    },
    comment: String,
  },
  data() {
    return {
      moreBtnShow: false,
      actionSheetVisible: false,
      nodeList: [],
      modalShow: false,
      withdrawModalShow: false,
      withdrawContent: '',
      withdrawType: '',
    };
  },
  watch: {
    'process.taskId': {
      handler(val) {
        if (val) {
          getBackNodes({ taskId: val }).then((res) => {
            this.nodeList = (res.data || []).map((d) => ({ name: d.nodeName, nodeId: d.nodeId }));
          });
        }
      },
      immediate: true,
    },
  },
  methods: {
    getButton(type) {
      return this.buttonList.find((btn) => btn.code === type);
    },
    handleRollback() {
      if (!this.comment) {
        Toast({ message: '请填写批复意见', type: 'fail' });
        return;
      }
      this.moreBtnShow = false;
      if (this.nodeList.length === 0) {
        Toast({ message: '查询不到可退回的节点', type: 'fail' });
      } else {
        this.actionSheetVisible = true;
      }
    },
    handleNodeSelect(action) {
      this.moreBtnShow = false;
      if (action && action.nodeId) {
        this.$emit('rollback', action.nodeId);
      }
    },
    handleOperate(type) {
      this.moreBtnShow = false;
      switch (type) {
        case 'transfer':
          this.$emit('transfer');
          break;
        case 'delegate':
          this.$emit('delegate');
          break;
        case 'addInstance':
          this.$emit('add-instance');
          break;
        case 'draft':
          this.$emit('draft');
          break;
        default:
          break;
      }
    },
    handleTerminate() {
      this.$emit('terminate');
    },
    handleWithdraw(type) {
      this.withdrawType = type;
      this.withdrawContent = type === 'start' ? '确定要撤回此流程吗？' : '确定要撤销此流程吗？';
      this.withdrawModalShow = true;
    },
  },
});
</script>

<style lang="scss" scoped>
.wf-button {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20rpx 30rpx;
  background: #fff;
  box-shadow: 0 -6rpx 20rpx rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
}

.wf-button-left,
.wf-button-right,
.wf-button-center {
  display: flex;
  gap: 20rpx;
  align-items: center;
}

.menu-item {
  padding: 20rpx;
  font-size: 26rpx;
  color: #222;
}

.menu-item + .menu-item {
  border-top: 1px solid #eee;
}
</style>
