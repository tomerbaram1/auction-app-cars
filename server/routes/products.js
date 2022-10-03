const express = require('express')
const { Product } = require('../models/products')
const router = express.Router()

// Get all Method
router.get("/",async(req,res)=>{
	const products = await Product.find({})
	return res.send(products)
})

router.post("/",async(req,res))
const { title, description, startprice } = req.body
const product = await Product.findOne({ title })
if (!product) return res.status(400).send("Invalid Item");

res.json({
    _id: product.id,
    title: product.title,
    description: product.description,
	startprice: product.startprice

  })





module.exports = router;