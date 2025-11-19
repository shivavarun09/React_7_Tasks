import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import Day1 from './Day1/Parent';
import Day2 from './Day2/FormParent';
import Day3 from './Day3/MainApp';
import Day4 from './Day4/Day4';

import { Button, ButtonGroup } from '@mui/material';

const App = () => {

  const pages = {
    Day1: <Day1 />,
    Day2: <Day2 />,
    Day3: <Day3 />,
    Day4: <Day4 />
  };

  return (
    <div>
      
      {/* Dynamic Buttons */}
      <ButtonGroup sx={{ gap: 2, m: 3 }}>
        {Object.keys(pages).map((day) => (
          <Button 
            key={day}
            component={Link}
            to={`/${day}`}
            variant="contained"
          >
            {day}
          </Button>
        ))}
      </ButtonGroup>

      {/* Dynamic Routes */}
      <Routes>
        {Object.entries(pages).map(([day, component]) => (
          <Route key={day} path={`/${day}`} element={component} />
        ))}
      </Routes>
    </div>
  );
};

export default App;
