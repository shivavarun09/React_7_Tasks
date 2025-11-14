import React, { useRef } from 'react'
import {Box, Button, TextField, Typography} from '@mui/material'
const UncontrolledForm = () => {
  const fileRef=useRef(null);
  const textFiedlRef = useRef(null)
  const handleFormSubmit=(e)=>{
    e.preventDefault()
const submittedFile = fileRef.current.files[0];
const fileDescText = textFiedlRef.current.value;
alert(`You selected File  ${submittedFile.name} and it conatins ${fileDescText}`)
  }
  return (
  <Box component="form" onSubmit={handleFormSubmit} sx={{m:2,display:"flex",flexDirection:"column",gap:2,boxShadow:3,p:3}}>
<Typography>Uncontrolled Form using useRef </Typography>
<TextField inputRef={fileRef} type='file' required/>
<TextField inputRef={textFiedlRef} label='Describe the file content'required/>
<Button type='submit' variant='contained'>Submit File</Button>
    </Box>
  )
}

export default UncontrolledForm
