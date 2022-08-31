import { Navbar } from "../components/Navbar";

import React from 'react'
import products from "../products";
import { fontSize } from "@mui/system";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { useLocation } from "react-router-dom";
import {Link} from "react-router-dom"
import { removeFromCart } from "../actions/cartActions";
import DeleteIcon from '@mui/icons-material/Delete';
import queryString from "query-string"

export const Cart = () => {

  const queryParams = queryString.parse(window.location.search)

  const qty = Number(queryParams.qty)

  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const dispatch = useDispatch()
  const cart = useSelector(state=> state.cart)
  const{cartItems} = cart
 
  useEffect(()=>{

    if(id){
      dispatch(addToCart(id,qty))
    }
  },[dispatch,id,qty])
  
  const removeFromCartHandler = (id) =>{

    dispatch(removeFromCart(id))
  }

  return (
  <div><Navbar></Navbar>
    <div className = "cart-container" style = {{height: "100vh"}}>
         <h1>Shopping Cart</h1>
          <div className = "cart-info" style = {{border: "1px solid black"}}>
          
          <h1 style = {{fontSize: "30px"}}>TOTAL ( {cartItems.reduce((acc, item) => acc + item.qty, 0)} ) ITEMS :  $  {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)}</h1>
                <Link to = "/shipping"  > 
          <button className = "check-btn" disabled = {cartItems.length ===0}>CHECKOUT NOW</button>
          </Link>
          </div>
          
          {cartItems.map((items=>(

            <div> <hr/> <div className = "cart-prod" ><img src = {items.image}/>
            <Link to = {`/product/${items.product}`}>
            <span style = {{position: "absolute" ,top: "60px", left: "400px", fontSize :"20px"}}>{items.name}</span>
            </Link>

            <span style = {{position: "absolute" ,top: "100px", left: "400px", fontSize: "18px", fontWeight: "100"}}>{items.price}</span> 
        
            <span style = {{position: "absolute",top:"140px", left: "400px"}}>Quantity</span>
            <select style = {{position: "absolute",top:"140px", left: "470px"}} value ={items.qty} onChange = {(e)=>{
              dispatch(addToCart(items.product,Number(e.target.value)))
            }} name="quantity" id="">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value = "3">3</option>
            
            </select>
            <DeleteIcon className = "cart-del-btn" fontSize="large"  onClick = {() =>removeFromCartHandler(items.product)}></DeleteIcon>
          
            </div>
      
              <hr/> 
            </div>
          )))}
        
    </div>
  </div>
  )
}
