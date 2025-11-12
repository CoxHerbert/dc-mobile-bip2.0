<template>
    <view
        class="comp-dc-weght"
        :class="{
            disabled: disabled,
        }"
    >
        <view class="input-wrapper">
            <dc-number :value="value" :min="0" :placeholder="placeholder" />
            <view class="btn-done" @click="handleInputClick">取称重</view>
        </view>
        <u-popup v-model="visible" mode="bottom" height="90%" border-radius="14" safe-area-inset-bottom>
            <template>
                <dc-radio
                    v-model="selectedValue"
                    :options="options"
                    :labelKey="'label'"
                    :valueKey="'value'"
                    @close="handleClose"
                >
                    <template #01="scoped">
                        <view class="info">
                            <view class="weight">{{ weightInfo[scoped.item.value].weight || '-' }}</view>
                            <view class="unit">{{ weightInfo[scoped.item.value].unit || '-' }}</view>
                        </view>
                    </template>
                    <template #02="scoped">
                        <view class="info">
                            <view class="weight">{{ weightInfo[scoped.item.value].weight || '-' }}</view>
                            <view class="unit">{{ weightInfo[scoped.item.value].unit || '-' }}</view>
                        </view>
                    </template>
                </dc-radio>
            </template>
        </u-popup>
    </view>
</template>
<script>
import { io } from 'socket.io-client';
export default {
    name: 'dc-select-popup',
    props: {
        disabled: {
            type: Boolean,
            default() {
                return false;
            },
        },
        value: {
            type: String,
            default() {
                return '';
            },
        },
        placeholder: {
            type: String,
            default() {
                return '';
            },
        },
    },
    data() {
        return {
            weightInfo: {
                '01': {},
                '02': {},
            },
            socket: null,
            options: [
                {
                    label: '地磅',
                    value: '01',
                },
                {
                    label: '台秤',
                    value: '02',
                },
            ],
            selectedValue: '',
            visible: false,
        };
    },
    created() {
        this.initWebsocket();
    },
    computed: {
        label() {
            return (this.dictData || []).find((d) => d[this.valueKey] == this.value)?.[this.labelKey] || '';
        },
    },
    beforeDestroy() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            console.log('socket 已断开');
        }
    },
    methods: {
        initWebsocket() {
            const that = this;
            return new Promise((resolve, reject) => {
                that.socket = io('/weight', {
                    transports: ['websocket'],
                });

                that.socket.on('connect', () => {
                    console.log('连接成功');
                    that.socket.emit('message', '前端连接成功');
                });

                that.socket.on('weightChange', (data) => {
                    const weightData = JSON.parse(data);
                    if (weightData.eqId) {
                        this.$set(this.weightInfo, weightData.eqId, weightData);
                    }
                });
            });
        },
        async handleInputClick() {
            if (this.disabled) {
                return;
            }
            this.visible = true;
        },
        handleClose() {
            this.visible = false;
            const valueSet = this.weightInfo[this.selectedValue]?.weight;
            this.$emit('input', valueSet);
            this.$emit('change', valueSet);
        },
    },
};
</script>
<style lang="scss">
.comp-dc-weght {
    position: relative;
    width: 100%;
    height: 100%;
    min-height: 40px;
    ::v-deep.input-wrapper {
        min-height: 40px;
    }
    .input-wrapper {
        display: flex;
        align-items: center;
        align-content: center;
        flex-flow: row nowrap;
    }
    .btn-done {
        margin-right: 8px;
        display: inline-block;
        border-radius: 6px;
        width: 60px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #2979ff;
    }
    &.disabled {
        width: calc(100% - 8px);
        background-color: rgba(0, 0, 0, 0.05);
    }

    .info {
        height: 48px;
        flex: 1;
        display: flex;
        line-height: 48px;
        margin-left: 20px;
    }
}
</style>
