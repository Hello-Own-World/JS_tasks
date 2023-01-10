const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    login:{
        type: String,
        require: true
    },
    pass:{
        type: String,
        require: true
    },
    firstName:{
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    phone:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('User', userSchema)