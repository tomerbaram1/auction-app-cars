const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
title:{
    type:String,
    required: true,
},
description:{
    type:String,
    required: true,
},
startprice:{
    type:String,
    required: true,
}})

const Product = mongoose.model('product', ProductSchema);


module.exports = {Product}