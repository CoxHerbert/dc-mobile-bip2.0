<template>
	<view class="wf-rate">
		<u-rate
			v-model="text"
			:count="column.max || 5"
			:colors="column.colors"
			:disabled="disabled"
			min-count="1"
		></u-rate>
		<span v-if="column.showText && column.texts && column.texts[text - 1]" class="wf-rate__text">
			{{ column.texts[text - 1] }}
		</span>
		<span v-else-if="column.showScore && !column.showText" class="wf-rate__text">{{ text }}</span>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'
export default {
	name: 'wf-rate',
	mixins: [Props],
	data() {
		return { text: 0 }
	}
}
</script>

<style lang="scss" scoped>
.wf-rate {
	&__text {
		margin-left: 15rpx;
	}
}
</style>
