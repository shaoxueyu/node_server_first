const express = require('express')
const app = express()
require('express').foo =1
const mongoose = require('./mongo/index')
const bodyParser = require("body-parser")

const userRouter = require("./routers/users") 
const profileRouter = require("./routers/profile")
const port = process.env.PORT || 9000

app.listen(port, () => {
	console.log(`Server open on ${port}`) 
})
// 设置可跨域
app.use((req,res,next) => {
	res.header("Access-Control-Allow-Origin","http://localhost:8080")
	res.header("Access-Control-Allow-Credentials","true")
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
	next()
})
app.get("/test",(req,res) => {
	res.send("hello world")
})
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use("/api/user",userRouter)
app.use("/api/profile",profileRouter)