const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProfileSchema = new Schema({
    type:{
        type:String
    },
    describe:{
        type:String
    },
    income:{
        type:String
    },
    expend:{
        type:String
    },
    cash:{
        type:String
    },
    date:{
        type:String,
        required: true
    }
})

module.exports = profile = mongoose.model("profile",ProfileSchema)