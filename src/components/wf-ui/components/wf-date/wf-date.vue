<template>
	<view class="wf-date">
		<block v-if="[1, 2, 3, 4].includes(type)">
			<div class="wf-date__field" @click="handleShowSelect">
				<u-field
					v-model="date"
					:label-width="0"
					:border-bottom="false"
					:placeholder="getPlaceholder(column)"
				>
					<template #icon>
						<u-icon name="calendar" color="rgb(192, 196, 204)" size="26"></u-icon>
					</template>
				</u-field>
			</div>
			<calendar
				ref="calendar"
				:type="type"
				:init-start-date="initStartDate"
				:init-end-date="initEndDate"
				lunar
				is-fixed
				:max-year="2099"
				max-date="2099-12-31"
				@change="onChange"
				@clear="onClear"
			></calendar>
		</block>

		<block v-if="[5, 6].includes(type)">
			<view class="wf-date-time">
				<div class="wf-date-time__start" @click="handleShowSelect('initStartDate')">
					<u-field
						v-model="initStartDate"
						:style="{ padding: '0' }"
						label-width="0"
						:border-bottom="false"
						:placeholder="type == 5 ? getPlaceholder(column) : column.startPlaceholder || '开始时间'"
						:placeholder-style="type == 5 ? 'text-align: left' : 'text-align: center'"
						:input-align="type == 5 ? 'left' : 'center'"
					>
						<template #icon>
							<u-icon name="clock" color="rgb(192, 196, 204)" size="26"></u-icon>
						</template>
					</u-field>
				</div>
				
				<block v-if="type == 6">
					至
					<div class="wf-date-time__end" @click="handleShowSelect('initStartDate')">
						<u-field
							v-model="initEndDate"
							:style="{ padding: '0' }"
							label-width="0"
							:border-bottom="false"
							:placeholder="column.endPlaceholder || '结束时间'"
							placeholder-style="text-align: center;"
							:input-align="type == 5 ? 'left' : 'center'"
						></u-field>
					</div>
				</block>
			</view>
			<u-picker
				v-model="showTime"
				mode="time"
				:title="type == 5 ? '时间' : timeType == 'initStartDate' ? '开始时间' : '结束时间'"
				cancel-text="清空"
				:default-time="defaultTime"
				:params="{ year: false, month: false, day: false, hour: true, minute: true, second: true }"
				:mask-close-able="type == 5 ? true : timeType == 'initStartDate' ? true : false"
				@confirm="onConfirm"
				@cancel="onClear"
			></u-picker>
		</block>
	</view>
</template>

<script>
import Props from '../../mixins/props.js'

import Calendar from './components/calendar.vue'

import timeFormat from '../../util/timeFormat.js'
export default {
	name: 'wf-date',
	mixins: [Props],
	components: { Calendar },
	computed: {
		type() {
			switch (this.column.type) {
				case 'date':
					return 1
				case 'daterange':
					return 2
				case 'datetime':
					return 3
				case 'datetimerange':
					return 4
				case 'time':
					return 5
				case 'timerange':
					return 6
			}
		},
		valueFormat() {
			switch (this.column.type) {
				case 'date':
				case 'daterange':
					return 'yyyy-MM-dd'
				case 'datetime':
				case 'datetimerange':
					return 'yyyy-MM-dd HH:mm:ss'
				case 'time':
				case 'timerange':
					return 'HH:mm:ss'
			}
		}
	},
	data() {
		return {
			date: '',
			initStartDate: '',
			initEndDate: '',
			showTime: false,
			timeType: '',
			defaultTime: ''
		}
	},
	methods: {
		initValue() {
			const initVal = this.text ? (this.text + '').split(',') : []
			if (!this.validateNull(initVal)) {
				if ([1, 3, 5].includes(this.type)) this.date = initVal[0]
				else if ([2, 4].includes(this.type)) this.date = initVal.join(' 至 ')

				if (initVal[0]) this.initStartDate = timeFormat(this.formatTime(initVal[0]), this.valueFormat)
				if (initVal[1]) this.initEndDate = timeFormat(this.formatTime(initVal[1]), this.valueFormat)
			} else {
				this.date = ''
				this.initStartDate = ''
				this.initEndDate = ''
			}
		},
		handleShowSelect(type) {
			if (this.disabled) return
			if ([1, 2, 3, 4].includes(this.type)) this.$refs.calendar.show()
			else {
				this.timeType = type
				this.defaultTime = this[type]
				this.showTime = true
			}
			this.handleClick()
		},
		formatTime(val) {
			if ([5, 6].includes(this.type)) return '2008-08-08 ' + val
			else return val
		},
		onChange(val) {
			const { result } = val
			if (result) this.text = result
		},
		onClear() {
			if (this.stringMode) this.text = ''
			else this.text = []
			if ([5, 6].includes(this.type)) {
				this.initEndDate = ''
			}
			this.initStartDate = ''
		},
		onConfirm(value) {
			const { hour, minute, second } = value
			const result = `${hour}:${minute}:${second}`
			if (this.type == 5) this.$set(this, 'text', result)
			else {
				if (this.timeType == 'initStartDate') {
					this.initStartDate = result
					setTimeout(() => {
						this.handleShowSelect('initEndDate')
					}, 350)
				} else {
					this.text = [this.initStartDate, result]
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.wf-date {
	width: 100%;
	&-time {
		display: flex;
		align-items: center;
	}
	
	&__field,
	&-time__start,
	&-time__end {
		position: relative;
	
		.u-field {
			padding: 20rpx 0;
		}
	
		&::after {
			position: absolute;
			top: 0;
			left: 0;
			width: 90%;
			height: 90%;
			z-index: 100;
			content: '';
		}
	}
}
</style>
