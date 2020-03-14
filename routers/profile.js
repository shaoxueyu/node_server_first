const token = require('../config/token')
const profileModule = require('../mongo/models/profile')
const getCurrentTime = require('../util/currentTime')

const router = require('express').Router()

// @route POST api/prifile/add
router.post('/add', (req, res) => {
	let profileField = {}
	let _$ = profileField
	let { type, describe, income, expend, cash, remark } = req.body
	_$.type = type || '此处必须填写'
	_$.describe = describe || ''
	_$.income = income || ''
	_$.expend = expend || ''
	_$.cash = cash || ''
	_$.remark = remark || ''
	_$.date = getCurrentTime(2)

	new profileModule(profileField).save().then(profile => {
		res.json(profile)
	})
})

router.post('/all', (req, res) => {
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
	profileModule.update({ _id }, { $set: profileField }).then(data => {
		res.json(data)
	})
})
router.delete('/delete/:id', (req, res) => {
    const _id = req.params.id
    profileModule.deleteOne({_id}).then(data=> {
    
        
       res.json(data)
    }).catch(err => {
        res.json(err)
    })
})

module.exports = router
