const mongoose = require("mongoose")

const msgSchema = new mongoose.Schema({
    body:{
        type: String,
        require: true
    },
    author:{
        type: String,
        require: true
    },
    datetime:{
        type: String,
        require: true
    }
})

module.exports = mongoose.model('Message', msgSchema)