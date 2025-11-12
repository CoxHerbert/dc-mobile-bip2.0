<template>
	<view class="wf-upload">
		<upload :file-list="fileList" :limit="limit" :disabled="disabled" @remove="onRemove" @choose="onChoose"></upload>
	</view>
</template>

<script>
import { DIC_HTTP_PROPS } from '../../util/variable.js'
import { getAsVal } from '../../util/index.js'

import Props from '../../mixins/props.js'

import upload from './components/upload.vue'

export default {
	name: 'wf-upload',
	mixins: [Props],
	components: { upload },
	computed: {
		action() {
			return this.column.action
		},
		limit() {
			return this.column.limit || Number.MAX_VALUE
		},
		fileSize() {
			return this.column.fileSize || Number.MAX_VALUE
		},
		header() {
			return this.column.header || {}
		},
		formData() {
			return this.column.data || {}
		},
		propsHttp() {
			return { ...DIC_HTTP_PROPS, ...this.column.propsHttp }
		},
		fileName() {
			return this.propsHttp.fileName || "file";
		},
	},
	data() {
		return { fileList: [] }
	},
	methods: {
		initValue() {
			const value = this.deepClone(this.text)
			if (!this.validateNull(value)) {
				let fileList = []
				if (typeof value == 'object') {
					value.forEach(v => {
						if (typeof v == 'object') {
							fileList.push({
								url: v[this.valueKey],
								name: v[this.labelKey],
								progress: 100
							})
						} else if (typeof v == 'string') {
							fileList.push({ url: v, progress: 100 })
						}
					})
				} else if (typeof value == 'string') {
					value.split(',').forEach(v => fileList.push({ url: v, progress: 100 }))
				}
				this.fileList = fileList
			}
		},
		onChoose(list) {
			list.forEach(file => {
				const { path, tempFilePath } = file
				const params = {
					// #ifdef MP-ALIPAY
					fileType: 'image/video/audio', // 仅支付宝小程序，且必填。
					// #endif
					filePath: path || tempFilePath,
					name: this.fileName,
					header: this.header,
					formData: this.formData
				}
				this.$http.upload(this.action, params).then(res => {
					const data = getAsVal(res, this.propsHttp.res)
					const url = getAsVal(data, this.propsHttp.url)
					const name = getAsVal(data, this.propsHttp.name)
					this.$set(this.fileList, this.fileList.length, { url, name, progress: 100 })
					this.onChange()
				})
			})
		},
		onRemove(index) {
			this.$delete(this.fileList, index)
			this.onChange()
		},
		onChange() {
			let arr = []
			if (this.validateNull(this.propsHttp.name) || this.stringMode) {
				this.fileList.forEach(f => {
					if (f.progress == 100) arr.push(f.url)
				})
			} else {
				this.fileList.forEach(f => {
					if (f.progress == 100) arr.push({ [this.labelKey]: f.name, [this.valueKey]: f.url })
				})
			}
			this.text = arr
		}
	}
}
</script>

<style lang="scss" scoped>
.wf-upload {
	width: 100%;
	.attachment {
		color: rgb(41, 121, 255);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
}
</style>
