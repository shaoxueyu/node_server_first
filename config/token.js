const jwt = require('jsonwebtoken')

const checkObject = require('../util/typeCheck')['isObject']
const secret = 'smallker'
/* jwt.sign(
					rule,
					'smallker',
					{ expiresIn: 3600 },
					(err, token) => {
						if (err) throw err
						res.json({ code: 0, message: '登录成功', token })
						return
					}
        ) */

function createToken(payload) {
	if (!checkObject(payload)) {
		return new TypeError('Please pass in the object!')
    }
    return new Promise((resolve,reject) => {
        jwt.sign(payload, secret, { expiresIn: Math.floor(Date.now() / 1000) + 24 * 60 * 60  },(err, token) => {
            if(err) reject(err)
            resolve(token)
        });
    })
    
}

function checkToken(token) {
	return new Promise((resolve, reject) => {
		jwt.verify(token, secret, (err, res) => {
			resolve({ err, res })
		})
	})
}
module.exports = { createToken, checkToken }
