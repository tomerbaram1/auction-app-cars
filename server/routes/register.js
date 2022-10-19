const bcrypt = require('bcrypt')
const Joi = require('joi')
const express = require('express')
const { User, genAUthToken } = require('../models/users')
const router = express.Router()

// Get all Method
router.get("/",async(req,res)=>{
	const users = await User.find({})
	return res.send(users)
})


// Post Method
router.post('/',async (req,res) => {

// validate data
const schema =Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(8).max(200).required()
})
// checked if user already exists
const { error } = schema.validate(req.body);
if ( error ) return res.status(400).send(error.details[0].message);
const userExists  = await User.findOne({ email: req.body.email});
if (userExists) return res.status(400).send("User already exists");
// create a document
let user = new User({
    name: req.body.name,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    password: req.body.password
});

// hash password(so no one could access the info)
const salt = await bcrypt.genSalt(10)
user.password = await bcrypt.hash(user.password, salt)

if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genAUthToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
  user = await user.save()
  
})



// Delete One Method
router.delete("/:id",async(req,res) =>{
    await User.findByIdAndRemove({ _id: req.params.id })
    return res.send('user deleted')
   })

module.exports = router;
