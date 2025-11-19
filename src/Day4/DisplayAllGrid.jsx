import { Box, Button, Card, CardActions, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TodoUpdatePortamModal from './TodoUpdatePortamModal';

const DisplayAllGrid = ({ refresh, setRefresh }) => {
  const [allTodos, setAllTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);

  const API = import.meta.env.VITE_BASEAPI;

  // Fetch all todos
  const fetchTodos = async () => {
    try {
      const res = await axios.get(`${API}/user/getall`);
      setAllTodos(res.data.data);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [refresh]);

  // Delete Todo
  const handleDelete = async (id) => {
    const userConfirmed = confirm("Do you want to delete this todo?");
    if (!userConfirmed) return;

    try {
      await axios.delete(`${API}/user/delete/${id}`);
      fetchTodos();        // refresh UI
    } catch (error) {
      alert(error.message);
    }
  };

  // Update Todo Status
  const handleStatus = async (id, currentStatus) => {
    try {
      await axios.put(`${API}/user/updateTodo/${id}`, {
        toStatus: !currentStatus
      });

      fetchTodos();        // update UI
    } catch (error) {
      alert(error.message);
    }
  };

  // Open edit modal
  const handleEdit = (id) => {
    setEditTodoId(id);
    setModal(true);
  };

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        All Todos
      </Typography>

      {allTodos.length === 0 ? (
        <Typography>No todos found</Typography>
      ) : (
        allTodos.map((todo) => (
          <Card 
            key={todo._id} 
            sx={{ display: "flex", flexDirection: "column", m: 1, p: 2 }}
          >
            <Typography sx={{ mb: 1 }}>{todo.todoName}</Typography>

            {/* Status Button */}
            <Button 
              variant="contained" 
              onClick={() => handleStatus(todo._id, todo.toStatus)}
              sx={{ mb: 1 }}
            >
              {todo.toStatus ? "Completed" : "Not Completed"}
            </Button>

            <CardActions>
              <Button onClick={() => handleEdit(todo._id)}>Edit</Button>
              <Button color="error" onClick={() => handleDelete(todo._id)}>Delete</Button>
            </CardActions>
          </Card>
        ))
      )}

      <TodoUpdatePortamModal 
        modal={modal} 
        setModal={setModal} 
        editTodoId={editTodoId} 
        setRefresh={setRefresh} 
      />
    </Box>
  );
};

export default DisplayAllGrid;
