import React from 'react'
import { Route,Routes,Link } from 'react-router-dom'
import Day1 from './Day1/Parent'
import Day2 from './Day2/FormParent'
import {Button, ButtonGroup} from '@mui/material'
const App = () => {
  return (
    <div>
      <ButtonGroup sx={{ gap: 2,m:3 }}>
        <Button component={Link} to="/Day1" variant="contained">
          Day1
        </Button>
        <Button component={Link} to="Day2" variant="contained">
          Day 2
        </Button>
      </ButtonGroup>

      <Routes>
        <Route path="/Day1" element={<Day1 />} />
        <Route path="Day2" element={<Day2 />} />
      </Routes>
    </div>
  );
}

export default App
