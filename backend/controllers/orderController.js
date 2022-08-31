const Order = require("../models/orderModels")
const asyncHandler = require("express-async-handler")



const addOrderItems = asyncHandler(async(req,res)=>{

    const {orderItems, shippingAddress,totalPrice } = req.body

    if (orderItems && orderItems.length ===0){

        res.status(400)
        throw new Error("No order items")
        return
    }else{
        const order = new Order ({
            orderItems,
            user: req.user._id,
            shippingAddress,
            totalPrice

        })

        const createdOrder = await order.save()

        res.status(201).json(createdOrder)
    }
})


const getMyOrders = asyncHandler(async(req,res) =>{

    const orders = await Order.find({user: req.user._id})

    res.json(orders)
})




module.exports = {addOrderItems,getMyOrders}