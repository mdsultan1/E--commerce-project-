import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar} from "../components/Navbar"
import {Loader} from "../components/loader"
import Message from "../components/message"
import { register } from '../actions/userActions'
import { Navigate, useNavigate} from 'react-router-dom'
export const Register = () => {

  const[email,setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[name, setName] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")
  const dispatch = useDispatch()
  const [message, setMessage] = useState(null)
  
  const userRegister = useSelector((state)=> state.userRegister)
  const { loading, error,userInfo } = userRegister
  const navigate = useNavigate()


  const submitHandler = (e) =>{
    e.preventDefault()

    if( confirmPassword !==password){
      setMessage("Passwords do not match")
    }else{
      dispatch(register(name,email,password))
    }
  }
  useEffect(()=>{

    if(userInfo){
      navigate("/")

    }
  },[userInfo])
  return (

    <div><Navbar>
      </Navbar>
    <div className = "register-container">
     
        <div className = "register-wrapper">
          {message && <Message error = {message}></Message>}
          {error && <Message error = {error}></Message>}
          {loading && <Loader></Loader>}

        <h1 style = {{marginLeft: "auto", marginRight: "auto"}}>CREATE AN ACCOUNT</h1>
        <form action="">

            <input type="text" onChange={(e)=> setName(e.target.value)} placeholder='name'/>
            <input type="text" onChange={(e)=> setEmail(e.target.value)} placeholder='email' />
            <input type="password" onChange={(e)=> setPassword(e.target.value)} placeholder  = "password"/>
            <input type="password" onChange={(e)=> setConfirmPassword(e.target.value)} placeholder='confirm password' />
            <button onClick = {submitHandler}>CREATE</button>
        </form>
        
        </div>   
     
    </div>
    </div>
  )
}
