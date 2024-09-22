const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const authBLL = require('../BLL/authBLL')



router.post('/login', async (req, res) => {
    let { username, password , } = req.body
    let response = await authBLL.getUser(username, password)
    res.send(response)
})
router.post('/register', async (req, res) => {
    let userDetails = req.body
    let response = await authBLL.saveNewUser(userDetails)
    res.send(response)

})





module.exports = router