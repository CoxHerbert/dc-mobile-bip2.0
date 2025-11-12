<template>
	<u-popup v-model="show" mode="top" :closeable="true" height="100%" width="100%" @close="handleManualClose">
		<view class="scan-code">
			<view id="reader"></view>
			<u-button class="btn" type="success" @click="handleManualClose">关闭</u-button>
		</view>
	</u-popup>
</template>

<script>
	import {
		Html5Qrcode
	} from 'html5-qrcode';

	export default {
		name: 'dc-scan-code',
		data() {
			return {
				loading: false,
				scanResult: '',
				show: false,
				scanner: null,
				scanning: false,
				resolveFn: null,
				rejectFn: null,
				wxSdkServicecode: null
			};
		},
		mounted() {
			
		},
		methods: {

			/**
			 * 打开扫码，返回 Promise
			 */
			open() {
				return new Promise((resolve, reject) => {
					this.resolveFn = resolve;
					this.rejectFn = reject;
					this.show = true;
					this.$nextTick(() => {
						this.startScan();
					});
				});
				// if (!this.wxSdkServicecode.isInWechatEnv()) {
				// 	console.log('----H5');
				// 	return new Promise((resolve, reject) => {
				// 		this.resolveFn = resolve;
				// 		this.rejectFn = reject;
				// 		this.show = true;
				// 		this.$nextTick(() => {
				// 			this.startScan();
				// 		});
				// 	});
				// }else{
				// 	console.log(this.wxSdkServicecode.scanQRCode())
				// 	return this.wxSdkServicecode.scanQRCode()

				// }

			},

			/**
			 * 开始扫码
			 */
			startScan() {
				if (this.scanning) return;
				if (!this.scanner) {
					this.scanner = new Html5Qrcode('reader');
				}

				this.scanner
					.start({
							facingMode: 'environment'
						}, {
							fps: 15,
							qrbox: 250,
						},
						(code) => {
							if (!this.scanning) return;
							this.scanning = false;
							this.stopScan();
							this.resolveFn?.(code); // 返回扫码结果
							this.cleanup();
						},
						(error) => {
							console.debug('扫描失败:', error);
						}
					)
					.then(() => {
						this.scanning = true;
					})
					.catch((err) => {
						console.error('摄像头启动失败:', err);
						this.rejectFn?.(err);
						this.cleanup();
					});
			},

			/**
			 * 停止扫码
			 */
			stopScan() {
				if (this.scanner && this.scanning) {
					this.scanner.stop().catch((err) => {
						console.error('停止扫码失败:', err);
					});
				}
				this.scanning = false;
			},

			/**
			 * 手动关闭（点击按钮或关闭弹窗）
			 */
			handleManualClose() {
				this.stopScan();
				this.rejectFn?.(new Error('用户取消扫码'));
				this.cleanup();
			},

			/**
			 * 清理状态
			 */
			cleanup() {
				this.show = false;
				this.resolveFn = null;
				this.rejectFn = null;
			},
		},
		beforeDestroy() {
			this.stopScan();
		},
	};
</script>

<style lang="scss" scoped>
	.scan-code {
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.7);

		#reader {
			width: 100%;
			height: calc(100% - 50px);
		}

		.btn {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			border-radius: 0;
			z-index: 10000;
		}
	}
</style>