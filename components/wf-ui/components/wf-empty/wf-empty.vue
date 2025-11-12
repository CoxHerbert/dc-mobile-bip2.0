<template>
	<u-empty
		:mode="mode"
		:text="text"
		:src="src || imageUrl"
		:icon-size="iconSize"
		:margin-top="marginTop || marginTOP"
		:font-size="fontSize"
	></u-empty>
</template>

<script>
export default {
	name: 'wf-empty',
	props: {
		text: { type: String },
		mode: {
			type: String,
			default: () => {
				return 'list'
			}
		},
		src: { type: String },
		iconSize: {
			type: String,
			default: () => {
				return '263'
			}
		},
		marginTop: { type: String },
		fontSize: {
			type: String,
			default: () => {
				return '30'
			}
		}
	},
	data() {
		return { imageUrl: `${this.wfImage}/public/empty.png`, marginTOP: 0 }
	},
	created() {
		const { screenHeight } = uni.getSystemInfoSync()
		if (!this.marginTop) {
			this.marginTOP = screenHeight / 2.5
		}
	}
}
</script>

<style></style>
