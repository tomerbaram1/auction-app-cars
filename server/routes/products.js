const express = require('express')
const {isAdmin} = require('../middleware/auth')
const {
    getProducts,
    getProduct,
    createProduct,
    deleteProduct,
    updateProduct,
    endBids,
    updateProductBid
} = require('../controllers/productController')

const router = express.Router()
    
    // GET all 
router.get('/', getProducts)
    // GET all 
router.get('/bids', getProducts)

// GET a single 
router.get('/:id', getProduct)

// POST a new 
router.post('/', createProduct)

// DELETE 
router.delete('/:id', deleteProduct)
// DELETE 
// router.delete('/', deleteAllProducts)

// // UPDATE 
router.patch('/:id', updateProduct)
// // UPDATE 
router.patch('/bids', endBids)










// UPDATE a bid
router.patch('/bid/:id', updateProductBid)




// router.patch('/bid', updateProductBid)

 module.exports = router;






















// ==================

// // CREATE

// router.post("/" ,async (req,res)=>{
//       const newProduct = new Product (req.body)
//       try{
//             const savedProduct = await newProduct.save()
//             res.status(200).json(savedProduct)
//         }catch(err){
//               res.status(500).json(err)
//           }
//       })  
      
//       //UPDATE
//       router.put("/:id" , async (req, res) => {
        
//             try {
//                 const updatedProuduct = await Product.findByIdAndUpdate(
//                     req.params.id,
//                     {
//                         $set: req.body,
//                       },
//                       { new: true }
//                     );
//                     res.status(200).json(updatedProuduct);
//                   } catch (err) {
//       res.status(500).json(err);
//     }
//   });

//   //DELETE

//   router.delete("/:id" , async (req, res)=>{
//       try{
//           await Product.findByIdAndDelete(req.params.id)
//           res.status(200).json("Product has been deleted")
//         }catch(err){
//             res.status(500).json(err)
//           }
//         })
      
//         // GET
      
//         router.get("/find/:id", async (req, res)=>{
//             try{
//                 const Product = await Product.findById(req.params.id)
//                 res.status(200).json(Product)
//               }catch(err){
//                   res.status(500).json(err)
//                 }
//               })
            
//               //GET ALL Products
            
//               router.get("/", async (req, res)=>{
//                   const qNEW = req.query.new
//                   const qCategory = req.query.category
//                   try{
//                         let products;
//                         if (qNEW) {
//                               products = await Product.find().sort({createdAt: -1}).limit(5)
//                           }else if (qCategory){
//                                 products = await Product.find({
//                                       categories: {
//                                             $in: [qCategory]
//                                         }
//                                     })
//                                 }else{
//                                       products = await Product.find()
//                                   }
                          
                          
//                                 res.status(200).json(products)
//                               }catch(err){
//                                   res.status(500).json(err)
//                                 }
//                               })
              
                            
                            
                            
                            
                            
                            
                            
                   