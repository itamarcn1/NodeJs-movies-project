const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    "fname": {type:String, required: true},
    "lname": {type:String, required: true},
    "age": {type:Number, required: true},
    "address": {type:String, required: true},
    "email": {type:String, required: true, unique: true},
    "username": {type:String, required: true, unique: true},
    "password": {type:String, required: true, unique: true},
}, {
    versionKey: false
})

const userModel = new mongoose.model("user", userSchema, "users")

module.exports = userModel;