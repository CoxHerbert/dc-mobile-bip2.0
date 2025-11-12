<template>
    <input type="number" ref="inputRef" :placeholder="placeholder || '请输入'" :value="value" @input="handleInput" @blur="handleBlur"></input>
</template>
<script>
export default {
    props: {
        value: {
            type: [Number, String],
            default() {
                return ''
            }
        },
        placeholder: {
            type: String,
            default() {
                return ''
            }
        },
        max: {
            type: Number,
            default() {
                return null
            }
        },
        min: {
            type: Number,
            default() {
                return null
            }
        },
        precision: {
            type: Number,
            default() {
                return null
            }
        },
    },

    methods: {
        handleInput(event) {
            let val = event.detail.value;
            let value = val;
            this.$nextTick(()=> {
                this.$emit('input', value);
            })
        },
        handleBlur(event) {
            let val = event.detail.value;
            let value = this.calcData(val);
             this.$nextTick(()=> {
                this.$emit('input', value);
                this.$emit('change', value);
            })
        },
        calcData(valueSet) {
            let result;
            let value = valueSet? parseFloat(`${valueSet}`) : '';
            if(value){
                if(this.max && valueSet > this.max) {
                    result = this.max;
                } else if(this.min && valueSet < this.min) {
                    result = this.min;
                } else {
                    result =  valueSet;
                }
                return this.precision > 0? parseFloat(`${result}`).toFixed(this.precision) : parseFloat(`${result}`);
            }
            return '';
        }
    },
}
</script>