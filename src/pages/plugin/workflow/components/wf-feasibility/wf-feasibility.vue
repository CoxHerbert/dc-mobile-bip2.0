<template>
    <view class="wf-feasibility">
        <view class="header-row">
            <view class="ceil">评审内容</view>
            <view class="ceil">总分</view>
            <view class="ceil">评分</view>
         </view> 
        <view v-for="(col, i) in valueSet" :key="i" class="content-row">
            <view class="ceil">{{ col.feaEvaluationConclusion }}</view>
            <view class="ceil">{{ col.feaEvaluationTotalScore }}</view>
            <view class="ceil">
                <u-input class="input-item" type="number" :max="col.feaEvaluationTotalScore" placeholder="请输入" v-model="value[i].feaEvaluationScore" @input="(val) => {
                    handleInput(val, i)
                }" @blur="(val) => {
                    handleInput(val, i)
                }" />
            </view> 
        </view>
        <view  class="content-row">
            <view class="ceil">总分</view>
            <view class="ceil">{{ total }}</view>
            <view class="ceil">{{ hasScore }}</view> 
        </view> 
    </view>
</template>
<script>
export default {
  props: {
    value:{
        type: [String, Array],
        default() {
            return []
        }
    },
    columns: {
        type: Array,
        default() {
            return []
        }
    }
  },
  computed: {
    total() {
        if(Array.isArray(this.value)) {
            return this.value.reduce((rec, item) => {
                rec += parseInt(item.feaEvaluationTotalScore, 10) || 0;
                return rec;
            }, 0)
        }
        return '-'
    },
    hasScore() {
       if(Array.isArray(this.value)) {
            return this.value.reduce((rec, item) => {
                rec += parseInt(item.feaEvaluationScore, 10) || 0;
                return rec;
            }, 0)
        }
        return '-'
    },
    valueSet() {
        if(Array.isArray(this.value) ){
            return this.value
        } else {
            if(this.value?.length > 0){
                const val_ =  JSON.parse(this.value);
                this.$emit('input',  val_)
            }
        }
    }
  },
 
  methods: {
    handleInput(val, i) {
        const valueNew  = this.value;
        valueNew[i].feaEvaluationScore = Math.max(Math.min(parseFloat(valueNew[i].feaEvaluationTotalScore) , parseFloat(val)), 0);
        this.$emit('input', valueNew);
    }
  }
}
</script>
<style lang="scss">
.wf-feasibility {
    border-top: 1px solid #eaeaeb;
    .header-row .ceil {
        font-weight: bold;
    }
    .header-row,
    .content-row {
        display: flex;
        border-bottom: 1px solid #eaeaeb;
        .ceil {
            display: flex;
            align-items: center;
            padding: 10px;
            justify-content: center;
            line-height: 1.4;
            font-size: 28rpx;
            border-left: 1px solid #eaeaeb;
        }
        .ceil:nth-child(3n+1) {
            border-right: none;
            width: 60%;
        }
        .ceil:nth-child(3n+2) {
            width: 20%;
            border-right: 1px solid #eaeaeb;
            border-left: 1px solid #eaeaeb;
        }
        .ceil:nth-child(3n+3) {
            border-left: none;
            border-top: none;
            border-right: 1px solid #eaeaeb;
            width: 20%;
        }
    }

    .input-item {
        text-align: center!important;
    }
}
</style>