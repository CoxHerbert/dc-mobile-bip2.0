<template>
    <view class="home-container">
        仓库
        <view class="scan-container">
            <!-- 输入框，扫码结果填充到这里 -->
            <u-input v-model="qrCodeResult" placeholder="请扫描二维码" />
            <!-- 扫码按钮 -->
            <u-button class="scan-button" @click="handleScan">扫码</u-button>
            <!-- 纯净扫码区域 -->
            <view v-if="isReaderVisible" class="scanner-wrapper">
                <div id="reader"></div>
            </view>
        </view>
    </view>
</template>
<script>
import { defineComponent } from 'vue';
import { Html5Qrcode } from 'html5-qrcode';

export default defineComponent({
    name: 'WorkflowWarehousePage',
    data() {
        return {
            qrCodeResult: '',
            isReaderVisible: false,
            scanner: null,
        };
    },
    beforeUnmount() {
        this.teardownScanner();
    },
    methods: {
        async handleScan() {
            this.isReaderVisible = true;
            this.$nextTick(async () => {
                if (!this.scanner) {
                    this.scanner = new Html5Qrcode('reader');
                }
                try {
                    await this.scanner.start(
                        { facingMode: 'environment' },
                        { fps: 15 },
                        (decodedText) => {
                            this.qrCodeResult = decodedText;
                            this.stopScan();
                        },
                        (error) => {
                            console.log('扫描失败:', error);
                        }
                    );
                } catch (err) {
                    console.error('获取摄像头失败:', err);
                    this.isReaderVisible = false;
                }
            });
        },
        stopScan() {
            if (!this.scanner) {
                this.isReaderVisible = false;
                return;
            }
            this.scanner
                .stop()
                .then(() => {
                    this.isReaderVisible = false;
                })
                .catch((err) => console.error('停止扫码失败:', err));
        },
        teardownScanner() {
            if (this.scanner) {
                try {
                    this.scanner.stop();
                } catch (error) {
                    console.warn('停止扫码异常', error);
                }
                this.scanner.clear();
                this.scanner = null;
            }
        },
    },
});
</script>

<style scoped>
.scan-container {
    display: flex;
    align-items: center;
}

.scan-button {
    background-color: #007bff;
    color: white;
    padding: 8px 12px;
    border-radius: 5px;
}

.scanner-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 99999;
}

#reader {
    width: 100%;
    height: 100%;
}
</style>
