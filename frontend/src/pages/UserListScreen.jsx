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
        <h1>User</h1>




    </div>
  )
}
