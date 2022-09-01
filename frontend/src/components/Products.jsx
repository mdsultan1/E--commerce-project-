import React from 'react'
import { Product } from './Product'
import {useDispatch,useSelector} from "react-redux"
import "./home.css"
import {useState,useEffect} from "react"
import axios from "axios"
import { listProducts } from '../actions/productActions'
import Message from "./message";
import { Loader } from "./loader";

export const Products = () => {

  
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList)
  const {loading,error, products} = productList

  useEffect(()=>{


   dispatch(listProducts())

  }, [dispatch])

  
  return (<div>
      <h1 style = {{backgroundColor: "aliceblue", textAlign: "center", padding: "40px 0 20px"}}>Featured Products </h1>

      {loading? <Loader/> :error? <Message variant = "danger">{error}</Message> :

    <div className = "products-container">
        
        { products.map((items)=>(
            <Product items = {items} key = {items._id} />
        ))}

        </div>}
        </div>
  )
}
