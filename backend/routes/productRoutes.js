

const router = require("express").Router()
const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")



const {getProducts,getProductById} = require("../controllers/productController")

router.get("/", getProducts)

router.get("/:id", getProductById)

module.exports = router

