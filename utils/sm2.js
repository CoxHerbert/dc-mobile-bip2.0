// sm4 加密
export function encryption(params) {
	const SM4 = require("sm-crypto").sm4
	const key = '0123456789abcdeffedcba9876543212'; // 提供的密钥
	const iv = 'fedcba98765432100123456789abcdaf'; // 提供的IV
	const config = {
		key: key, // 密钥
		mode: 'cbc', // 加密模式
		iv: iv // 初始化向量
	};
	return SM4.encrypt(params,key,iv);
}
 
// sm4 解密
export function decryption(params) {
	const SM4 = require("sm-crypto").sm4
	const key = '0123456789abcdeffedcba9876543212'; // 提供的密钥
	const iv = 'fedcba98765432100123456789abcdaf'; // 提供的IV
	return SM4.decrypt(params,key,iv); // 第一个参数是加密数据的编码，第二个参数是输出编码
}