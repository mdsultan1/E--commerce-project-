

const router = require("express").Router()
const Product = require("../models/productModel")
const asyncHandler = require("express-async-handler")

const {protect,admin} = require("../middlware/authMiddleware")


const {getProducts,getProductById,deleteProduct, updateProduct, createProduct} = require("../controllers/productController")

router.get("/", getProducts)
router.post("/", protect,admin,createProduct)

router.get("/:id", getProductById)

router.delete("/:id", protect,admin,deleteProduct)

router.put("/:id", protect,admin, updateProduct)

module.exports = router

