
const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")

const getProducts = asyncHandler(async(req,res) =>{
    const products = await Product.find({})
    res.json(products)
})

const getProductById   = asyncHandler(async (req,res) =>{

    const product = await Product.findById(req.params.id)

    if(product){
        res.json(product)

    }else{
        res.status(404).json({message:"Product not found in dB"})
    }

})

module.exports = {getProducts,getProductById}