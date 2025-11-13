import React, { useState } from 'react'
import UserCard from './UserCard'
import {Box, Card, Typography,Button} from "@mui/material"
const Parent = () => {
  const [hide,setHide]=useState(false)
  const UserInfo={
    name:"Vijay D",
    place:"Hyderabad",
    age:36
    
  }
  const handleProfileCard=()=>{
setHide(!hide)
  }
  return (
    <Box>
<h2>User Profile</h2>
<UserCard  UserInfo={UserInfo} hide={hide}/>
<Button onClick={handleProfileCard} variant='contained'>{hide?"Show Profile Card":"Hide Profile Card"}</Button>
    </Box>
  )
}

export default Parent
