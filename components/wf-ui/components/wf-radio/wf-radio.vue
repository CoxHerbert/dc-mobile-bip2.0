<template>
	<view class="wf-radio">
		<u-radio-group v-model="text" :disabled="disabled" @click.native="handleClick">
			<u-radio v-for="(item, index) in dic" :key="index" :name="item[valueKey]">{{ item[labelKey] }}</u-radio>
		</u-radio-group>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'
export default {
	name: 'wf-radio',
	mixins: [Props]
}
</script>

<style lang="scss" scoped>
.wf-radio {
}
</style>
