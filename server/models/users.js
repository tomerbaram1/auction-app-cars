// imports
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
// schema's
const UserSchema = new mongoose.Schema({
 name:{type: String, required: true, minlength: 3, maxlength:30},
 email:{
    type: String,
    required: true,
    minlength: 5,
    maxlength:200,
    unique:true
 },
 password:{
    type: String,
    required: true,
    minlength: 8,
    maxlength:1024,
 },
isAdmin:{type: Boolean, default: false},

  bids: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'product',
    },
  ]
})


const User = mongoose.model('user', UserSchema);
const genAUthToken = (user => {
    const secretKey = process.env.JWT_SECRET_KEY;
    const token = jwt.sign(
    {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
    },

    secretKey
    
    );
    return token
})



module.exports = {User,genAUthToken}