// 获取服务按钮数据
export function fakeServiceButton() {
    return new Promise((resolute, reject) => {
        try {
            const list = [
                {
                    name: '流程中心',
                    img: '/static/images/home/流程中心.svg',
                    url: '/pages/plugin/workflow/pages/workbench/index',
                },
                {
                    name: '料况跟进',
                    img: '/static/images/home/料况跟进.svg',
                    url: 'http://board.eastwinsz.com:8022/webroot/decision/view/report?viewlet=DC%252Fphone%252Fsuplier.cpt&username=',
                },
                // {
                //     name: '仓库',
                //     img: '/static/images/home/n2.png',
                //     url: '/pages/plugin/workflow/pages/warehouse/index',
                // },
                {
                    name: '入库单',
                    img: '/static/images/home/入库单.svg',
                    url: '/pages/application/warehousingentry/list',
                },
                {
                    name: '现场计划单',
                    img: '/static/images/home/计划单.svg',
                    url: '/pages/planSheep/index',
                },
                {
                    name: '工时汇报',
                    img: '/static/images/home/工时汇报.svg',
                    url: '/pages/SNReportWork/index',
                },
                {
                    name: '确认领料',
                    img: '/static/images/home/确认领料.svg',
                    url: '/pages/confirmMaterial/index',
                },
                {
                    name: '物料信息维护',
                    img: '/static/images/home/物料信息维护.svg',
                    url: '/pages/material-info/index',
                },
                {
                    name: '线材质检',
                    img: '/static/images/home/线材质检.svg',
                    url: '/pages/application/wireMaterialInspection/list',
                },
                {
                    name: '出货资料上传',
                    img: '/static/images/home/出货资料上传.svg',
                    url: '/pages/application/outGoodsInfoUpload/list',
                },
                {
                    name: '外协核价',
                    img: '/static/images/home/出货资料上传.svg',
                    url: '/pages/application/outGoodsInfoUpload/list',
                },
				{
				    name: '自助出库',
				    img: '/static/images/home/入库单.svg',
				    url: '/pages/application/warehousOut/list',
				},
				{
				    name: '铭牌绑定',
				    img: '/static/images/home/入库单.svg',
				    url: '/pages/application/NameplateBind/NameplateBind',
				},
				// {
				//     name: '考核报告',
				//     img: '/static/images/home/入库单.svg',
				//     url: '/pages/user/userAssessment/userAssessment',
				// },
                // {
                //     name: '测试',
                //     img: '/static/images/home/测试.svg',
                //     url: '/pages/application/test/index',
                // },
            ];
            resolute(list);
        } catch (e) {
            //模拟接口请求失败
            reject(e);
        }
    });
}
