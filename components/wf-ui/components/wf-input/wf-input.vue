<template>
	<view class="wf-input">
		<u-input
			v-model="text"
			:type="typeDic[column.type]"
			:maxlength="column.maxlength || 350"
			:placeholder="getPlaceholder(column, column.type)"
			:disabled="disabled"
			:height="column.height || '70rpx'"
			:border="column.border || false"
			@click.native="handleClick"
			@focus="handleFocus"
			@blur="handleBlur"
		/>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'
export default {
	name: 'wf-input',
	mixins: [Props],
	data() {
		return {
			typeDic: {
				input: 'text',
				number: 'digit',
				textarea: 'textarea',
				password: 'password'
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.wf-input {
	width: 100%;
}
</style>
