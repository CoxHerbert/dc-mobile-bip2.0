<!-- components/ScanButton/ScanButton.vue -->
<template>
    <view>
        <view @click="handleScan" class="scan-button">
            <view>
                <slot :loading="loading" :scanResult="scanResult">
                    <!-- 默认按钮样式 -->
                    <u-icon size="34" name="scan"></u-icon>
                </slot>
            </view>
            <dc-scan-code ref="h5Scanner" @confirm="handleH5ScanConfirm" @close="handleH5ScanClose" />
        </view>

        <!-- 直接引入dc-scan-code组件实现H5扫码 -->
    </view>
</template>

<script>
import { isEnvironment } from '@/utils/utils';
import { initWwSDK, wwScanQRCode } from '@/utils/wwxsdk';
import { initWxSDK, wxScanQRCode } from '@/utils/wxsdk';
import Api from '@/api';

export default {
    name: 'ScanButton',
    props: {
        // 是否自动处理扫码结果
        autoProcess: {
            type: Boolean,
            default: true,
        },
        // 扫码类型配置
        scanConfig: {
            type: Object,
            default: () => ({
                needResult: 1,
                scanType: ['qrCode', 'barCode'],
            }),
        },
    },
    data() {
        return {
            loading: false,
            scanResult: null,
            sdkInitialized: false,
            showH5Scan: false, // 控制H5扫码组件显示
            h5ScanResolve: null, // H5扫码成功回调
            h5ScanReject: null, // H5扫码失败回调
        };
    },
    mounted() {
        this.initSDK();
    },
    methods: {
        async initSDK() {
            console.log('initSDK开始执行');
            const env = isEnvironment();

            if (env === 'WECHAT_MP') {
                await this.initWechatSDK();
                this.sdkInitialized = true;
            } else if (env === 'WECHAT_ENTERPRISE') {
                await this.initWeworkSDK();
                this.sdkInitialized = true;
            } else {
                this.showH5Scan = true;
                return;
            }
            console.log(this.showH5Scan);
        },

        initWechatSDK() {
            return new Promise((resolve, reject) => {
                const url = window.location.href.split('#')[0];
                Api.common.wechat
                    .getWxConfig(url)
                    .then((res) => {
                        initWxSDK(res.data, resolve, reject);
                        // resolve();
                    })
                    .catch((error) => {
                        console.error('微信SDK初始化失败:', error);
                        reject(error);
                    });
            });
        },

        initWeworkSDK() {
            return new Promise((resolve, reject) => {
                const url = window.location.href.split('#')[0];
                Api.common.wechat
                    .getWwConfig(url)
                    .then((res) => {
                        initWwSDK(res.data, resolve, reject);
                    })
                    .catch((error) => {
                        console.error('企业微信SDK初始化失败:', error);
                        reject(error);
                    });
            });
        },

        async handleScan() {
            console.log('调用扫码方法111');
            const env = isEnvironment();
            console.log('当前环境:', env);
            if (env !== 'normal') {
                if (this.loading || !this.sdkInitialized) return;
            }
            console.log('调用扫码方法');
            this.loading = true;
            this.scanResult = null;

            try {
                const result = await this.performScan();
                this.scanResult = result;

                if (this.autoProcess) {
                    this.$emit('scan-success', result);
                }
            } catch (error) {
                this.$emit('scan-error', error);
            } finally {
                this.loading = false;
            }
        },
        // 取值方法
        performScan() {
            const env = isEnvironment();

            return new Promise((resolve, reject) => {
                if (env === 'WECHAT_MP') {
                    this.wechatScan(resolve, reject);
                } else if (env === 'WECHAT_ENTERPRISE') {
                    this.weworkScan(resolve, reject);
                } else {
                    console.log('H5环境下调用扫码方法');
                    this.h5Scan(resolve, reject);
                }
            });
        },
        // 微信扫码方法
        wechatScan(resolve, reject) {
            wxScanQRCode()
                .then((res) => {
                    const result = res.resultStr || res;
                    resolve(result);
                })
                .catch(reject);
        },
        // 企业微信扫码方法
        weworkScan(resolve, reject) {
            wwScanQRCode()
                .then((result) => {
                    let scanResult = '';

                    if (typeof result === 'string') {
                        scanResult = result;
                    } else if (result.resultStr) {
                        scanResult = result.resultStr;
                    } else if (result.resultString) {
                        scanResult = result.resultString;
                    } else if (result.text) {
                        scanResult = result.text;
                    } else {
                        scanResult = JSON.stringify(result);
                    }

                    resolve(scanResult);
                })
                .catch(reject);
        },
        // H5扫码方法
        h5Scan(resolve, reject) {
            console.log('H5扫码方法调用');

            // 如果组件已经显示，先关闭它
            if (this.showH5Scan) {
                this.showH5Scan = false;
                // 等待组件完全销毁后再重新创建
                this.$nextTick(() => {
                    this.startH5Scan(resolve, reject);
                });
            } else {
                this.startH5Scan(resolve, reject);
            }
        },

        startH5Scan(resolve, reject) {
            // 显示扫码组件
            this.showH5Scan = true;

            // 等待组件创建完成后调用open方法
            this.$nextTick(() => {
                if (this.$refs.h5Scanner) {
                    this.$refs.h5Scanner
                        .open()
                        .then((result) => {
                            console.log('H5扫码成功:', result);
                            this.showH5Scan = false;
                            resolve(result);
                        })
                        .catch((error) => {
                            console.log('H5扫码失败:', error.message);
                            this.showH5Scan = false;
                            reject(error);
                        });
                }
            });
        },

        handleH5ScanConfirm(result) {
            console.log('H5扫码成功:', result);
            // 扫码成功

            // if (this.h5ScanResolve) {
            //     this.h5ScanResolve(result);
            //     this.h5ScanResolve = null;
            //     this.h5ScanReject = null;
            // }
        },

        handleH5ScanClose() {
            // 扫码取消或关闭

            if (this.h5ScanReject) {
                this.h5ScanReject(new Error('用户取消扫码'));
                this.h5ScanResolve = null;
                this.h5ScanReject = null;
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.scan-button {
    display: inline-block;
}
</style>
