import { Button, Select, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import {Box} from '@mui/material'
import axios from 'axios'
import DisplayAllGrid from './DisplayAllGrid'
const Day4 = () => {
  const [todo,setTodo]= useState({todoStatus:false,todoName:""});
  const [refresh,setRefresh] = useState(false);
  const [loading,setLoadin] = useState(false)
  const handleTodo=async(e)=>{
  try{
e.preventDefault();
    await axios.post(`${import.meta.env.VITE_BASEAPI}/user/addtodo`,todo)
    alert("todo posted successfully")
    setRefresh(prev=>!prev)
  }catch(e){
alert(`${e.message}`)
  }
  }
  return (
    <>
    <Box component="form" onSubmit={handleTodo} sx={{display:"flex",flexDirection:"column",gap:2,boxShadow:3,p:3}}>
<TextField name="todoName" label="Enter todo Title" onChange={(e)=>setTodo({...todo,[e.target.name]:e.target.value})} />
<Button onClick={handleTodo}  variant='contained'>Add to todo List</Button>
    </Box>
    <Box>
      <DisplayAllGrid refresh={refresh} setRefresh={setRefresh}/>
    </Box>
    </>
  )
}

export default Day4
