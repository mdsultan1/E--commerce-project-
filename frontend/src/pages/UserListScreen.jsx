import React from 'react'

import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Navbar} from "../components/Navbar"
import { listUsers } from '../actions/userActions'
import {Loader} from "../components/loader" 
import Message from "../components/message"



export const UserListScreen = () => {

    const dispatch = useDispatch()
    const userList = useSelector(state => state.userList)
    const {loading,error,users} = userList

  

    useEffect(()=>{
        dispatch(listUsers())
    },[dispatch])


  return (
    <div>

    <Navbar></Navbar>
  
    <div className= "order-wrapper" style = {{padding:"40px"}} >
    <h1>USER LIST</h1>
    <div className='order'>
    <div className = "row">
      <label style = {{flexGrow: "2"}}>ID</label>
      <label>NAME</label>
      <label>EMAIL</label>


    </div>

    { users ? (users.map((user)=>( 
        <div className='column' >

        <span  style = {{flexGrow: "2"}}>{user._id}</span>
        <span>{user.name}</span>
        <span>{user.email}</span>

        </div>)

    )): null}



    </div>
    </div>
    </div>
  )
}
