<template>
	<view class="wf-select">
		<u-input v-model="textLabel" type="select" :placeholder="getPlaceholder(column, column.type)" @click="onClick" />
		<u-select
			v-model="show"
			:list="dic"
			mode="single-column"
			:label-name="labelKey"
			:value-name="valueKey"
			:child-name="childrenKey"
			:title="column.label"
			@confirm="handleSubmit"
		></u-select>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'
export default {
	name: 'wf-select',
	mixins: [Props],
	watch: {
		dic: {
			handler(val) {
					if (!this.validateNull(val)) this.initTextLabel()
			},
			deep: true
		}
	},
	data() {
		return {
			defaultValue: [],
			show: false
		}
	},
	methods: {
		onClick() {
			if (!this.disabled) this.show = true
			this.handleClick()
		},
		handleSubmit(data) {
			const text = []
			const textLabel = []
			data.forEach(d => {
				text.push(d['value'])
				textLabel.push(d['label'] || '')
			})
			this.$set(this, 'text', text.join(','))
			this.$set(this, 'textLabel', textLabel.join(','))
			this.$emit('label-change', textLabel.join(','))
		}
	}
}
</script>

<style lang="scss" scoped>
.wf-select {
	width: 100%;
}
</style>
