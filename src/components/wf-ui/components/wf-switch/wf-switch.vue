<template>
	<view class="wf-switch">
		<u-switch
			v-model="checked"
			:active-value="activeValue"
			:inactive-value="inactiveValue"
			size="40"
			vibrate-short
			:disabled="disabled"
			@change="onChange"
		></u-switch>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'
export default {
	name: 'wf-switch',
	mixins: [Props],
	watch: {
		text: {
			handler(val) {
				this.initValue()
				this.handleChange(val)
			}
		},
	},
	data() {
		return { checked: false, activeValue: '1', inactiveValue: '0' }
	},
	methods: {
		initValue() {
			const { dicData } = this.column
			if (dicData && dicData.length == 2) {
				this.activeValue = dicData[1].value
				this.inactiveValue = dicData[0].value
			}
			this.checked = this.text == this.activeValue
		},
		onChange(val) {
			this.text = val
		}
	}
}
</script>

<style lang="scss" scoped>
.wf-switch {
	display: flex;
	align-items: center;
}
</style>
