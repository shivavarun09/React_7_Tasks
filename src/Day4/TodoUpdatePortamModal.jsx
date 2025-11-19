import * as React from 'react';
import { Box, TextField, Modal, Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

export default function TodoUpdatePortalModal({ modal, setModal, editTodoId ,setRefresh}) {
  const [updateTodo, setUpdateTodo] = useState({});

  const handleTodoUpdate = (e) => {
    e.preventDefault();
    console.log("Updated Todo ID:", editTodoId);
    console.log("Updated Fields:", updateTodo);
    axios.put(`${import.meta.env.VITE_BASEAPI}/user/updateTodo/${editTodoId}`,updateTodo)
  
setRefresh(prev=>!prev)
    setModal(false);
  };

  return (
    <Modal open={modal} onClose={() => setModal(false)}>
      <Box
        component="form"
        onSubmit={handleTodoUpdate}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          boxShadow: 3,
          p: 3,
          background: "white",
          width: 300,
          margin: "150px auto",
        }}
      >
        <TextField
          name="todoName"
          label="Enter todo Title"
          onChange={(e) =>
            setUpdateTodo({ ...updateTodo, [e.target.name]: e.target.value })
          }
        />

        <Button type="submit" variant="contained">
          Update todo
        </Button>
      </Box>
    </Modal>
  );
}
