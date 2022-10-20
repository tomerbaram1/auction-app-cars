const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
  // created: {
  //   type: Date,
  //   default: Date.now
  // },


  title:{
    type:String,
    required: true,
  },
  startprice:
  { type: Number, default: 0,required: true },

  updatedprice:{type:Number, default:0 },

  bidder: {type: String, ref: 'user',default:"No Bidder Found"},

  bid:{type:Number,default:0} ,
  bids:[
    bid={type:Number,default:0},
    bidder={type: String, ref: 'user',default:"No Bids yet"},
  ],
  time:{Date},

  bidStart: {
    type: String,
  },
  bidEnd: {
    type: String,
    required: true
  },
  
  brand: {
    type: String,
    required: true,
  },
  catergory: {
    type: String,
    required: true,
  },
  description:{
    type:String,
    required: true,
  },

  image: {
    type: String,
  },
},
{ timestamps: true })

const Product = mongoose.model('product', ProductSchema);


module.exports = {Product}


  // duration: {
  //   type: Number,
  //   default: 300,
  // },
  // timer: {
  //   type: Number,
  //   default: 300,
  // },
  // soldAt: {
  //   type: Date,
  // },
  // auctionStarted: {
  //   type: Boolean,
  //   default: false,
  // },
  // auctionEnded: {
  //   type: Boolean,
  //   default: false,
  // },
  // bids: [
  //   {
  //     user: {
  //       type: mongoose.SchemaTypes.ObjectId,
  //       ref: 'user',
  //       required: true,
  //     },
  //     amount: {
  //       type: mongoose.SchemaTypes.Decimal128,
  //       required: true,
  //     },
  //     time: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ], 
  // sold: {
  //   type: Boolean,
  //   default: false,
  // },
  // owner: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'user',
  // },
  // purchasedBy: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'user',
  // },
  // currentBidder: {
  //   type: mongoose.SchemaTypes.ObjectId,
  //   ref: 'user',
  // },