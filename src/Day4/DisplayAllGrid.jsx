import { Box, Button, Card, CardActions, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
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
    if (!confirm("Do you want to delete this todo?")) return;

    try {
      await axios.delete(`${API}/user/delete/${id}`);
      fetchTodos();
    } catch (error) {
      alert(error.message);
    }
  };

  // Toggle Todo Status
  const handleStatus = async (id, currentStatus) => {
    console.log(id,currentStatus)
    try {
      await axios.put(`${import.meta.env.VITE_BASEAPI}/user/updateTodostatus/${id}`, {
        toStatus: !currentStatus,
      });

      fetchTodos();
    } catch (error) {
      alert(error.message);
    }
  };

  // Open Edit Modal
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
            sx={{ m: 1, p: 2, borderLeft: todo.toStatus ? "5px solid green" : "5px solid orange" }}
          >
            {/* Todo Name */}
            <Typography sx={{ fontSize: "18px", mb: 1, fontWeight: 600 }}>
              {todo.todoName}
            </Typography>

            {/* Status Text */}
            <Typography sx={{ mb: 1 }}>
              Status:{" "}
              <strong style={{ color: todo.toStatus ? "green" : "orange" }}>
                {todo.toStatus ? "Completed" : "Not Completed"}
              </strong>
            </Typography>

        
            {/* Actions */}
            <CardActions sx={{ display: "flex", justifyContent: "space-between",alignItems:"center",alignContent:"center" }}>
              <Button variant="outlined" onClick={() => handleEdit(todo._id)}>
                Edit
              </Button>

    {/* Toggle Status Button */}
            <Button
              variant="contained"
              fullWidth
              color={todo.toStatus ? "success" : "warning"}
              sx={{ mb: 2 }}
              onClick={() => handleStatus(todo._id, todo.todoStatus)}
            >
              {todo.toStatus ? "Mark as Incomplete" : "Mark as Completed"}
            </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </Button>
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
