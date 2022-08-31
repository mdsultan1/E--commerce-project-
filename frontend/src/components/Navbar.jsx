import React from 'react'
import SearchIcon from '@mui/icons-material/Search'
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { logout } from '../actions/userActions';
import Badge from '@mui/material/Badge';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

import "./home.css"
export const Navbar = () => {
  

  const dispatch = useDispatch()
  const userLogin = useSelector(state=>state.userLogin)
  const {userInfo} = userLogin

  const location = useLocation().pathname
  const logoutHandler = () =>{
    dispatch(logout())

  }

  return (
    <div className = "container">
        <div className = "wrapper">
            {/* <div className = "left"><span>EN</span><input type = "search" className = "search" />
            <SearchIcon/> </div> */}
            <div className = "center" style = {{cursor:"pointer", marginLeft: "60px"}}>
              <Link to = "/">
                MY SHOP
              </Link>
             </div>
            <div className = "right">
                 {userInfo ? (
                   <div className ="dropdown">
                   <button className ="dropbtn"> {userInfo.name}</button>
                   <div className ="dropdown-content">
                     <a href="/profile">Profile</a>
                     <a href="/" onClick = {logoutHandler}>Logout</a>
            
                   </div>
                 </div>

                 ):
                 <div className = "items">
                 <Link to = "/login" state = {{prevLocation: location}}>
                         Login
                   </Link>
                 </div>}
                 
                    <div className = "items">
                      <Link to = "/cart">
                          <ShoppingCartOutlinedIcon />
                      </Link>
            </div>
            </div>
        </div>
    </div>
  )
}
