// 密码加密
const crypto = require("crypto")
const typeCheck = require('./typeCheck')
const typeString = typeCheck["isString"]
module.exports = function(password) {
	const md5 = crypto.createHash("md5")
	if (!typeString(password)) {
		return false
	} else {
		return md5.update(password,"utf8").digest("hex")
	}
}
