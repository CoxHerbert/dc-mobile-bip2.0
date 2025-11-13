<template>
    <div>
        <van-cell-group inset>
            <template v-for="(item, index) in flow" :key="index">
                <van-cell v-if="!['candidate', 'sequenceFlow'].includes(item.historyActivityType)" class="wf-flow-item">
                    <template #title>
                        <div class="time">{{ item.endTime || item.createTime }}</div>
                    </template>
                    <template #label>
                        <div class="desc">
                            <div class="desc-item">
                                {{ item.assigneeName }} 在 [{{ item.createTime }}] 开始处理
                                [{{ item.historyActivityType == 'endEvent' ? '结束' : item.historyActivityName || '未命名' }}]
                                环节
                            </div>
                            <div class="desc-item" v-if="item.historyActivityDurationTime">
                                任务历时 [{{ item.historyActivityDurationTime }}]
                            </div>
                            <template v-if="item.comments">
                                <div
                                    v-for="(comment, cIndex) in item.comments.filter((c) => c.action === 'AddComment')"
                                    :key="cIndex"
                                    class="desc-item"
                                >
                                    <template v-if="cIndex < 1">
                                        <span v-if="commentMap[comment.type]">
                                            {{ commentMap[comment.type] }}: [{{ comment.fullMessage }}]
                                        </span>
                                        <span
                                            class="toggle"
                                            v-if="item.comments.filter((c) => c.action === 'AddComment').length > 1"
                                            @click="handleClick"
                                        >
                                            {{ toggleText }}
                                            <van-icon :name="isFlag ? 'arrow-up' : 'arrow-down'" color="#1989fa" size="14" />
                                        </span>
                                        <div class="comment-time" v-if="comment.time">{{ comment.time }}</div>
                                    </template>
                                    <template v-else-if="isFlag">
                                        <span v-if="commentMap[comment.type]">
                                            {{ commentMap[comment.type] }}: [{{ comment.fullMessage }}]
                                        </span>
                                        <div class="comment-time" v-if="comment.time">{{ comment.time }}</div>
                                    </template>
                                </div>
                            </template>
                            <template v-if="item.attachments && item.attachments.length > 0">
                                <div class="attachment-row">
                                    <span class="attachment-label">附件:</span>
                                    <div class="attachment-list">
                                        <div v-for="(attachment, cIndex) in item.attachments" :key="cIndex" class="attachment-item">
                                            <span class="attachment-link" @click="handleAttachments(attachment)">
                                                {{ attachment.name }}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div class="desc-item" v-if="item.endTime">结束时间: [{{ item.endTime }}]</div>
                        </div>
                    </template>
                </van-cell>
            </template>
        </van-cell-group>
    </div>
</template>
<script>
import { Toast } from 'vant';

export default {
    name: 'wf-flow',
    props: {
        flow: {
            type: Array,
            default: () => {
                return [];
            },
        },
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
                comment: '审批意见',
            },
        };
    },

    methods: {
        handleClick() {
            this.isFlag = !this.isFlag;
            this.toggleText = this.isFlag ? '收起' : '展开';
        },
        handleAttachments(item) {
            const { url } = item;
            const suffix = url.substring(url.lastIndexOf('.') + 1);
            const imageList = ['jpg', 'png', 'jpeg', 'gif', 'webp', 'bmp'];
            const documentList = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'];
            if (imageList.includes(suffix)) {
                window.open(url, '_blank');
            } else if (documentList.includes(suffix)) {
                window.open(url, '_blank');
            } else {
                Toast({
                    message: `当前类型${suffix}不支持在移动端展示`,
                });
            }
        },
    },
};
</script>
<style>
page {
    background: #f6f6f6;
}
</style>
<style lang="scss" scoped>
.wf-flow-item {
    align-items: flex-start;
}

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

.toggle {
    color: #1989fa;
    float: right;
    display: inline-flex;
    align-items: center;
}

.comment-time {
    color: gray;
    font-size: 12px;
}

.attachment-row {
    display: flex;
    align-items: baseline;
}

.attachment-label {
    margin-right: 10rpx;
}

.attachment-list {
    width: 80%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.attachment-item {
    margin-bottom: 15rpx;
}

.attachment-link {
    color: rgb(41, 121, 255);
}
</style>
