/**
 * 全局变量配置
 */
module.exports = {
    // 上传图片地址
    uplpadUrl: '/api/blade-resource/oss/endpoint/put-file-attach',
    // 应用名
    name: 'Rider',
    // 应用logo，支持本地路径和网络路径
    logo: '/static/images/logo.png',
    // 版本号
    version: '2.1.0',
    // 开发环境接口Url
    // #ifndef H5
    devUrl: 'http://192.168.32.23',
    // #endif
    // 线上环境接口Url
    prodUrl: 'https://rider.bladex.cn',
    // 后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
    contentType: 'application/json;charset=UTF-8',
    // 后端返回状态码
    codeName: 'code',
    // 操作正常code
    successCode: 200,
    // 登录失效code
    invalidCode: 401,
    // 客户端ID
    clientId: 'rider',
    // 客户端密钥
    clientSecret: 'rider_secret',
    // token过期时间
    tokenTime: 3000,
    // 国密sm2公钥使用后端工程 @org.springblade.test.Sm2KeyGenerator 获取
    publicKey:
        '04371300310e53c6bcce15b1b5b6b5429a30211f8cb023d97a7eeda289475cb5d024026f255affacabd06ff215287427b231643e30b0fa88c1673cebcbd91a2a1e',
};
