import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Quiz from './Components/Quiz/Quiz'
import Loading from './Components/Loading/Loading'
import Board from './Components/Board/MoodBoard'


function App() {
  return (
    <div>
      <Router>
        <Navbar />
        <Link to='/'></Link>
        <Link to="/quiz"></Link>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path='/loading' element={<Loading />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/board' element={<Board />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
