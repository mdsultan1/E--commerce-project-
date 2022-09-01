import React, { useEffect } from 'react'
import {Navbar} from "../components/Navbar"
import { useState } from 'react'
import axios from 'axios'
import { listProductDetails , updateProduct} from '../actions/productActions'
import { Navigate, useLocation,useNavigate } from 'react-router-dom'
import { useDispatch , useSelector} from 'react-redux'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstant'






export const EditScreen = () => {

    const navigate = useNavigate()


    const productId = useLocation().pathname.split("/")[3]

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState('')
    const [brand, setBrand] = useState('')
    const [category, setCategory] = useState('')
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState('')
    const [uploading,setUploading] = useState(false)

    const dispatch = useDispatch()

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state)=> state.productUpdate)

    const {success} = productUpdate
    

    useEffect(()=>{

        if(success){
            dispatch({type: PRODUCT_UPDATE_RESET})
            navigate("/admin/productlist")
        }else{
            if (!product.name || product._id !== productId){
            dispatch(listProductDetails(productId))
        }
        else{
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)
        }

        }
        
    },[dispatch,productId,product,success])

    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(updateProduct({
             _id: productId,
             name,
             price,
             image,
             brand,
             category,
             description,
             countInStock
        }))
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
    
        try {
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
    
          const { data } = await axios.post('/api/upload', formData, config)
    
          setImage(data)
          setUploading(false)
        } catch (error) {
          console.error(error)
          setUploading(false)
        }
      }



  return (
    <div>
        <Navbar></Navbar>
        
        <div className = "profile-wrapper">
        
    <h1 style = {{marginLeft: "auto", marginRight: "auto"}}> Edit Product </h1>
    <form action="" style ={{margin:"auto", width:"300px"}}>
    <label >Name</label>
        <input type="text" onChange={(e)=> setName(e.target.value)} value = {name} placeholder='Enter name' style = {{width:"150%"}}/>
        <label >Price</label>
        <input type="text" onChange={(e)=> setPrice(e.target.value)} value = {price} placeholder='Enter price'style = {{width:"150%"}} />
        <label >Brand</label>
        <input type="text" onChange={(e)=> setBrand(e.target.value)} value = {brand}placeholder  = "Enter brand" style = {{width:"150%"}}/>
        <label >Image</label>
        <input type="text" onChange={(e)=> setImage(e.target.value)} value = {image} placeholder='Enter image' style = {{width:"150%"}} />
        <input type = "file" onChange = {uploadFileHandler} />
        <label >Category</label>
        <input type="text" onChange={(e)=> setCategory(e.target.value)} value = {category} placeholder='Enter category' style = {{width:"150%"}} />
        <label >Description</label>
        <input type="text" onChange={(e)=> setDescription(e.target.value)} value = {description}placeholder='Enter description' style = {{width:"150%"}} />
        <label >Count In Stock</label>
        <input type="text" onChange={(e)=> setCountInStock(e.target.value)} value = {countInStock} placeholder='Enter count in stock' style = {{width:"150%"}} />
        <button className = "update-btn" onClick = {submitHandler} >Update</button>
        
    </form>
    
    </div>   </div>
  )
}

