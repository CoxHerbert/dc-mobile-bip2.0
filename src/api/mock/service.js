// 获取服务数据
export function fakeSubscribeList() {
	return new Promise((resolute, reject) => {
		try {
			const list = [{
					img: '/static/images/service/s1.png',
					name: '违章查询',
					url: ''
				},
				{
					img: '/static/images/service/s2.png',
					name: '限行信息',
					url: ''
				},
				{
					img: '/static/images/service/s3.png',
					name: '油价查询',
					url: ''
				},
				{
					img: '/static/images/service/s4.png',
					name: '消费记录',
					url: ''
				},
				{
					img: '/static/images/service/s5.png',
					name: '保养记录',
					url: ''
				},
				{
					img: '/static/images/service/s6.png',
					name: '油耗记录',
					url: ''
				},
				{
					img: '/static/images/service/s7.png',
					name: '周边查询',
					url: ''
				},
				{
					img: '/static/images/service/s8.png',
					name: '教育咨询',
					url: ''
				}
			];
			resolute(list);
		} catch (e) {
			//模拟接口请求失败
			reject(e);
		}
	})
}

export function fakeServiceList() {
	return new Promise((resolute, reject) => {
		try {
			const list = [{
					name: '交通出行',
					list: [{
							img: '/static/images/service/t1.png',
							name: '地铁',
							url: ''
						},
						{
							img: '/static/images/service/t2.png',
							name: '公交',
							url: ''
						},
						{
							img: '/static/images/service/t3.png',
							name: '自驾',
							url: ''
						},
						{
							img: '/static/images/service/t4.png',
							name: '飞机',
							url: ''
						},
						{
							img: '/static/images/service/t5.png',
							name: '动车',
							url: ''
						},
						{
							img: '/static/images/service/t6.png',
							name: '火车',
							url: ''
						},
						{
							img: '/static/images/service/t7.png',
							name: '摩托车',
							url: ''
						},
						{
							img: '/static/images/service/t8.png',
							name: '自行车',
							url: ''
						}
					]
				},
				{
					name: '社会保险',
					list: [{
							img: '/static/images/service/b1.png',
							name: '人身保险',
							url: ''
						},
						{
							img: '/static/images/service/b2.png',
							name: '财产保险',
							url: ''
						},
						{
							img: '/static/images/service/b3.png',
							name: '火灾保险',
							url: ''
						},
						{
							img: '/static/images/service/b4.png',
							name: '运输保险',
							url: ''
						},
						{
							img: '/static/images/service/b5.png',
							name: '工程保险',
							url: ''
						},
						{
							img: '/static/images/service/b6.png',
							name: '盗窃保险',
							url: ''
						},
						{
							img: '/static/images/service/b7.png',
							name: '农业保险',
							url: ''
						},
						{
							img: '/static/images/service/b8.png',
							name: '信用保险',
							url: ''
						}
					]
				},
			]
			resolute(list);
		} catch (e) {
			//模拟接口请求失败
			reject(e);
		}
	})
}
