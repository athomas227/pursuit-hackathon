import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Quiz from './Components/Quiz/Quiz'


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Link to='/'>Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/quiz' element={<Quiz />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
