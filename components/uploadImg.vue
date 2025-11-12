<!-- 单张上传还是多张上传根据maxCount的数量判断,必填选项  maxCount=1单张  maxCount>1多张上传 -->
<template>
    <view>
        <unifilepicker
            v-model="fileList"
            :fileMediatype="fileMediatype"
            :multiple="multiple"
            :width="width"
            :height="height"
            :imageStyles="{
                width: width,
                height: height,
            }"
            :maxCount="maxCount"
            :limit="maxCount"
            :title="title"
            :list-styles="listStyles"
            :disabled="disabled"
            :readonly="disabled"
            @select="afterRead"
            @delete="deletePic"
        >
        </unifilepicker>
    </view>
</template>
<script>
import unifilepicker from '@/uni_modules/uni-file-picker/components/uni-file-picker/uni-file-picker.vue';
import { uplpadUrl } from '@/common/setting';
// import { uploadImage } from "@/utils/oss-sts-client";
export default {
    components: { unifilepicker },
    props: {
        value: {
            type: String || Array,
        },
        maxCount: {
            type: Number,
            default: 9,
        },
        multiple: {
            type: Boolean,
            default: false,
        },
        width: {
            type: String || Number,
        },
        height: {
            type: String || Number,
        },
        fileMediatype: {
            type: String,
            default: 'image',
        },
        title: {
            type: String,
            default: ' ',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        // 1是身份证正面 2是身份证反面String
        imgUrlType: {
            type: Number || String,
            default: null,
        },
        //文件后缀
        suffix: {
            type: String,
            default: '.png',
        },
        //文件夹完整路径
        homeFolder: {
            type: String,
            default: 'public/other',
        },
        //文件名前缀
        subfolderOf: {
            type: String,
            default: '',
        },
    },
    data() {
        return {
            fileList: [],
            listStyles: {
                // 是否显示边框
                border: true,
                // 是否显示分隔线
                dividline: true,
                // 线条样式
                borderStyle: {
                    width: 1,
                    color: 'blue',
                    radius: 2,
                },
            },
        };
    },
    watch: {
        value: {
            //这里是要监听的变量名
            handler(newValue, oldValue) {
                // if (this.fileMediatype !== "image") return;
                console.log('newValue: ', newValue, this.fileList);
                if (newValue) {
                    // 单价图片
                    if (this.maxCount === 1 && this.fileList.length == 0) {
                        this.fileList.push({
                            url: newValue,
                        });
                    } else {
                        let fileList = [];
                        let list = newValue.split(',');
                        if (list.length > 0) {
                            list.map((item, index) => {
                                fileList.push({
                                    url: item,
                                    name: (this.fileMediatype !== 'image' ? '文件' : '图片') + parseInt(index + 1),
                                    // extname: this.extname,
                                });
                            });
                        }
                        this.fileList = fileList;
                    }
                } else {
                    this.fileList = [];
                }
            },
            immediate: true,
        },
    },

    methods: {
        // 删除图片
        deletePic(event) {
            let that = this;
            console.log(event);
            this.fileList = this.fileList.concat().filter(function (item) {
                return item.path !== event.tempFilePath;
            });
            var resultLsit = this.fileList.map((item) => {
                return item.url;
            });
            that.$emit('updateImg', that.maxCount == 1 ? that.fileList[0].url : resultLsit.join(','));
            that.$emit('update:value', that.maxCount == 1 ? that.fileList[0].url : resultLsit.join(','));
        },
        // 新增图片
        async afterRead(event) {
            console.log('event: ', event);
            let that = this;
            // 当设置 multiple 为 true 时, file 为数组格式，否则为对象格式
            let lists = [].concat(event.tempFiles);
            let fileListLen = this.fileList.length;
            lists.map((item) => {
                console.log('item: ', item);
                this.fileList.push({
                    ...item,
                    status: 'uploading',
                    message: '上传中',
                });
                console.log('this.fileList: 1111111', this.fileList);
            });

            for (let i = 0; i < lists.length; i++) {
                const result = await this.uploadFilePromise(lists[i].url);
                // const result =
                //   "https://images-test.merrige.cn/public/Store/storeApply-1717166385485";
                let item = this.fileList[fileListLen];
                console.log('item: ', item, fileListLen);
                this.fileList.splice(
                    fileListLen,
                    1,
                    Object.assign(item, {
                        status: 'success',
                        message: '',
                        url: result,
                    })
                );
                fileListLen++;
                console.log(' this.fileList:2222222 ', this.fileList);
            }
            var resultLsit = this.fileList.map((item) => {
                return item.url;
            });

            that.$emit('updateImg', that.maxCount == 1 ? that.fileList[0].url : resultLsit.join(','));
            that.$emit('update:value', that.maxCount == 1 ? that.fileList[0].url : resultLsit.join(','));
        },
        uploadFilePromise(url) {
            console.log('url: ', url);
            let accessToken = uni.getStorageSync('accessToken');
            return new Promise((resolve, reject) => {
                const newDate = new Date().getTime();
                const uploadTask = uni.uploadFile({
                    url: uplpadUrl, // 服务器上传接口地址
                    filePath: url,
                    name: 'file', // 必须填写，后台用来接收文件
                    formData: {},
                    header: {
                        authorization: 'Basic cmlkZXI6cmlkZXJfc2VjcmV0',
                        'blade-Requested-With': 'BladeHttpRequest',
                        'blade-Auth': 'bearer ' + accessToken,
                    },
                    success: (res) => {
                        let data = JSON.parse(res.data);
                        if (data.code == 200) {
                            console.log(data.data);
                            let sublink = data.data.link.substring(data.data.link.indexOf('bip2'));
                            let devAvatarId = 'https://static.eastwinbip.com/' + sublink;
                            let resultUrl = process.env.NODE_ENV === 'development' ? devAvatarId : data.data.link;
                            resolve(resultUrl);
                        }
                    },
                    fail: (uploadFileErr) => {
                        console.error('图片上传失败', uploadFileErr);
                    },
                });
                // 监听上传进度变化
                uploadTask.onProgressUpdate((res) => {
                    console.log('上传进度' + res.progress + '%');
                });

                // uploadImage(
                //   url,
                //   this.subfolderOf + "-" + newDate + fileNameSuffix,
                //   this.homeFolder
                // )
                //   .then((imageName) => {
                //     uni.hideLoading();
                //     resolve(imageName);
                //   })
                //   .catch((e) => {});
            });
        },
    },
};
</script>

<style scoped lang="scss"></style>
