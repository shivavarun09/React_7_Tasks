import React from 'react'
import { Route,Routes,Link } from 'react-router-dom'
import Day1 from './Day1/Parent'
import Day2 from './Day2/FormParent'
const App = () => {
  return (
    <div>
      <Link to='/Day1'>Day1</Link>
      <Link to='/Day2'>Day2</Link>

      <Routes>
        <Route path='/Day1' element={<Day1/>}/>
        <Route path='Day2' element={<Day2/>}/>
      </Routes>
    </div>
  )
}

export default App
