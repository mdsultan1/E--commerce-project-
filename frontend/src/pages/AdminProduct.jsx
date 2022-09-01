import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar} from "../components/Navbar"
import { useNavigate } from 'react-router-dom'
import {listProducts,deleteProduct,createProduct} from "../actions/productActions"
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'
import { Link } from 'react-router-dom'


export const AdminProduct = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const productList = useSelector((state)=>state.productList)

    const {products} = productList

    const  productDelete = useSelector((state)=> state.productDelete)
    const {success: successDelete} = productDelete

    const productCreate = useSelector((state)=> state.productCreate)

    const {product: createdProduct,success:successCreate} = productCreate

    const userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    useEffect(()=>{
        dispatch({type: PRODUCT_CREATE_RESET})
        if(!userInfo.isAdmin){
          navigate("/login")
        
        }if(successCreate){
          navigate(`/admin/product/${createdProduct._id}/edit`)
        }
        else{
            dispatch((listProducts()))
        }
    },[dispatch,userInfo,successDelete,successCreate,createdProduct])

    const deleteHandler = (id)=>{
      console.log("pressed delete ")
      dispatch(deleteProduct(id))
    }
    const createProductHandler = () =>{
      dispatch(createProduct())
    }

  return (
    <div>

        <Navbar></Navbar>
        <div className= "order-wrapper" style = {{padding:"40px"}} >
    <div style ={{display: "flex", justifyContent: "space-evenly", marginBottom:"40px"}}>
    <h1>PRODUCTS LIST</h1>
    <button style ={{display: "inline-block", backgroundColor:"black",color: "white"}} onClick = {createProductHandler}>CREATE PRODUCT</button>
    </div>
    <div className='order'>

    <div className = "row">
      <label style = {{flexGrow: "2"}}>PRODUCT ID</label>
      <label>NAME</label>
      <label>PRICE </label>
      <label></label>
    </div>

    { products ? (products.map((product)=>( 
        <div className='column' >

        <span  style = {{flexGrow: "2"}}>{product._id}</span>
        <span>{product.name}</span>
        <span>{product.price}</span>
        <span style={{display: "flex", justifyContent: "space-around", alignItems:"center"}}>
          <Link to={`/admin/product/${product._id}/edit`}>
            <button style = {{marginRight:"10px", height:"50%"}}>Update</button>
          </Link>
          <button style = {{height:"50%", backgroundColor:"crimson"}} onClick = {() =>deleteHandler(product._id)}>Delete</button>
        </span>


        </div>)

    )): null}

    </div>
    </div>
        
    </div>
  )
    }
