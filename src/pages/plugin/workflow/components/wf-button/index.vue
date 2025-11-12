<template>
	<view>
		<view class="wf-button safe-area-inset-bottom" v-if="process.status == 'todo'">
			<view class="wf-button-left">
				<u-button
					v-if="getButton('wf_pass')"
					size="medium"
					:disabled="loading"
					hover-class="none"
					type="primary"
					@click="$emit('examine', true)"
				>
					<span v-if="['recall', 'reject'].includes(process.processIsFinished)">重新提交</span>
					<span v-else>{{ getButton('wf_pass').name }}</span>
				</u-button>
				<u-button
					v-if="getButton('wf_reject')"
					size="medium"
					:disabled="loading"
					hover-class="none"
					type="error"
					@click="$emit('examine', false)"
				>
					<span v-if="nodeList.length > 1">{{ getButton('wf_reject').name }}</span>
					<span v-else>取消申请</span>
				</u-button>
			</view>
			<view class="wf-button-right" v-if="buttonList.length > 2">
				<wf-popover
					:show="moreBtnShow"
					position="absolute"
					direction="bottom"
					width="200rpx"
					right="30rpx"
					top="-20rpx"
					translateY="-100%"
					triangleRight="100rpx"
					triangleBottom="-22rpx"
					backgroundColor="#eee"
					@close="moreBtnShow = false"
				>
					<view class="menu-item" @click.native="handleOperate('draft')">
						暂存
					</view>
					<view v-if="getButton('wf_transfer')" class="menu-item" @click.native="handleOperate('transfer')">
						{{ getButton('wf_transfer').name }}
					</view>
					<view v-if="getButton('wf_delegate')" class="menu-item" @click.native="handleOperate('delegate')">
						{{ getButton('wf_delegate').name }}
					</view>
					<view v-if="getButton('wf_rollback')" class="menu-item" @click.native="handleRollback">
						{{ getButton('wf_rollback').name }}
					</view>
					<view v-if="getButton('wf_terminate')" class="menu-item" @click.native="modalShow = true">
						{{ getButton('wf_terminate').name }}
					</view>
					<view
						v-if="process.isMultiInstance && getButton('wf_add_instance')"
						class="menu-item"
						@click.native="handleOperate('addInstance')"
					>
						{{ getButton('wf_add_instance').name }}
					</view>
				</wf-popover>
				<u-button
					size="medium"
					:disabled="loading"
					:hair-line="false"
					hover-class="none"
					type="info"
					@click="moreBtnShow = !moreBtnShow"
				>
					更多操作
				</u-button>
			</view>
		</view>
		<view class="wf-button safe-area-inset-bottom" v-if="process.status == 'done' && process.isOwner && process.isReturnable">
			<view class="wf-button-center">
				<u-button
					v-if="process.isOwner && process.isReturnable"
					size="medium"
					:disabled="loading"
					hover-class="none"
					type="warning"
					@click="handleWithdraw('start')"
				>
					撤回
				</u-button>
				<u-button
					v-if="process.isOwner && process.isReturnable"
					size="medium"
					:disabled="loading"
					hover-class="none"
					type="error"
					@click="handleWithdraw('end')"
				>
					撤销
				</u-button>
			</view>
		</view>
		<!-- 占位符 -->
		<view style="height: 110rpx"></view>
		<u-action-sheet
			:list="nodeList"
			:tips="{ text: '选择要退回到的节点' }"
			@click="handleNodeClick"
			v-model="show"
			safe-area-inset-bottom
		></u-action-sheet>
		<u-modal
			v-model="modalShow"
			show-cancel-button
			title="警告"
			content="确定要终止此流程吗？"
			@confirm="handleTerminate"
		></u-modal>
		<u-modal
			v-model="withdrawModalShow"
			show-cancel-button
			title="警告"
			:content="withdrawContent"
			@confirm="$emit('withdraw', withdrawType)"
		></u-modal>
	</view>
</template>
<script>
import { getBackNodes } from '../../api/task.js'

export default {
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		buttonList: {
			type: Array,
			default: () => {
				return []
			}
		},
		process: {
			type: Object,
			default: () => {
				return {}
			}
		},
		comment: String
	},
	watch: {
		'process.taskId': {
			handler(val) {
				if (val) {
					getBackNodes({ taskId: val }).then(res => {
						this.nodeList = res.data.map(d => {
							return { text: d.nodeName, nodeId: d.nodeId }
						})
					})
				}
			},
			immediate: true
		}
	},
	data() {
		return {
			moreBtnShow: false,
			show: false,
			nodeList: [],
			modalShow: false,
			withdrawModalShow: false,
			withdrawContent: '',
			withdrawType: ''
		}
	},
	methods: {
		handleRollback() {
			if (!this.comment) {
				uni.showToast({
					title: '请填写批复意见',
					icon: 'none'
				})
				return
			}
			this.moreBtnShow = false
			const { taskId } = this.process
			if (this.nodeList.length == 0)
				uni.showToast({
					title: '查询不到可退回的节点',
					icon: 'none'
				})
			else this.show = true
		},
		handleNodeClick(index) {
			this.moreBtnShow = false
			const { nodeId } = this.nodeList[index]
			this.$emit('rollback', nodeId)
		},
		handleOperate(type) {
			this.moreBtnShow = false
			switch (type) {
				case 'transfer':
					this.$emit('user-select', { type: 'transfer', checkType: 'radio' })
					break
				case 'delegate':
					this.$emit('user-select', { type: 'delegate', checkType: 'radio' })
					break
				case 'addInstance':
					this.$emit('user-select', { type: 'addInstance', checkType: 'checkbox' })
					break
				case 'draft':
					this.$emit('draft')
					break
			}
		},
		handleTerminate() {
			if (!this.comment) {
				uni.showToast({
					title: '请填写批复意见',
					icon: 'none'
				})
				return
			}
			this.moreBtnShow = false
			this.$emit('terminate')
		},
		handleWithdraw(type) {
			if ('start' === type) this.withdrawContent = '确定要撤回重新提交吗？若当前流程无发起人节点，效果同撤销。'
			else this.withdrawContent = '确定要撤销此流程吗？'
			this.withdrawType = `wf_withdraw_${type}`
			this.withdrawModalShow = true
		},
		getButton(key) {
			return this.buttonList.find(b => b.buttonKey == key)
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../../static/styles/common';
.wf-button {
	width: 100%;
	/* #ifdef H5 */
	height: 100rpx;
	/* #endif */
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	z-index: 9999;
	border-top: 2rpx solid #f0f2f5;
	background: #fff;
	display: flex;
	justify-content: space-between;
	align-items: center;
	/* #ifdef MP */
	padding-top: 10rpx;
	/* #endif */
	.wf-button-center {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}

	.wf-button-left {
		width: 100%;
		display: flex;
		justify-content: space-around;
		.u-btn {
			max-width: 220rpx;
			overflow: hidden !important;
		}
	}
	.wf-button-right {
		padding: 0 10rpx 0 0;

		.menu-item {
			width: 100%;
			line-height: 80rpx;
			font-size: 28rpx;
			color: #323232;
			text-align: center;
		}
		.menu-item + .menu-item {
			border-top: 2rpx solid #f6f6f6;
		}
	}
}
</style>
