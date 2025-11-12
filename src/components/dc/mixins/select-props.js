import cacheData from '@/components/dc/constant/cacheData';
export default {
    props: {
        modelValue: { type: [String, Number, Object, Array, Boolean], default: '' },
        title: { type: String, default: '' },
        objectName: {
            type: String,
            default: '',
            validator: (value) => Object.keys(cacheData).includes(value),
        },
        returnType: {
            type: String,
            default: 'string',
            validator: (value) => ['string', 'object'].includes(value),
        },
        width: { type: String, default: '100%' },
        placeholder: { type: String, default: '请点击选择' },
        disabled: { type: Boolean, default: false },
        dialogWidth: { type: String, default: '1200px' },
        query: {
            type: Object,
            default: () => {
                return {};
            },
        },
        column: {
            type: Object,
            default: () => {
                return {};
            },
        },
        dynamicIndex: {
            type: Number,
        },
        rowKey: { type: String, default: () => 'id' },
        multiple: { type: Boolean, default: false },
        clearable: { type: Boolean, default: false },
        showKey: { type: String, default: '' },
        inputProps: { type: Object, default: () => ({}) },
        // change: { type: [Function, null], default: Function },
    },
};
