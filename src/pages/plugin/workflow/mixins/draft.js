import { getDetail, submit } from '../api/draft'

export default {
	data() {
		return {
			saveDraftShow: false,
			recoverDraftShow: false
		}
	},
	methods: {
		initDraft({ processDefId, taskId }) {
			return new Promise((resolve, reject) => {
				getDetail({ processDefId, taskId, platform: 'app' }).then(res => {
					const { data } = res
					if (data && data.variables && Object.keys(data.variables).length > 0) {
						this.recoverDraftData = data.variables
						resolve(data.variables)
					} else reject()
				}).catch((e) => {
					reject(e)
				})
			})
		},
		handleDraft({ processDefId, taskId, formKey, variables }) {
			this.draftData = { processDefId, taskId, formKey, variables: JSON.stringify(variables), platform: 'app' }
			this.saveDraftShow = true
		},
		handleDraftSubmit(taskId) {
			submit(this.draftData).then(() => {
				if (taskId) this.handleNavigateTo('/pages/plugin/workflow/pages/workbench/index')
				else this.handleNavigateTo('/pages/plugin/workflow/pages/create/index')
			})
		},
		handleRevocerDraftSubmit() {
			this.$set(this, 'form', JSON.parse(this.recoverDraftData))
			// #ifdef MP
			const option = this.deepClone(this.option)
			this.option = {}
			setTimeout(() => {
				this.option = option
			})
			// #endif
		}
	}
}