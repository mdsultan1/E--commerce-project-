
const router = require("express").Router()

const {addOrderItems,getMyOrders} = require('../controllers/orderController')

const {protect,admin} = require("../middlware/authMiddleware")


router.post("/", protect ,addOrderItems)
router.get("/myorders",protect,getMyOrders)

module.exports = router