<template>
	<view class="wf-form-start">
		<view class="split-line"><wf-form v-model="form" :option="option" @submit="handleSubmit"></wf-form></view>
		<view class="split-line">
			<wkf-exam-form v-if="showExamForm" ref="examineForm" :process="process" @user-select="handleUserSelect"></wkf-exam-form>
		</view>

		<!-- 选人 -->
		<wkf-user-select
			ref="user-select"
			:check-type="checkType"
			:default-checked="defaultChecked"
			@onConfirm="handleUserSelectConfirm"
		></wkf-user-select>
	</view>
</template>

<script>
import wkfUserSelect from '../../../components/wf-user-select/index'
import wkfExamForm from '../../../components/wf-exam-form/index'
import exForm from '../../../mixins/ex-form'
export default {
	name: 'wf-form-leave-start',
	mixins: [exForm],
	components: { wkfExamForm, wkfUserSelect },
	computed: {
		showExamForm() {
			const { hideComment, hideCopy, hideExamine } = this.process
			return !hideComment || !hideCopy || !hideExamine
		}
	},
	data() {
		return {
			form: {},
			option: {
				labelPosition: 'top',
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
			}
		}
	},
	onLoad(option) {
		const { p } = option
		if (p) {
			const param = JSON.parse(Buffer.from(p, 'base64').toString())
			const { processId } = param
			if (processId) this.getForm(processId)
		}
	},
	methods: {
		getForm(processDefId) {
			this.getStartForm(processDefId).then(res => {
				let { startForm } = res
				const option = this.option
				const { column, group } = option

				const groupArr = []
				const columnArr = this.filterAvueColumn(column, startForm).column
				if (group && group.length > 0) {
					// 处理group
					group.forEach(gro => {
						gro.column = this.filterAvueColumn(gro.column, startForm).column
						if (gro.column.length > 0) groupArr.push(gro)
					})
				}

				option.column = columnArr
				option.group = groupArr
				this.option = option
			})
		},
		handleSubmit(form, done) {
			form.processId = this.process.id
			this.handleStartProcess(form)
				.then(() => {
					this.handleNavigateTo('/pages/plugin/workflow/pages/mine/index?current=1', '发起成功')
				})
				.catch(() => {
					done()
				})
		}
	}
}
</script>

<style scoped>
page {
	background: #f6f6f6;
}
.split-line {
	border-bottom: 20rpx solid #f6f6f6;
	min-height: 45px;
}
</style>
