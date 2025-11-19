import { Box, Button, Card, CardActions, Modal, Typography ,TextField} from '@mui/material'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import TodoUpdatePortamModal from './TodoUpdatePortamModal';

const DisplayAllGrid = ({refresh,setRefresh}) => {
  const [allTodos, setAllTodos] = useState([]);
  const [modal,setModal] = useState(false);
  const [editTodoId,setEditTodoId] =useState()

  const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/user/getall");
      setAllTodos(res.data.data);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  const handleDelete = async (id) => {
    const userConfirmed = confirm("Do you want to delete todo?");
    if (!userConfirmed) return;

    try {
      await axios.delete(`${import.meta.env.VITE_BASEAPI}/user/delete/${id}`);
      // refresh list
      fetchTodos();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleEdit=async(id)=>{
    setEditTodoId(id)
setModal(true)
  }


  return (
    <Box>
      <Typography>Hello</Typography>

      {allTodos.length === 0 ? (
        <Typography>No todos Found</Typography>
      ) : (
        allTodos.map((todo) => (
          <Card 
            key={todo._id} 
            sx={{ display: "flex", flexDirection: "column", m: 1 }}
          >
            <Typography sx={{ p: 2 }}>{todo.todoName}</Typography>

            <CardActions>
              <Button onClick={()=>handleEdit(todo._id)}>Edit</Button>
              <Button onClick={() => handleDelete(todo._id)}>Delete</Button>
              <Button onClick={() => handelStatus(todo._id)}>Delete</Button>
            </CardActions>
          </Card>
        ))
      )}
<TodoUpdatePortamModal modal={modal} setModal={setModal} editTodoId={editTodoId} setRefresh={setRefresh}/>
      
    </Box>
  );
};

export default DisplayAllGrid;
