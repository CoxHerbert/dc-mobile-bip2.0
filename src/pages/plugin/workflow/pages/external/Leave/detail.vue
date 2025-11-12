<template>
	<view class="detail">
		<!-- 头部 -->
		<view class="detail-head flex-between flex-c">
			<u-avatar :text="process.startUsername" bg-color="#FAB022"></u-avatar>
			<view class="flex-one c">
				<view class="leave bold">{{ process.processDefinitionName }}</view>
				<view class="name">{{ process.startUsername }}</view>
			</view>
			<u-tag v-if="process.status == 'todo'" text="审核中" type="success" size="mini" />
			<u-tag v-else-if="process.status == 'delay'" text="已超时" type="error" size="mini" />
			<template v-else-if="process.status == 'done'">
				<u-tag v-if="process.processIsFinished == 'unfinished'" text="审核中" type="success" size="mini" />
				<u-tag v-else-if="process.processIsFinished == 'finished'" text="已结束" type="success" size="mini" />
				<u-tag v-else-if="process.processIsFinished == 'terminate'" text="已终止" type="error" size="mini" />
				<u-tag v-else-if="process.processIsFinished == 'withdraw'" text="已撤销" type="error" size="mini" />
				<u-tag v-else-if="process.processIsFinished == 'recall'" text="已撤回" type="error" size="mini" />
				<u-tag v-else-if="process.processIsFinished == 'reject'" text="已驳回" type="error" size="mini" />
			</template>
		</view>
		<!-- tab -->
		<u-tabs :list="tabList" :is-scroll="false" :current="current" @change="current = $event"></u-tabs>
		<!-- 内容 -->
		<view class="content">
			<u-card
				v-show="current == 0"
				:show-head="false"
				margin="20rpx 0"
				padding="0"
				:border="false"
				:body-style="{ backgroundColor: '#f6f6f6' }"
			>
				<view slot="body">
					<view class="split-line">
						<wf-form
							v-if="init"
							ref="form"
							v-model="form"
							:option="option"
							@submit="handleSubmit"
						></wf-form>
					</view>
					<view class="split-line" v-if="process.status == 'todo'">
						<wkf-exam-form
							ref="examineForm"
							:process="process"
							:comment.sync="comment"
							@user-select="handleUserSelect"
						></wkf-exam-form>
					</view>
				</view>
			</u-card>
			<!-- <u-card v-if="current == 1" :show-head="false" margin="20rpx 0"> -->
			<view class="" style="padding: 30rpx" v-show="current == 1"><wkf-flow :flow="flow"></wkf-flow></view>
			<!-- </u-card> -->
		</view>
		<!-- 选人 -->
		<wkf-user-select
			ref="user-select"
			:check-type="checkType"
			:default-checked="defaultChecked"
			@onConfirm="handleUserSelectConfirm"
		></wkf-user-select>
		<wkf-button
			:loading="submitLoading"
			:button-list="buttonList"
			:process="process"
			:comment="comment"
			@examine="handleExamine"
			@user-select="handleUserSelect"
			@rollback="handleRollbackTask"
			@terminate="handleTerminateProcess"
			@withdraw="handleWithdrawTask"
		></wkf-button>
	</view>
</template>
<script>
import WkfFlow from '../../../components/wf-flow/index'
import WkfUserSelect from '../../../components/wf-user-select/index'
import WkfButton from '../../../components/wf-button/index'
import WkfExamForm from '../../../components/wf-exam-form/index'

import exForm from '../../../mixins/ex-form'
// import { needHideTitleBar } from '@/utils/utils'
export default {
	name: 'wf-form-detail',
	mixins: [exForm],
	components: { WkfFlow, WkfUserSelect, WkfButton, WkfExamForm },
	data() {
		return {
			init: false,
			form: {},
			option: {
				labelPosition: 'top',
				menuBtn: false,
				column: [
					{
						label: '请假时间',
						prop: 'datetime',
						type: 'datetimerange',
						format: 'yyyy-MM-dd HH:mm:ss',
						valueFormat: 'yyyy-MM-dd HH:mm:ss',
						rules: [{ required: true, message: '请选择请假时间' }]
					},
					{
						label: '请假天数',
						prop: 'days',
						type: 'number',
			 		rules: [{ required: true, message: '请输入请假天数' }]
					},
					{
						label: '请假理由',
						prop: 'reason',
						type: 'textarea',
						span: 24,
						rules: [{ required: true, message: '请输入请假理由' }]
					}
				]
			},
			vars: [], // 需要提交的字段
			submitLoading: false, // 提交时按钮loading
			current: 0,
			tabList: [{ name: '申请信息' }, { name: '流转信息' }]
		}
	},
	onLoad(option) {
		// const hideTitlebar  = needHideTitleBar();
        // if(hideTitlebar) {
        //     uni.setNavigationBarStyle({ 
        //         navigationStyle: 'custom', // 隐藏默认导航栏 
        //     });
        // }
		const { p } = option
		if (p) {
			const param = JSON.parse(Buffer.from(p, 'base64').toString())
			const { taskId, processInsId } = param
			if (taskId && processInsId) this.getDetail(taskId, processInsId)
		}
	},
	methods: {
		// 获取任务详情
		getDetail(taskId, processInsId) {
			this.getTaskDetail(taskId, processInsId).then(res => {
				const { process, form } = res
				const { variables, status } = process

				this.form = variables

				let { taskForm } = form
				const { option, vars } = this.handleResolveOption(this.option, taskForm, status)
				this.option = option
				this.vars = vars
				
				setTimeout(() => {
					this.init = true
				}, 100)
			})
		},
		handleResolveOption(option, taskForm, status) {
			const { column, group } = option
			let vars = []
			if (status != 'todo') {
				// 已办，删除字段默认值
				let event = ['change', 'blur', 'click', 'focus']
				option.detail = true
				if (column && column.length > 0) {
					// 处理column
					column.forEach(col => {
						if (col.type == 'dynamic')
							col.children.column.forEach(cc => {
								delete cc.value
								delete cc.event
								event.forEach(e => delete cc[e])
							})
						else {
							delete col.value
							delete col.event
							event.forEach(e => delete col[e])
						}
					})
				}

				if (group && group.length > 0) {
					// 处理group
					group.forEach(gro => {
						if (gro.column && gro.column.length > 0) {
							gro.column.forEach(col => {
								if (col.type == 'dynamic')
									col.children.column.forEach(cc => {
										delete cc.value
										delete cc.event
										event.forEach(e => delete cc[e])
									})
								else {
									delete col.value
									delete col.event
									event.forEach(e => delete col[e])
								}
							})
						}
					})
				}
			} else {
				const columnFilter = this.filterAvueColumn(column, taskForm)
				const columnArr = columnFilter.column
				vars = columnFilter.vars || []

				const groupArr = []
				if (group && group.length > 0) {
					// 处理group
					group.forEach(gro => {
						const groupFilter = this.filterAvueColumn(gro.column, taskForm)
						gro.column = groupFilter.column
						vars = vars.concat(groupFilter.vars)
						if (gro.column.length > 0) groupArr.push(gro)
					})
				}

				if (process.variables && process.variables.serialNumber) {
					columnArr.unshift({
						label: '流水号',
						prop: 'serialNumber',
						span: 24,
						detail: true
					})
				}
				option.column = columnArr
				option.group = groupArr
				option.labelPosition = 'top'
			}
			return { option, vars }
		},
		// 审核
		handleExamine(pass) {
			this.submitLoading = true
			this.$refs.form.validate((valid, done) => {
				if (valid) {
					const variables = {}
					this.vars.forEach(v => {
						if (v != 'comment' && this.form[v]) variables[v] = this.form[v]
					})

					this.handleCompleteTask(pass, variables)
						.then(() => {
							uni.showToast({
								title: '处理成功'
							})
							setTimeout(() => {
								uni.redirectTo({
									url: '/pages/plugin/workflow/pages/mine/index?current=0'
								})
								done()
							}, 1000)
						})
						.catch(() => {
							done()
							this.submitLoading = false
						})
				} else {
					done()
					this.submitLoading = false
				}
			})
		}
	}
}
</script>
<style lang="scss" scoped>
@import '../../../static/styles/common';
page {
	background: #f6f6f6;
}
.split-line {
	border-bottom: 20rpx solid #f6f6f6;
	min-height: 45px;
}
.detail {
	&-head {
		background: #fff;
		padding: 30rpx;
		.c {
			margin: 0 20rpx;
			.leave {
				color: #333;
				font-size: 34rpx;
			}
			.name {
				color: #666;
				font-size: 30rpx;
			}
		}
	}
	.content {
		padding: 0 0 30rpx;
	}
}
</style>
