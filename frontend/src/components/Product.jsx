import React from 'react'
import "./home.css"
import {Link} from "react-router-dom"
export const Product = ({items}) => {
  return (
    <div className = "product-container">

      
        <img className = "product-img" src = {items.image} alt = "img of items"/>
      
        <p style = {{marginBottom: "10px"}}className = "product-title">{items.name}</p>
        <p className = "product-price"  >$ {items.price}</p>

      <Link to = {`/product/${items._id}`}>
        <button className = "add-btn">View Product</button>
      </Link>
    </div>
  )
}
