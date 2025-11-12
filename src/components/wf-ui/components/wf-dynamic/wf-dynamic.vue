<template>
	<view class="wf-dynamic">
		<u-card
			:head-style="{ padding: '16rpx 30rpx' }"
			:body-style="{ padding: 0 }"
			margin="0 0 30rpx 0"
			v-if="text && text.length == 0"
		>
			<view class="head" slot="head">
				<view class="title">#1</view>
				<view class="add-btn" @click="handleAddRow" v-if="option.addBtn && !disabled">
					<u-icon name="plus"></u-icon>
					<text>添加</text>
				</view>
			</view>
		</u-card>
		<block v-for="(item, index) in text" :key="index" v-else>
			<u-card
				:head-style="{ padding: '16rpx 30rpx' }"
				:body-style="{ padding: 0 }"
				:foot-style="{ padding: '20rpx 30rpx' }"
				:key="index"
				margin="0 0 30rpx 0"
			>
				<view class="head" slot="head">
					<view class="title">#{{ index + 1 }}</view>
					<view class="add-btn" @click="handleAddRow" v-if="option.addBtn && !disabled">
						<u-icon name="plus"></u-icon>
						<text>添加</text>
					</view>
				</view>
				<view slot="body">
					<!-- #ifdef MP -->
					<wf-form
						ref="main"
						v-model="text[index]"
						:option="{ labelPosition: 'top', disabled: disabled, dynamicIndex: index, ...option }"
						@label-change="handleLabelChange"
					></wf-form>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<wkf-form
						ref="main"
						v-model="text[index]"
						:option="{ labelPosition: 'top', disabled: disabled, dynamicIndex: index, ...option }"
						@label-change="handleLabelChange"
					></wkf-form>
					<!-- #endif -->
				</view>
				<view class="head" slot="foot" v-if="!disabled">
					<u-button
						v-if="option.addBtn"
						plain
						type="primary"
						size="medium"
						:custom-style="{ width: '45%' }"
						@click="handleAddRow"
					>
						添 加
					</u-button>
					<u-button
						v-if="option.delBtn"
						plain
						type="error"
						size="medium"
						:custom-style="{ width: '45%' }"
						@click="handleDelRow(index)"
					>
						删 除
					</u-button>
				</view>
			</u-card>
		</block>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'
// #ifdef APP
import WkfForm from '../wkf-form/wkf-form.vue'
// #endif
export default {
	name: 'wf-dynamic',
	// #ifdef H5
	components: { WkfForm: () => import('../wf-form/wf-form.vue') },
	// #endif
	// #ifdef APP
	components: { WkfForm },
	// #endif
	mixins: [Props],
	computed: {
		option() {
			return this.column.children
		}
	},
	methods: {
		handleAddRow() {
			this.text.push({})
		},
		handleDelRow(index) {
			this.$delete(this.text, index)
		},
		handleLabelChange({ prop, value, index }) {
			this.$set(this.text[index], `$${prop}`, value)
		}
	}
}
</script>

<style lang="scss" scoped>
.wf-dynamic {
	width: 690rpx;
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	.add-btn {
		color: #4b9eff;
	}
}
</style>
