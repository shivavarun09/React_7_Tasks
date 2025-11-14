import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import NotificationPortal from "./NotificationPortal";
import CrashComponent from "./Error-Boundary/CrashCompoent";
import { ButtonGroup, Typography } from "@mui/material";
import ControlledForm from "./ControlledUncontrollerForms/ControlledForm";
import UncontrolledForm from "./ControlledUncontrollerForms/UncontrolledForm";
import ModalHandling from "./UseStateModal/ModalHandling";
import SunnyIcon from '@mui/icons-material/Sunny';
import BedtimeIcon from '@mui/icons-material/Bedtime';
export default function MainApp() {
  const [open, setOpen] = useState(false);  //This is to handle portal Notification from this component
  const [modal,setModal]= useState(false)
  const [theme,setTheme]= useState(false)
  useEffect(()=>{
    if(modal){
    alert("modal will auto close after five seconds using setTimeout(). click ok fast")
    }
setTimeout(()=>{setModal(false)},5000)
  },[modal])
  return (
    <div style={{ padding: 20 ,backgroundColor:theme?"gray":"transparent"}}>
      <Button onClick={()=>setTheme(!theme)}>{theme?<SunnyIcon sx={{color:"black"}}/>:<BedtimeIcon sx={{color:"black"}}/>}</Button>
        <Typography variant="h5">Day3</Typography>

      <ButtonGroup sx={{display:"flex",gap:3}}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Show Notification( ReactDOM.createPortal)
      </Button>
      <Button variant="contained"  onClick={()=>setModal(true)}>
        {modal?"hide modal":"show modal"}
      </Button>
      <CrashComponent/>
      </ButtonGroup>
    

      <NotificationPortal
        open={open}
        message="This notification created using ReactDOM.createPortal "
        onClose={() => setOpen(false)}
      />
      <ControlledForm/>
      <UncontrolledForm/>
      <ModalHandling modal={modal} setModal={setModal}/>
    </div>
  );
}
