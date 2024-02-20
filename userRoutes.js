const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const userModel = require("./models/Users.js")
const jwt = require("jsonwebtoken")
const UserModel = require("./models/Users.js")

router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body
    const user = await userModel.findOne({email})
    if(user) {
        return res.json({message: "User already exists"})
    }
    const hashPassword = await bcrypt.hash(password, 10)
    const newUser = new UserModel({
        username,
        email,
        password: hashPassword,
    })
    await newUser.save()
    return res.json({status: true, message: "Added a new user"})
})

router.post('/login', async (req, res) => {
    const {email, password} = req.body
    const user = await userModel.findOne({email})
    if(!user){
        return res.json({message: "Invalid User"})
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if(!validPassword) {
        return res.json({message: "Incorrect Password"})
    }
    const token = jwt.sign({username: user.username}, process.env.KEY, {expiresIn: '30d'})
    return res.json({status: true, message: "Logged In Successfully", token: token})
})

module.exports = router