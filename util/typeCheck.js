// 函数柯里化
// 如何实现柯里化的通用函数

//我们要做的就是将这个函数使用通用柯里化函数
/* function add(a, b, c, d, e) {
  console.log(a + b + c + d + e)
  return a + b + c + d + e
}
 */
function checkType(type, value) {
	return Object.prototype.toString.call(value) === `[object ${type}]`
}

let util = {}
let types = ['String', 'Boolean', 'Number', 'Null', 'Undefined', 'Object']
types.forEach(type => {
	util[`is${type}`] = curring(checkType)(type)
})
function curring(fn, arr = []) {
	let len = fn.length
	return function(...args) {
		arr = arr.concat(args)
		if (arr.length < len) {
			return curring(fn, arr)
		} else {
			return fn(...arr)
		}
	}
}

module.exports = util