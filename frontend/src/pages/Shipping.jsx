import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar} from "../components/Navbar"
import { saveShippingAddress } from '../actions/cartActions'
import { Navigate, useNavigate } from 'react-router-dom'
import { createOrder } from '../actions/orderAction'



export const Shipping = () => {

    const cart = useSelector(state=> state.cart)
    const {shippingAddress} = cart
    const {cartItems} = cart
    const dispatch = useDispatch()

    const navigate = useNavigate()


    const[address,setAddress] = useState(shippingAddress.address)
  const[city, setCity] = useState(shippingAddress.city)
  const[postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const[country, setCountry] = useState(shippingAddress.country)

  const total =  cartItems
    .reduce((acc, item) => acc + item.qty * item.price, 0)
    .toFixed(2)
  console.log(total)
  
  const submitHandler = (e)=>{
      e.preventDefault()
      console.log("submit ")
      dispatch(saveShippingAddress({address,city,postalCode,country}))
      dispatch(createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        totalPrice: Number(total)

      }))
      alert("Order is Processed Successfully")

      navigate("/profile")

  }
  return (

    <div>
        <Navbar></Navbar>

        <div className='shipping-container'>
    <h1 style = {{marginLeft: "auto", marginRight: "auto"}}>SHIPPING</h1>
    <form action="">
    <label >Address</label>
        <input type="text" onChange={(e)=> setAddress(e.target.value)} value = {address} placeholder='    Enter address'/>
        <label >City</label>
        <input type="text" onChange={(e)=> setCity(e.target.value)} value = {city}  placeholder='   Enter city' />
        <label >Postal Code</label>
        <input type="text" onChange={(e)=> setPostalCode(e.target.value)} value = {postalCode}  placeholder  = "   Enter postal code"/>
        <label >Country</label>
        <input type="text" onChange={(e)=> setCountry(e.target.value)} value = {country}  placeholder='   Enter country' />
        <button className = "continue-btn"onClick = {submitHandler} >Submit Order</button>
    </form>
    </div>
    </div>
  )
}
