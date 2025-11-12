<template>
    <div class="bpmn-container" v-if="urlSrc">
        <web-view :src="urlSrc"></web-view>
        <div class="loading-overlay" v-if="loading">
            <div class="spinner"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'BpmnPreview',

    props: {
        bpmnOption: {
            type: Object,
            default: () => {
                return {};
            },
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
            // process-priview 页面做了特殊的免登录处理
            this.urlSrc =  `${process.env.NODE_ENV === 'development'? 'http://localhost:2888' : 'https://www.eastwinbip.com'}/process-priview?processInsId=${this.bpmnOption.processInsId}&taskId=${this.bpmnOption.taskId}&token=${this.bpmnOption.token}`;
            // this.urlSrc = `${process.env.NODE_ENV === 'development'? 'http://localhost:2888' : 'https://www.eastwinbip.com'}/desk/webviewNfdesign?processInsId=${this.bpmnOption.processInsId}&taskId=${this.bpmnOption.taskId}&token=${this.bpmnOption.token}`;
            setTimeout(() => {
                this.loading = false;
            }, 3000);
        });
    },
    methods: {},
};
</script>

<style scoped>
.bpmn-container {
    position: relative;
    width: 100%;
    height: calc(100vh - 420rpx);
}

.loading-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.8); /* 半透明背景 */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 99;
    background-color: #fff;
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
