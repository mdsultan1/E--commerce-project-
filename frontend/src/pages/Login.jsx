import React, { useEffect } from 'react'
import { useState } from 'react'
import {useDispatch} from "react-redux"
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../actions/userActions'
import {Loader} from "../components/loader"
import Message from "../components/message"
import {Navbar} from "../components/Navbar"
export const Login = () => {
  const navigate = useNavigate()

  const location = useLocation()
  const prev = location.state.prevLocation
  
  const[email,setEmail] = useState("")
  const[password, setPassword] = useState("")
  const dispatch = useDispatch()
  const userLogin = useSelector(state => state.userLogin)

  const{loading,error,userInfo} = userLogin

  useEffect(()=>{

    if(userInfo){
      navigate(prev)

    }
  },[userInfo])
  
  const submitHandler = (e) =>{

    e.preventDefault()
    dispatch(login(email,password))

  }  

  
 return ( 
   <div>
  <Navbar></Navbar>
    <div className = "login-container">
      
   
        <div className = "login-wrapper">

        {error && <Message error = {error}></Message>}
      {loading && <Loader></Loader>}
            <h1>Login</h1>
        <form action="">

            <input type="text" placeholder='email' onChange = {(e)=> setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' onChange = {(e)=> setPassword(e.target.value)} />
            <button onClick = {submitHandler}>Login</button>
            <a href="" style = {{textDecoration:"underline", cursor: "pointer"}} > Forgot your password</a>
            <a href="/register" style = {{textDecoration:"underline", cursor: "pointer"}}>Create A New Account</a>
        </form>
        
        </div>   
         </div>
         </div>
  )
}
