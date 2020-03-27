const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('./mongo/index')
const bodyParser = require('body-parser')

const userRouter = require('./routers/users')
const profileRouter = require('./routers/profile')
const port = process.env.PORT || 9000

app.listen(port, () => {
	console.log(`Server open on ${port}`)
})
// 设置可跨域
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'http://localhost:8080')
	res.header('Access-Control-Allow-Credentials', 'true')
	res.header(
		'Access-Control-Allow-Headers',
		'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild'
	)
	res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	next()
})
app.get('/favicon.ico', (req, res) => {
	res.sendFile(path.resolve(__dirname, './public/images/love.jpg'))
})
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/api/user', userRouter)
app.use('/api/profile', profileRouter)

/* app.use('*', (req,res) => {
	res.json({ code: 1, message: '404' })
}) */
