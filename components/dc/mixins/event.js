import { initVal } from '../util/dataformat.js'
import { DIC_SPLIT } from '../util/variable.js';

function bindEvent(safe, name, event) {
	typeof safe[name] === 'function' && safe[name]({ value: safe.value, column: safe.column, index: safe.dynamicIndex })
	safe.$emit(name, safe.value, event)
}
export default {
	methods: {
		initVal() {
			this.stringMode = typeof(this.value) == 'string'
			this.text = initVal(this.value, this.column)
		},
		handleFocus(event) {
			bindEvent(this, 'focus', event)
		},
		handleBlur(event) {
			bindEvent(this, 'blur', event)
		},
		handleClick(event) {
			bindEvent(this, 'click', event)
		},
		handleChange(value) {
			let result = value
			let flag = this.isString || this.isNumber || this.stringMode || this.listType === "picture-img"
			if (flag && Array.isArray(value)) {
				result = value.join(this.separator || DIC_SPLIT)
			}
			if (typeof this.change === 'function' && this.column.cell !== true) {
				this.change({ value: result, column: this.column, index: this.dynamicIndex })
			}
			this.$emit('input', result)
			this.$emit('change', result)
		},
	}
}
