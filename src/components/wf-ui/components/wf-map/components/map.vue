<template>
	<view class="wf-map">
		<map
			:id="mapId"
			style="height: 50vh; width: 750rpx;"
			:latitude="latitude"
			:longitude="longitude"
			:scale="15"
			show-location
			enable-scroll
			enable-zoom
			@regionchange="onRegionchange"
		>
			<!-- #ifndef MP-ALIPAY -->
			<image class="cover-image" :src="require('../images/location.png')"></image>
			<image :src="require('../images/current.png')" class="current-img" @tap="currentLocation"></image>
			<!-- #endif -->
		</map>
		<!-- #ifdef MP-ALIPAY -->
		<image class="cover-image" :src="require('../images/location.png')"></image>
		<image :src="require('../images/current.png')" class="current-img" @tap="currentLocation"></image>
		<!-- #endif -->
		<view class="search"><u-search v-model="searchValue" :show-action="false" @change="onSearch"></u-search></view>
		<view class="list">
			<view class="list-item" v-for="(item, index) in list" :key="index" @click="onSelect(index)">
				<label class="l">
					<p class="list-item__title">{{ item.title }}</p>
					<p class="list-item__address">{{ item.address }}</p>
				</label>
				<radio-group class="r">
					<radio style="transform:scale(0.7)" :value="item.id" :checked="current == index" color="rgb(0, 122, 255)"></radio>
				</radio-group>
			</view>
		</view>
		<view class="button safe-area-inset-bottom">
			<u-button <!-- #ifdef MP -->
				:custom-style="{ width: '320rpx'}"
				<!-- #endif -->
				type="primary" size="medium" @click="onSubmit" > 确定
			</u-button>
			<u-button <!-- #ifdef MP -->
				:custom-style="{ width: '320rpx'}"
				<!-- #endif -->
				type="error" size="medium" @click="onCancel" > 清空
			</u-button>
		</view>
	</view>
</template>

<script>
import QQMapWX from '../libs/qqmap-wx-jssdk.min.js'
import jsonp from '../../../util/jsonp.js'
import md5 from '../../../util/md5.js'
export default {
	data() {
		return {
			mapId: 'AMap' + Math.round(Math.random() * 999),
			mapKey: 'IQ2BZ-5FERX-VVJ4O-ZO7P3-H37Y7-KNBK3',
			SK: 'xsGMIxWGg8hDrwT6npENPBL3PpvhjIG',
			latitude: 39.903811,
			longitude: 116.397915,
			qqmapsdk: null,
			searchValue: '',
			list: [],
			current: -1,
			result: []
		}
	},
	onLoad(options) {
		this.qqmapsdk = new QQMapWX({
			key: this.mapKey
		})

		const { mapId, val } = options
		if (mapId) this.mapId = mapId
		if (val && val.split(',').length == 3) {
			const arr = val.split(',')
			this.longitude = Number(arr[0])
			this.latitude = Number(arr[1])
			this.searchValue = arr[2]
			this.result = arr
		} else this.currentLocation()
	},
	methods: {
		currentLocation() {
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					const { latitude, longitude } = res
					this.latitude = latitude
					this.longitude = longitude
					this.getAddress(latitude, longitude)
				},
				fail: err => {
					uni.showToast({
						title: err
					})
				}
			})
		},
		onRegionchange(e) {
			let maps = uni.createMapContext(this.mapId, this)
			let isEnd = e.type == 'end'
			// #ifdef APP-PLUS || MP-WEIXIN
			isEnd = e.type == 'end' && (e.causedBy == 'scale' || e.causedBy == 'drag')
			// #endif
			if (isEnd) {
				maps.getCenterLocation({
					success: res => {
						const { latitude, longitude } = res
						this.getAddress(latitude, longitude)
					}
				})
			}
		},
		getAddress(latitude, longitude) {
			this.current = -1
			this.latitude = latitude
			this.longitude = longitude
			// #ifdef H5
			jsonp(
				`https://apis.map.qq.com${this._sign('/ws/geocoder/v1/', {
					key: this.mapKey,
					location: `${latitude},${longitude}`,
					coord_type: 5,
					get_poi: 0,
					output: 'jsonp'
				})}`
			).then(res => {
				if (res.status == 0) {
					this.searchValue = res.result.formatted_addresses.recommend
					this.result = [longitude, latitude, this.searchValue]
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
				}
			})
			// #endif
			// #ifndef H5
			this.qqmapsdk.reverseGeocoder({
				location: {
					latitude,
					longitude
				},
				sig: this.SK,
				success: res => {
					if (res.status == 0) {
						this.searchValue = res.result.formatted_addresses.recommend
						this.result = [longitude, latitude, this.searchValue]
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				}
			})
			// #endif
		},
		onSearch(text) {
			if (!text) {
				this.list = []
				return
			}
			// #ifdef H5
			jsonp(
				`https://apis.map.qq.com${this._sign('/ws/place/v1/search', {
					keyword: text,
					key: this.mapKey,
					boundary: `nearby(${this.latitude},${this.longitude},1000,1)`,
					orderby: '_distance',
					page_size: 20,
					page_index: 1,
					output: 'jsonp'
				})}`
			).then(res => {
				if (res.status == 0) {
					this.list = res.data
					if (!this.searchValue && res.data.length > 0) this.searchValue = res.data[0].title
				} else {
					uni.showToast({
						title: res.message,
						icon: 'none'
					})
				}
			})
			// #endif
			// #ifndef H5
			this.qqmapsdk.search({
				keyword: text,
				sig: this.SK,
				success: res => {
					if (res.status == 0) {
						this.list = res.data
						if (!this.searchValue && res.data.length > 0) this.searchValue = res.data[0].title
					} else {
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
					}
				}
			})
			// #endif
		},
		onSelect(index) {
			this.current = index
			const data = this.list[index]
			const { lat, lng } = data.location
			this.latitude = lat
			this.longitude = lng
			this.result = [lng, lat, data.title]
		},
		onSubmit() {
			if (this.result.length != 3) {
				uni.showToast({
					title: '请选择一个地址',
					icon: 'none'
				})
				return
			}
			uni.$emit(`${this.mapId}`, this.result)
			uni.navigateBack({})
		},
		onCancel() {
			uni.$emit(`${this.mapId}`, [])
			uni.navigateBack({})
		},
		_sign(path, data) {
			let url = `${path}?`
			const keys = Object.keys(data).sort()
			keys.forEach((key, index) => {
				url += `${index == 0 ? '' : '&'}${key}=${data[key]}`
			})
			const sign = md5(url + this.SK)
			return `${url}&sig=${sign}`
		}
	}
}
</script>

<style lang="scss">
.wf-map {
	.cover-image {
		height: 68rpx;
		width: 68rpx;
		position: absolute;
		top: 50%;
		left: 50%;
		margin-top: -30rpx;
		margin-left: -30rpx;
	}

	.current-img {
		position: absolute;
		height: 65rpx;
		width: 65rpx;
		bottom: 50rpx;
		right: 20rpx;
		z-index: 9999;
	}

	.search {
		padding: 20rpx;
	}

	.list {
		width: 100%;
		padding: 10rpx 20rpx 180rpx 20rpx;
		height: calc(100vh - 50vh - 84rpx);
		position: fixed;
		overflow-y: scroll;

		&-item {
			border-bottom: 1px dashed #f6f6f6;
			padding: 10rpx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			.l {
				flex: 1;
				display: flex;
				flex-direction: column;
				width: 0;
				margin-right: 8rpx;
			}

			&__title {
				font-size: 30rpx;
				font-weight: 600;
			}

			&__address {
				font-size: 24rpx;
				color: gray;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
	}

	.button {
		width: 100%;
		padding: 10rpx 30rpx calc(env(safe-area-inset-bottom) + 10rpx) 30rpx;
		position: fixed;
		background-color: white;
		z-index: 3;
		bottom: 0;
		left: 0;
		display: flex;
		align-items: center;
		justify-content: space-around;

		::v-deep.u-btn {
			width: 100%;
			padding: 0;
			margin: 0 10rpx;
		}
	}
}
</style>
