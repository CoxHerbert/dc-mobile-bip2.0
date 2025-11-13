<template>
  <div class="bpmn-container" v-if="urlSrc">
    <iframe :src="urlSrc" class="bpmn-frame" frameborder="0"></iframe>
    <div class="loading-overlay" v-if="loading">
      <div class="spinner"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'BpmnPreview',
  props: {
    bpmnOption: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      loading: true,
      urlSrc: null,
    };
  },
  mounted() {
    this.$nextTick(() => {
      const baseUrl = import.meta.env.DEV ? 'http://localhost:2888' : 'https://www.eastwinbip.com';
      const { processInsId, taskId, token } = this.bpmnOption || {};
      this.urlSrc = `${baseUrl}/process-priview?processInsId=${processInsId || ''}&taskId=${taskId || ''}&token=${token || ''}`;
      setTimeout(() => {
        this.loading = false;
      }, 3000);
    });
  },
});
</script>

<style scoped>
.bpmn-container {
  position: relative;
  width: 100%;
  height: calc(100vh - 420rpx);
}

.bpmn-frame {
  width: 100%;
  height: 100%;
}

.loading-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
}

.spinner {
  border: 4rpx solid rgba(0, 0, 0, 0.1);
  border-left-color: #007bff;
  border-radius: 50%;
  width: 40rpx;
  height: 40rpx;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
