import React, { useState } from 'react';
import {Box,
  TextField,
Button,
Checkbox,
FormControlLabel,
FormGroup,
Typography,
Radio,
RadioGroup
} from "@mui/material"

const Form = () => {
  const [formData, setFormData] = useState({  hobbies: [] });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    // For all INPUTS
    if (type === "radio"||"text"||"number") {
      setFormData({ ...formData, [name]: value });
    }

    // For CHECKBOX INPUTS
    if (type === "checkbox") {
      if (checked) {
        // add value to array
        setFormData({
          ...formData,
          [name]: [...formData[name], value],
        });
      } else {
        // remove value from array
        setFormData({
          ...formData,
          [name]: formData[name].filter((item) => item !== value),
        });
      }
    }
  };

  console.log(formData);
  const handleSubmit=(e)=>{
    e.preventDefault();
    if(formData.age<10 ){
    return  alert("Age must be Greather than 10")
    }
return alert(JSON.stringify(formData,null,2))
  }

  return (
    <>
<Box
  component="form"
  onSubmit={handleSubmit}
  sx={{m:5,boxShadow:6,p:3,borderRadius:2}}
>
  <Typography variant='h5' sx={{m:1}}>Form</Typography>
  <FormGroup sx={{gap:2}}>
  <TextField name="name" type='text' label="Enter your name" required onChange={handleChange}/>
  <TextField name="email" type='email' label="Enter your email" required onChange={handleChange}/>
  <TextField name="age" type='number' label="Enter your age" required onChange={handleChange}/>
  </FormGroup>
<RadioGroup >
  <Typography sx={{mt:2}}>Gender</Typography>
  <FormControlLabel
  control={<Radio name='gender' value="Male"/>}
  label="Male"
  />
    <FormControlLabel
  control={<Radio name='gender' value="Female"/>}
  label="Female"
  />
</RadioGroup>

<FormGroup sx={{display:"flex"}}>
<Typography sx={{mt:2}}>Hobbies</Typography>
  <FormControlLabel
  control={<Checkbox name="hobbies" value="watching Movies" onChange={handleChange}/>}
  label="Watching Movies"
/>
<FormControlLabel
  control={<Checkbox name="hobbies" value="watching Anime" onChange={handleChange}/>}
  label="Watching Anime"
/>
<FormControlLabel
  control={<Checkbox name="hobbies" value="Reading Books" onChange={handleChange}/>}
  label="Reading books"
/>
<FormControlLabel
  control={<Checkbox name="hobbies" value="coding" onChange={handleChange}/>}
  label="coding"
/>
<FormControlLabel
  control={<Checkbox name="hobbies" value="Thinking" onChange={handleChange}/>}
  label="Thinking"
/>
</FormGroup>

  <Button variant='contained' type="submit">Submit</Button>
  {/* <pre style={{ marginTop: 20, background: "#eee", padding: 10 }}>
        {JSON.stringify(formData, null, 2)}
      </pre> */}

<Box component="ol">
      {formData?.hobbies?.map(hobbie=>(<li><Typography variant='small' key={hobbie}>{hobbie}</Typography></li>))}

</Box>
</Box>
   
  </>
  );
};

export default Form;
