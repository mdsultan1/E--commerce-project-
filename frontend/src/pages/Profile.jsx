import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar} from "../components/Navbar"
import Message from "../components/message"
import { getUserDetails,updateUserProfile } from '../actions/userActions'
import { listMyOrders } from '../actions/orderAction'
import {  useNavigate} from 'react-router-dom'


export const Profile = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
  
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    const userDetails = useSelector((state) => state.userDetails)
    const {user,loading,error} = userDetails
    
  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
    const { success } = userUpdateProfile

    const orderListMy = useSelector((state) => state.orderListMy)
   
    const {loading: loadingOrders, error: errorOrders,orders} = orderListMy
     

    useEffect(()=>{

        if(!userInfo){
          navigate("/login")
        }
        else{
            if(!user.name){
              
                dispatch(getUserDetails("profile"))
                dispatch(listMyOrders())
                
            }else{
                setName(user.name)
                setEmail(user.email)

            }
        }
      },[userInfo,dispatch,user,orders,loadingOrders])
        const submitHandler = (e) =>{
           e.preventDefault()
    
        if( confirmPassword !==password){
          setMessage("Passwords do not match")
        }else{
          dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
      }
  return (
    <div>
    <Navbar></Navbar>
   
    <div className = "profile-container">
  
      <div className = "profile-wrapper">
        
      <h1 style = {{marginLeft: "auto", marginRight: "auto"}}>USER PROFILE </h1>
      <form action="">
      <label >Name</label>
          <input type="text" onChange={(e)=> setName(e.target.value)} value = {name} placeholder='Enter name'/>
          <label >Email</label>
          <input type="text" onChange={(e)=> setEmail(e.target.value)} value = {email} placeholder='Enter email' />
          <label >Password</label>
          <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder  = "Enter password"/>
          <label >Confirm Password</label>
          <input type="password" onChange={(e)=> setConfirmPassword(e.target.value)} placeholder='confirm password' />
          <button className = "update-btn" onClick = {submitHandler}>Update</button>
          {message && <Message error = {message}></Message>}
      </form>
      
      </div>   
   
  <div className= "order-wrapper" >
      <h1>MY ORDERS</h1>
      <div className='order'>
      <div className = "row">
        <label style = {{flexGrow: "2"}}>ID</label>
        <label>DATE</label>
        <label>TOTAL</label>


      </div>

      { orders ? (orders.map((order)=>( 
          <div className='column' >

          <span  style = {{flexGrow: "2"}}>{order._id}</span>
          <span>{order.createdAt.substring(0,10)}</span>
          <span>{order.totalPrice}</span>

          </div>)

      )): null}

  </div>
  </div>
  </div>
  </div>

  )
}
