const bcrypt = require('bcrypt')
const Joi = require('joi')
const express = require('express')
const { User, genAUthToken } = require('../models/users')
const router = express.Router()

router.post("/", async(req,res) =>{
    const { email, password } = req.body
    // validate data
const schema =Joi.object({
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(8).max(200).required()
})
// checked if user already exists
const { error } = schema.validate(req.body);
if ( error ) return res.status(400).send(error.details[0].message);

const user = await User.findOne({ email })
if (!user) return res.status(400).send("Invalid email or password");
const isValid = await bcrypt.compare(password, user.password)
if (!isValid) return res.status(400).send("Invalid email or password");


res.json({
    _id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token: genAUthToken(user._id),
  })
})


module.exports = router