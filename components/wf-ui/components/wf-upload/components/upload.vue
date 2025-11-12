<template>
    <view class="wf-upload">
        <view class="wf-upload-button" v-if="!disabled && fileList.length < limit">
            <button
                :style="{ 'background-color': '#007aff', color: '#fff' }"
                type="default"
                size="mini"
                @click="handleChooseFile"
            >
                点击上传
            </button>
        </view>
        <view class="wf-upload-file">
            <view v-for="(item, index) in fileList" :key="index" class="wf-upload-file__item">
                <img
                    v-if="isImageUrl(item.url)"
                    :src="item.url"
                    alt=""
                    class="img-icon"
                    @click="handleAttachments(item)"
                />
                <span v-else class="wf-upload-file__item--name" @click="handleAttachments(item)">{{
                    item.name || item.url
                }}</span>
                <view v-if="!disabled" class="wf-upload-file__item--icon" @click="onRemove(index)"
                    ><u-icon name="close"></u-icon
                ></view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    name: 'upload',
    props: {
        fileList: {
            type: Array,
            default: () => [],
        },
        limit: {
            type: Number,
            default: Number.MAX_VALUE,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        // 判断是否为图片
        isImageUrl(url) {
            const imageExtensions = /\.(jpg|jpeg|png|gif|bmp|svg)$/i;
            return imageExtensions.test(url);
        },
        handleChooseFile() {
            const chooseFileMethod = new Promise((resolve) => {
                // #ifndef MP
                resolve('chooseImage');
                // #endif
                // #ifdef MP
                uni.showModal({
                    title: '选择文件',
                    content: '请选择文件来源',
                    confirmText: '聊天记录',
                    cancelText: '系统相册',
                    success: (res) => {
                        if (res.confirm) resolve('chooseMessageFile');
                        else resolve('chooseMedia');
                    },
                });
                // #endif
            });
            chooseFileMethod.then((method) => {
                uni[method]({
                    success: (res) => {
                        const { tempFiles } = res;
                        if (tempFiles.length + this.fileList.length > this.limit) {
                            uni.showToast({
                                title: `超出数量限制：${this.limit}`,
                                icon: 'none',
                            });
                            return;
                        }
                        this.$emit('choose', tempFiles);
                    },
                });
            });
        },

        handleAttachments(item) {
            const { url } = item;
            const suffix = url.substring(url.lastIndexOf('.') + 1);
            const imageList = ['jpg', 'png', 'jpeg', 'gif', 'webp', 'bmp'];
            const documentList = ['doc', 'docx', 'xls', 'xlsx', 'ppt', 'pptx', 'pdf'];
            // 图片
            if (imageList.includes(suffix)) {
                uni.previewImage({
                    urls: [url],
                });
            }
            // 文档
            else if (documentList.includes(suffix)) {
                // #ifdef H5
                window.open(url);
                // #endif
                // #ifndef H5
                uni.downloadFile({
                    url,
                    success: (res) => {
                        const filePath = res.tempFilePath;
                        uni.openDocument({
                            filePath,
                            fileType: suffix,
                        });
                    },
                });
                // #endif
            }
            // 其他
            else
                uni.showToast({
                    title: `当前类型${suffix}不支持在移动端展示`,
                    icon: 'none',
                });
        },
        onRemove(index) {
            uni.showModal({
                title: '警告',
                content: '确定要删除此项吗？',
                success: (res) => {
                    if (res.confirm) {
                        this.$emit('remove', index);
                    }
                },
            });
        },
    },
};
</script>

<style lang="scss" scoped>
.img-icon {
    width: 70rpx;
    height: 70rpx;
}
.wf-upload-file__item {
    padding-right: 32rpx;
    box-sizing: border-box;
}
.wf-upload {
    width: 100%;
    overflow: hidden;

    &-button {
        width: 100%;
        height: 60rpx;
    }

    &-file {
        width: 690rpx;
        overflow: hidden;

        &__item {
            display: flex;
            justify-content: space-between;
            align-items: center;

            &--name {
                flex: 1;
                margin-right: 16rpx;
                color: rgb(41, 121, 255);
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
    }
}
</style>
