import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState ,useRef} from 'react'

const ControlledForm = () => {
  let [formData,setFormData]= useState({});
  const handleFormSubmit=(e)=>{
    e.preventDefault();
  alert(JSON.stringify(formData))

  }

  const handelUserInput=(e)=>{
    const {value,name}=e.target;
setFormData({...formData,[name]:value})
  }
  
  let {userName,userEmail,userMobileNumber}= formData;

  return (
  <Box component="form" onSubmit={handleFormSubmit} sx={{m:2,display:"flex",flexDirection:"column",gap:2,boxShadow:3,p:3}}>
    <Typography>Controlled Form using react State</Typography>
    <TextField value={userName}  name='userName' label="Enter your Name" onChange={handelUserInput} required/>
    <TextField  value={userEmail} name='userEmail' label="Enter your Email" onChange={handelUserInput} required/>
    <TextField value={userMobileNumber} name='userMobileNumber' label="Enter your location" onChange={handelUserInput} required/>
  <Button type='submit' variant='contained' sx={{backgroundColor:"green"}}>Sumbit</Button>
  </Box>
  )
}

export default ControlledForm
