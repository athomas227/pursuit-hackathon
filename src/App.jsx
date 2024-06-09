import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './Components/Home/Home'
import Navbar from './Components/Navbar/Navbar'
import Quiz from './Components/Quiz/Quiz'
import Loading from './Components/Loading/Loading'
import Board from './Components/Board/MoodBoard'
import SignIn from './Components/SignIn/SignIn'
import SignUp from './Components/SignUp/SignUp'
import { AuthProvider } from './helpers/AuthContext'


function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Navbar />
          <Link to='/'></Link>
          <Link to="/quiz"></Link>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/loading' element={<Loading />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/board' element={<Board />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
