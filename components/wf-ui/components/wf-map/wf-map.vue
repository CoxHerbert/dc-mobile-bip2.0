<template>
	<view class="wf-map">
		<u-input v-model="address" :placeholder="getPlaceholder(column)" type="text" disabled @click="onClick"></u-input>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'
export default {
	name: 'wf-map',
	mixins: [Props],
	data() {
		return {
			mapId: 'AMap' + Math.round(Math.random() * 999),
			address: '',
			show: false
		}
	},
	mounted() {
		uni.$on(`${this.mapId}`, res => {
			this.text = res
		})
		setTimeout(() => {
			this.show = true
		}, 1000)
	},
	methods: {
		initValue() {
			if (this.text && this.text.length > 0) {
				const arr = (this.text + '').split(',')
				if (arr.length == 3) this.address = arr[2]
			} else this.address = ''
		},
		onClick() {
			if (this.disabled) return
			uni.navigateTo({
				url: `/components/wf-ui/components/wf-map/components/map?mapId=${this.mapId}&val=${this.text + ''}`
			})
		}
	}
}
</script>

<style lang="scss" scoped>
.wf-map {
	width: 100%;
}
</style>
