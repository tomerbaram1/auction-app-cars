const {Product} = require('../models/products')
const {User} = require('../models/users')

const mongoose = require('mongoose')

// get all products
const getProducts = async (req, res) => {
  const products = await Product.find({}).sort({createdAt: -1})

  res.status(200).json(products)
}

// get a single product
const getProduct = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: 'No such car'})
  }

  const product = await Product.findById(id)

  if (!product) {
    return res.status(404).json({error: 'No such car'})
  }

  res.status(200).json(product)
}

// create a new product
const createProduct = async (req, res) => {
  const {title, bid,bidder,bids,time, bidStart, bidEnd, startprice,updatedprice, brand, catergory, description ,image} = req.body

  // add to the database
  try {

    const product = await Product.create({ title, bid, bidder,bids, time, bidStart, bidEnd, startprice,updatedprice, brand, catergory, description ,image})
  
    res.status(200).json(product)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// delete a product
const deleteProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such product'})
    }
  
    const product = await Product.findOneAndDelete({_id: id})
  
    if(!product) {
      return res.status(400).json({error: 'No such product'})
    }
  
    res.status(200).json('deleted')

}
const deleteAllProducts = async (req, res) => {
  const products = Product.find({})
  db.products.deleteMany({})
}

// update a product
const updateProduct = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({error: 'No such product'})
    }
    const product = await Product.findByIdAndUpdate({_id: id},{
       ...req.body
    })
    if(!product) {
        return res.status(400).json({error: 'No such product'})
      }
      res.status(200).json(product)
}

// disable bidding if the time is over

const endBids = async (req,res) => {
  const { id,bid,bidEnd } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'No such product'})
  }
  const Nobids = await Product.findOneAndUpdate({_id: id, bid:bid, bidEnd:bidEnd},{
    ...req.body})
    if(!Nobids) {
      return res.status(400).json({error: 'No such product'})
    }
    if(bidEnd="The auction ended"){
      bid=bid
      res.status(200).json(Nobids,"Bid over")
    }
 }

// update bid
const updateProductBid = async (req, res) => {
  let { bid, updatedprice } = req.body;
  let id = req.params.id
  console.log(req.body);
  Product.find({ id: id }, (err, foundProduct) => {
    console.log(id);
    if (!err) {
      if (foundProduct) {
        Product.findOneAndUpdate(
          { id: id },
          {
              bid: bid,
              updatedprice: updatedprice,

          },
      
          (err, foundProduct) => {
            if (!err) {
              console.log("Updated: ", foundProduct.title);
              //need to send a response else the fetch hangs up
              res.status(200).json({ success: true });
            } else {
              console.log("Error: ", err);
            }
          }
        );
      } else {
        res.status(200).json({ success: true });
      }
    } else {
      console.log("Error: ", err);
    }
  });
};


module.exports = {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    updateProductBid,
    deleteAllProducts,
    endBids
}