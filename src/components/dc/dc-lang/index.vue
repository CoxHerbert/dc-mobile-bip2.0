<template>
<view class="comp-dc-lang">
    <view class="lang-box" :class="{
                'hide-mode': !showTitleBar
        }" @click="chooseLang">
        {{ langLabel }}<view class="icon-bottom"></view>
        
    </view>
      <u-select
            v-model="isLangSelectShow"
            :list="langSelectList"
            value-name="value"
            label-name="label"
            @confirm="(e) => onConfirm(e, 'isLangSelectShow')"
            confirm-color="rgb(247, 132, 49)"
            safe-area-inset-bottom
        ></u-select>
</view>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    props: {
        showTitleBar: {
            type: Boolean,
            default() {
                return false;
            },
        },
    },
    data() {
        return {
             // lang: 'cn',
            isLangSelectShow: false,
            langSelectList: [
               {
                    label: '中文',
                    value: 'cn',
               },
               {
                    label: 'Tiếng Việt',
                    value: 'vn',
               },
            ],
        };
    },
    computed: {
        langLabel() {
            return this.langSelectList.find(item => item.value === this.lang)?.label || '中文'
        },
        lang() {
            return this.$store.state.loginInfo.lang
        }
    },
    methods: {
        ...mapMutations(['SET_LANG']),
        chooseLang() {
            this.isLangSelectShow = true;    
        },

        // 类型回调
        onConfirm(e, type) {
           if(type === 'isLangSelectShow') {
                this.SET_LANG({
                    lang: e[0].value
                })
            }
        },

    },
};
</script>

<style scoped>
    .lang-box {
        align-items: center;
        display: flex;
        flex-flow: row nowrap;
        padding: 0 8px;
        height: 32px;
        border-radius: 4px;
        line-height: 30px;
        border: 1px solid #ccc;
        position: fixed;
        right: 16px;
        top: 6px;
        z-index: 981;

        &.hide-mode {
            position: absolute;
        }

        .icon-bottom {
            margin-left: 6px;
            transform: rotate(45deg);
            width: 8px;
            border: 1px solid #666;
            height: 8px;
            border-top-color: transparent;
            border-left-color: transparent;
        }
    }
</style>
