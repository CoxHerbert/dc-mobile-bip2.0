<template>
    <view class="dict" :class="getClass()">{{ dict.label || '-' }} </view>
</template>

<script>
export default {
    props: {
        // 类型
        type: {
            type: String,
            default: '',
        },
        // 数据
        options: {
            type: Array,
            default: [],
        },
        // 当前的值
        value: [Number, String, Array],
    },
    computed: {
        dict() {
            // 递归查找函数
            const findDict = (options, value) => {
                for (const item of options) {
                    if (item.dictKey === value) {
                        return item;
                    }
                    if (item.children && Array.isArray(item.children)) {
                        const found = findDict(item.children, value);
                        if (found) return found;
                    }
                }
                return null;
            };
            // console.log(this.options);
            if (Array.isArray(this.options) && this.options.length) {
                const result = findDict(this.options, this.value);
                return result || this.value;
            }
            return this.value;
        },
    },
    methods: {
        getClass() {
            return this.dict?.listClass || '';
        },
    },
};
</script>
