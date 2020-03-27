const router = require('express').Router()

const userModel = require('../mongo/models/userSchema')
const bcrypt = require('../util/bcrypt')
const gravatar = require('gravatar')
const token = require('../config/token')
const getCurrentTime = require('../util/currentTime')
// //检查token
// router.use((req, res, next) => {
// 	const authorization = req.get('Authorization')
// 	let tokenStr = ''
// 	tokenStr = authorization
// 		? authorization.split(' ')[1] || authorization
// 		: (req.body.token &&
// 				(req.body.token.split(' ')[1] ||
// 					req.body.token.split(' ')[0])) ||
// 		  req.get('set-cookie').split(' ')[1] ||
// 			req.get('set-cookie')
// 			console.log(tokenStr);
// 	let p = token.checkToken(tokenStr)
// 	p.then(data => {
// 		/* res.json(data) */
// 		next()
// 	}).catch(err => {
// 		res.json({ code: 1, message: '身份认证过期，请重新登录', error: err })
// 	})
// })

router.post('/register', (req, res) => {
	userModel.findOne({ email: req.body.email }).then(user => {
		if (user) {
			return res.json({ message: '邮箱已被注册', code: 1 })
		} else {
			let body = req.body
			let { name, email, avatar, password, identity } = body
			avatar = gravatar.url(body.email, { s: '200', r: 'pg', d: 'mm' })
			password = bcrypt(password)
			if (!password) {
				return res.json({ code: 1, message: '密码格式错误请重新填写' })
			}
			identity = !identity ? '10' : '10000'
			const newUser = new userModel({
				name,
				email,
				password,
				identity,
				avatar:
					'https://i1.hdslb.com/bfs/face/0e2a5cdc80b1317a30dbf8b081af5a2ca84001ef.jpg@52w_52h.webp',
				date: getCurrentTime(2)
			})
			newUser
				.save()
				.then(user => {
					console.log(user)
					res.json({ message: '恭喜你，注册成功！', code: 0 })
				})
				.catch(err => {
					res.json(err)
				})
		}
	})
})
router.post('/login', (req, res) => {
	let email = req.body.email
	userModel.findOne({ email }).then(user => {
		if (!user) {
			return res.status(401).json({ code: 1, message: '用户名不存在' })
		} else {
			if (bcrypt(req.body.password) !== user.password) {
				return res.json({ code: 1, message: '密码错误' })
			} else {
				const rule = {
					id: user.id,
					name: user.name,
					avatar:
						user.avatar ||
						'https://i1.hdslb.com/bfs/face/0e2a5cdc80b1317a30dbf8b081af5a2ca84001ef.jpg@52w_52h.webp',
					identity: user.identity
				}
				token
					.createToken(rule)
					.then(data => {
						res.json({
							code: 0,
							message: '登录成功,正在跳转页面，请稍后...',
							token: 'Smallker ' + data
						})
					})
					.catch(err => {
						console.log(err)
					})
			}
		}
	})
})
//TODO: 还是不够安全，后期可以使用https，或者加上本机mac地址认证
router.post('/checkToken', (req, res) => {
	checkToken(req, res)
})

function checkToken(req, res) {
	const authorization = req.get('Authorization')
	let tokenStr = ''
	tokenStr = authorization
		? authorization.split(' ')[1] || authorization
		: (req.body.token &&
				(req.body.token.split(' ')[1] ||
					req.body.token.split(' ')[0])) ||
		  req.get('set-cookie').split(' ')[1] ||
		  req.get('set-cookie')
	let p = token.checkToken(tokenStr)
	p.then(data => {
		res.json(data)
	}).catch(err => {
		console.log(err)
	})
}
module.exports = router
