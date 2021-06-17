const mongoose = require('mongoose')

const Schema = mongoose.Schema;
const usersSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password1: {
        type: String,
        required: true,
    },
    password2: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    },
    health: {
        type: Number,
        required: true
    },
    gold: {
        type: Number,
        required: true
    },
    inventory: {
        type: Array,
        required: true
    },
    image: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model("gameUserDb", usersSchema)


