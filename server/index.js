// import modules
require('dotenv').config({ path: '.env' });
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port =  process.env.PORT || 5000;
const register = require('./routes/register')
const login = require('./routes/login')
const products = require('./routes/products')
const rateLimit= require('express-rate-limit')
// DB
mongoose.connect(process.env.DB,{
    useNewUrlParser:true,
    useUnifiedTopology: true,

}).then(()=>console.log("Connected To Database!"))
.catch((err)=>console.log('Could not connect to database',err.message));

// middleware
app.use(express.json())
app.use(morgan("dev"));
app.use(cors());
const limiter = rateLimit({
    max:1000,
    windowMs: 60 * 60 * 1000,
    message:"too many requests from this API"
})
app.use(limiter)

// body
app.get("/",(req,res) =>{
    res.send('Welcome to BuyMarket API')
})


// Limit requests from API


// routes
app.use('/api/register',register)
app.use('/api/login',login)
app.use('/api/products',products)

// listener


app.listen(port, () => console.log(`server in running on ${port}`));