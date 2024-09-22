const usersModel = require('../models/usersModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config();
const SECRET_KEY = process.env.SECRET_KEY
const ADDED_TO_PASSWORD = process.env.ADDED_TO_PASSWORD


const getUser = async (username, password) => {
    let user = await usersModel.findOne({ username: username })
    if (!user) {
        return "username invalid"
    }
    let decodedPassword = await bcrypt.compare(password + ADDED_TO_PASSWORD, user.password)
    if (decodedPassword) {
        try {
            let token = jwt.sign({ username: user.username, fname: user.fname, lname: user.lname }, SECRET_KEY,
                { expiresIn: "1h" })
            return { user_id: user._id, token }
        } catch (error) {
            return "unable to sign new token"
        }
    } else {
        return "password invalid"
    }
}

const saveNewUser = async (user) => {
    let { password } = user
    try {
        let hashedPassword = await bcrypt.hash(password + ADDED_TO_PASSWORD, 12)
        user = { ...user, password: hashedPassword }
        console.log(user);
        let newUser = await usersModel(user)
        await newUser.save()
        return "user created successfully"
    } catch (error) {
        if (error.keyPattern.username) {
            return 'username already exists. Please choose a different username'
        }else if (error.keyPattern.email) {
            return 'email already exists. Please choose a different email'
        }
         else {
            return "another problem encountered"
        }
    }
}

module.exports = {
    getUser,
    saveNewUser,
}