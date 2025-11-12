<template>
	<view>
		<u-time-line>
			<template v-for="(item, index) in flow">
				<u-time-line-item :key="index" v-if="!['candidate', 'sequenceFlow'].includes(item.historyActivityType)">
					<template v-slot:content>
						<view class="line-item">
							<view class="time">{{ item.endTime || item.createTime }}</view>
							<view class="desc">
								<view class="desc-item">
									{{ item.assigneeName }} 在 [{{ item.createTime }}] 开始处理 [{{
										item.historyActivityType == 'endEvent' ? '结束' : item.historyActivityName || '未命名'
									}}] 环节
								</view>
								<view class="desc-item" v-if="item.historyActivityDurationTime">
									任务历时 [{{ item.historyActivityDurationTime }}]
								</view>
								<block v-if="item.comments">
									<view
										v-for="(comment, cIndex) in item.comments.filter(c => c.action === 'AddComment')"
										:key="cIndex"
										class="desc-item"
									>
										<block v-if="cIndex < 1">
											<text v-if="commentMap[comment.type]">{{ commentMap[comment.type] }}: [{{ comment.fullMessage }}]</text>
											<text
												style="color: #1989fa; float: right;"
												v-if="item.comments.filter(c => c.action === 'AddComment').length > 1"
												@click="handleClick"
											>
												{{ toggleText }}
												<u-icon :name="isFlag ? 'arrow-up' : 'arrow-down'" color="#1989fa" size="28"></u-icon>
											</text>
											<view style="color: gray; font-size: 12px;" v-if="comment.time">{{ comment.time }}</view>
										</block>
										<block v-if="cIndex > 0 && isFlag">
											<text v-if="commentMap[comment.type]">{{ commentMap[comment.type] }}: [{{ comment.fullMessage }}]</text>
											<view style="color: gray; font-size: 12px;" v-if="comment.time">{{ comment.time }}</view>
										</block>
									</view>
								</block>
								<block v-if="item.attachments && item.attachments.length > 0">
									<view style="display: flex; align-items: baseline;">
										<text style="margin-right: 10rpx;">附件:</text>
										<view style="width: 80%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
											<view v-for="(attachment, cIndex) in item.attachments" :key="cIndex" style="margin-bottom: 15rpx;">
												<text style="color: rgb(41, 121, 255);" @click="handleAttachments(attachment)">
													{{ attachment.name }}
												</text>
											</view>
										</view>
									</view>
								</block>
								<view class="desc-item" v-if="item.endTime">结束时间: [{{ item.endTime }}]</view>
							</view>
						</view>
					</template>
				</u-time-line-item>
			</template>
		</u-time-line>
	</view>
</template>
<script>
export default {
	name: 'wf-flow',
	props: {
		flow: {
			type: Array,
			default: () => {
				return []
			}
		}
	},
	data() {
		return {
			isFlag: false,
			toggleText: '展开',
			commentMap: {
				assigneeComment: '变更审核人',
				dispatchComment: '调度意见',
				transferComment: '转办意见',
				delegateComment: '委托意见',
				rollbackComment: '驳回意见',
				terminateComment: '终止意见',
				addMultiInstanceComment: '加签',
				deleteMultiInstanceComment: '减签',
				withdrawComment: '撤销',
				recallComment: '撤回',
				comment: '审批意见'
			}
		}
	},

	methods: {
		handleClick() {
			this.isFlag = !this.isFlag
			this.toggleText = this.isFlag ? '收起' : '展开'
		},
		handleAttachments(item) {
			const { url } = item
			const suffix = url.substring(url.lastIndexOf('.') + 1)
			const imageList = ['jpg', 'png', 'jpeg', 'gif', 'webp', 'bmp']
			const documentList = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf']
			// 图片
			if (imageList.includes(suffix)) {
				uni.previewImage({
					urls: [url]
				})
			}
			// 文档
			else if (documentList.includes(suffix)) {
				console.log(url)
				uni.downloadFile({
					url,
					success: res => {
						const filePath = res.tempFilePath
						uni.openDocument({
							filePath,
							fileType: suffix,
						})
					}
				})
			}
			// 其他
			else uni.showToast({
				title: `当前类型${suffix}不支持在移动端展示`,
				icon: 'none'
			})
		}
	}
}
</script>
<style>
page {
	background: #f6f6f6;
}
</style>
<style lang="scss" scoped>
::v-deep.u-dot {
	background: #409eff;
}
::v-deep.u-time-axis-node {
	top: 26rpx;
}
.u-time-axis::before {
	top: 26rpx;
}
.line-item {
	background: #fff;
	padding: 16rpx;
	border-radius: 13rpx;
	.time {
		color: #222;
		padding: 0 0 10rpx;
		border-bottom: 1px dashed #ebeef5;
	}
	.desc {
		padding: 20rpx 0;

		&-item {
			margin-bottom: 10rpx;
			line-height: 50rpx;
		}
	}
}
</style>
