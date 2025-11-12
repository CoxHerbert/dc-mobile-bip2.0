<template>
	<view class="wf-sign">
		<image
			v-if="text"
			:src="text"
			style="width: 700rpx; height: 350rpx"
			@click="handlePreview"
		></image>
		<button
			v-if="!disabled"
			class="wf-sign__button"
			:style="{ 'background-color': '#007aff', color: '#fff' }"
			type="default"
			size="mini"
			@click="handleSign"
		>
			签名
		</button>
		<signature-pad
			v-if="!disabled"
			ref="signature"
		></signature-pad>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'
import SignaturePad from './components/signature.vue'

import { DIC_HTTP_PROPS } from '../../util/variable.js'
import { getAsVal } from '../../util/index.js'

export default {
	name: 'wf-sign',
	mixins: [Props],
	components: { SignaturePad },
	computed: {
		options() {
			return this.column.options
		},
		action() {
			return this.column.action
		},
		penColor() {
			return this.options ? this.options.penColor || '#000' : '#000'
		},
		propsHttp() {
			return { ...DIC_HTTP_PROPS, ...this.column.propsHttp }
		},
		fileName() {
			return this.propsHttp.fileName || 'file'
		}
	},
	data() {
		return {
			signId: `nf-sign-${Date.now() + Math.ceil(Math.random() * 999)}`
		}
	},
	methods: {
		handleSign() {
			this.$refs.signature
				.sign({
					width: '700rpx',
					height: '350rpx',
					color: this.penColor
				})
				.then((path) => {
					this.httpUpload({
						file: path
					})
						.then((url) => {
							this.text = url
						})
						.catch(() => {
							this.text = path
						})
				})
				.catch((e) => {})
		},
		handlePreview() {
			if (!this.text) return
			uni.previewImage({
				urls: [this.text]
			})
		},
		httpUpload(config) {
			return new Promise((resolve, reject) => {
				if (!this.action) {
					let message = '未配置上传地址，保存为base64'
					const tag = sessionStorage.getItem(this.signId)
					if (!tag) {
						uni.showToast({
							title: message,
							icon: 'none',
							position: 'bottom'
						})
						sessionStorage.setItem(this.signId, 1)
					}
					reject()
					return
				}
				const params = {
					// #ifdef MP-ALIPAY
					fileType: 'image', // 仅支付宝小程序，且必填。
					// #endif
					filePath: config.file,
					name: this.fileName
				}

				this.$http
					.upload(this.action, params)
					.then((res) => {
						const data = getAsVal(res, this.propsHttp.res || 'data')
						const url = getAsVal(data, this.propsHttp.url)
						if (url) {
							resolve(url)
						} else {
							reject()
						}
					})
					.catch(() => {
						reject()
					})
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.wf-sign {
	&__button {
		height: 60rpx;
	}
}
</style>
