import { Box, Button, ButtonGroup, Card, CardActions, MenuItem, Select, Typography } from '@mui/material';
import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import TodoUpdatePortamModal from './TodoUpdatePortamModal';

const DisplayAllGrid = ({ refresh, setRefresh }) => {
  const [allTodos, setAllTodos] = useState([]);
  const [modal, setModal] = useState(false);
  const [editTodoId, setEditTodoId] = useState(null);
  const [filter, setFilter] = useState("all");

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
    try {
      await axios.put(`${API}/user/updateTodostatus/${id}`, {
        todoStatus: !currentStatus,
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

  // FILTERED TODOS
  const filteredTodos = useMemo(() => {
    if (filter === "all") return allTodos;
    if (filter === "completed") return allTodos.filter(todo => todo.todoStatus === true);
    if (filter === "not-completed") return allTodos.filter(todo => todo.todoStatus === false);
  }, [filter, allTodos]);

  return (
    <Box>
      {/* FILTER SECTION */}
      <Box sx={{ display: "flex", gap: 2, m: 2, alignItems: "center" }}>
        <Typography variant="h5">All Todos</Typography>

        <Select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          size="small"
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="not-completed">Not Completed</MenuItem>
        </Select>
        <Typography variant="h5">Total Todos:{filteredTodos.length}</Typography>
      </Box>

      {/* DISPLAY FILTERED TODOS */}
      {filteredTodos.length === 0 ? (
        <Typography variant='h4' sx={{textAlign:"center",mt:3}}>No todos found</Typography>
      ) : (
        filteredTodos.map((todo) => (
          <Card 
            key={todo._id} 
            sx={{ m: 1, p: 2, borderLeft: todo.todoStatus ? "5px solid green" : "5px solid orange" }}
          >
            <Typography sx={{ fontSize: "18px", mb: 1, fontWeight: 600 }}>
              {todo.todoName}
            </Typography>

            <Typography sx={{ mb: 1 }}>
              Status:{" "}
              <strong style={{ color: todo.todoStatus ? "green" : "orange" }}>
                {todo.todoStatus ? "Completed" : "Not Completed"}
              </strong>
            </Typography>

            <CardActions sx={{ display: "flex" }}>
              <Button variant="outlined" onClick={() => handleEdit(todo._id)}>
                Edit
              </Button>

              <Button
                variant="contained"
                color="error"
                onClick={() => handleDelete(todo._id)}
              >
                Delete
              </Button>
              
              <Button
                variant="contained"
                color={todo.todoStatus ? "success" : "warning"}
                onClick={() => handleStatus(todo._id, todo.todoStatus)}
              >
                {todo.todoStatus ? "Mark as Incomplete" : "Mark as Completed"}
              </Button>
            </CardActions>
          </Card>
        ))
      )}

      {/* MODAL */}
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
