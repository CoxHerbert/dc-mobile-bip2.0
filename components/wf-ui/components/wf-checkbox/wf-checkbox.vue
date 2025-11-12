<template>
	<view class="wf-checkbox">
		<u-checkbox-group :disabled="disabled" @change="onChange" @click.native="handleClick">
			<u-checkbox v-model="item.checked" v-for="(item, index) in list" :key="index" :name="item[valueKey]">
				{{ item[labelKey] }}
			</u-checkbox>
		</u-checkbox-group>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'
export default {
	name: 'wf-checkbox',
	mixins: [Props],
	watch: {
		dic: {
			handler(val) {
				if (!this.validateNull(val)) this.initValue()
			},
			deep: true
		}
	},
	data() {
		return { list: [] }
	},
	methods: {
		initValue() {
			if (this.validateNull(this.dic)) return
			if (this.text) {
				const valueArr = (this.text + '').split(',')
				this.dic.forEach((v, i) => {
					if (valueArr.find(val => val == v[this.valueKey])) v.checked = true
					else v.checked = false
				})
			}
			this.list = this.deepClone(this.dic)
		},
		onChange(val) {
			this.text = val
		}
	}
}
</script>

<style lang="scss" scoped>
.wf-checkbox {
}
</style>
