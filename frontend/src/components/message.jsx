import React from 'react'


import { Alert } from 'react-bootstrap'

 const Message = (props) => {
  return (
    <span style = {{color: "red", fontSize: "20px", margin:"auto", padding: "10px",backgroundColor: "lightcoral"}}>{props.error}</span>
  )
}


export default Message