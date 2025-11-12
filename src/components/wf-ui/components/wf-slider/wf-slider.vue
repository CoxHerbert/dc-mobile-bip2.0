<template>
	<view class="wf-slider">
		<u-slider
			:value="startValue"
			:endValue="endValue"
			:section="column.range"
			:disabled="disabled"
			@change="onChange"
		></u-slider>
		<span class="wf-slider__text">{{ showText }}</span>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'

import Slider from './components/slider'

export default {
	name: 'wf-slider',
	mixins: [Props],
	components: { 'u-slider': Slider },
	watch: {
		text: {
			handler(val) {
				this.initValue()
				this.handleChange(val)
			}
		}
	},
	computed: {
		showText() {
			if (typeof this.text == 'object') return this.text.join(',')
			else return this.text
		}
	},
	data() {
		return { text: 0, startValue: 0, endValue: 0 }
	},
	methods: {
		initValue() {
			const value = (this.text + '').split(',')
			if (this.column.range) this.endValue = Number(value[1]) || 0
			this.startValue = Number(value[0]) || 0
		},
		onChange({ value, endValue }) {
			if (!value) return
			if (this.column.range) this.text = [value, endValue]
			else this.text = value
		}
	}
}
</script>

<style lang="scss" scoped>
.wf-slider {
	display: flex;
	align-items: center;
	&__text {
		margin-left: 20rpx;
	}
}
</style>
