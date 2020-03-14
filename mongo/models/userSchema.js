const mongoose = require('mongoose')
const Schema = mongoose.Schema
const getCurrentTime = require("../../util/currentTime")
const UserSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: String,
		required: true
	},
	identity: {
		type: Number,
		required: true
	}
})

module.exports = User = mongoose.model('users', UserSchema)
