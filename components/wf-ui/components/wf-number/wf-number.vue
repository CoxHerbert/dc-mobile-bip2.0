<template>
	<view class="wf-number">
		<u-number-box
			v-model="number"
			:min="column.min || 0"
			:max="column.max || 99999"
			:step="column.step"
			:disabled="disabled"
			:positive-integer="false"
			@click.native="handleClick"
			@focus="handleFocus"
			@blur="handleBlur"
		></u-number-box>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'
export default {
	name: 'wf-number',
	mixins: [Props],
	watch: {
		text: {
			handler(val) {
				this.number = Number(val)
			},
			immediate: true
		},
		number(val) {
			this.text = val
		}
	},
	data() {
		return { number: undefined }
	}
}
</script>

<style lang="scss" scoped>
.wf-number {
}
</style>
