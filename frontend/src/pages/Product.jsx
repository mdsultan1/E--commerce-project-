import { Navbar } from "../components/Navbar";
import "../components/home.css"
import React from 'react'
import {Link} from "react-router-dom"
import { useLocation } from "react-router-dom";
import {useState,useEffect} from "react";
import{useDispatch,useSelector} from "react-redux"

import { listProductDetails } from "../actions/productActions";
import {Loader} from "../components/loader"
import Message from "../components/message"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export const Product = () => {



  const [quantity,setQuantity] = useState(1)

  var location = useLocation().pathname.split("/")[2]

  const dispatch = useDispatch()
  const productDetails = useSelector(state => state.productDetails)
  const {product,loading,error} = productDetails

  useEffect(()=>{

    dispatch(listProductDetails(location))

    
  },[dispatch,location])

  return (

    <div><Navbar></Navbar>

    {loading? <Loader/>:error?<Message variant = "danger">{error}</Message>:
    
    <div className = "single-product">
      <Link to ="/">
      
      <ArrowBackIcon style = {{fontSize: "50px",marginRight: "20px"}}/>
      </Link>
  
       <div className = "img-wrapper"> <img src={product? product.image: ""} alt="img" /> </div>
        <div className = "info">

            <h1 style={{fontWeight: "200", marginBottom: "30px"}}>{product.name}</h1>
            <p style={{ marginBottom: "30px"}}>{product.description}</p>
            <div className ="amount-price">
            <span style={{fontSize: "30px",fontWeight: "200", display:"block", marginBottom: "30px"}}>$ {product.price} </span>
            <span >Quantity: </span>
            <select name="quantity" onChange={(e) =>{setQuantity(e.target.value)}} id="">
                <option value="1" >1</option>
                <option value="2" >2</option>
                <option value="3" >3</option>
            </select>
            
            <Link to = {`/cart/${location}?qty=${quantity}`}>

               <button className = "single-prod-btn">Add to Cart</button>
            </Link>
            </div>
        </div>
    </div>
    
    }

</div>  )}
