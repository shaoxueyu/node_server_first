const token = require('../config/token')
const profileModule = require('../mongo/models/profile')
const getCurrentTime = require('../util/currentTime')

const router = require('express').Router()

// 检查token 中间件
router.use((req, res, next) => {
	const authorization = req.get('Authorization')
	// 拿去token
	let tokenStr = authorization || req.get('set-cookie') || req.body.token
	if (!tokenStr) return res.json({ code: 1, message: '无相关token信息' })

	//做一遍token过滤
	tokenStr =
		tokenStr.split(' ').length === 1 ? tokenStr : tokenStr.split(' ')[1]

	let p = token.checkToken(tokenStr)
	p.then(data => {
		/* res.json(data) */
		next()
	}).catch(err => {
		res.json({ code: 1, message: '身份认证过期，请重新登录', error: err })
	})
})

// @route POST api/prifile/add
router.post('/add', (req, res) => {
	let profileField = {}
	let _$ = profileField
	let { type, describe, income, expend, cash, remark } = req.body
	_$.type = type || '此处必须填写'
	_$.describe = describe || ''
	_$.income = income || ''
	_$.expend = expend || ''
	_$.cash = cash
	_$.remark = remark || ''
	_$.date = getCurrentTime(2)

	new profileModule(profileField).save().then(profile => {
		res.json(profile)
	})
})

router.get('/all', (req, res) => {
	profileModule
		.find()
		.then(data => {
			res.json(data)
		})
		.catch(err => {
			console.log(err)
		})
})
router.post('/edit', (req, res) => {
	let profileField = {}
	let _$ = profileField
	let { type, describe, income, expend, cash, remark, _id } = req.body
	_$.type = type || '此处必须填写'
	_$.describe = describe || ''
	_$.income = income || ''
	_$.expend = expend || ''
	_$.cash = cash || ''
	_$.remark = remark || ''
	_$.date = getCurrentTime(2)
	console.log(profileField)
	profileModule
		.updateOne({ _id }, { $set: profileField })
		.then(data => {
			res.json({ code: 0, message: '修改成功' })
		})
		.catch(err => {
			console.log(err)
		})
})
router.delete('/delete/:id', (req, res) => {
	const _id = req.params.id
	profileModule
		.deleteOne({ _id })
		.then(() => {
			res.json({code:0,message:"删除成功"})
		})
		.catch(err => {
			res.json(err)
		})
})

module.exports = router
