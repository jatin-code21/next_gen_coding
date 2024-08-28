import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import ProblemList from './pages/ProblemsList.jsx'
import Login from './pages/Login.jsx'
import Activities from './pages/Activities.jsx'
import About from './pages/About.jsx'
import Leadboard from './pages/Leadboard.jsx'
import Profile from './pages/Profile.jsx'
import ProblemPage from './pages/ProblemPage.jsx'
import ComingSoonPage from './pages/ComingSoonPage.jsx'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/home' element={<Home />}></Route>
          <Route path='/problems' element={<ProblemList />}></Route>
          <Route path='/problems/:problemName/:problemId' element={<ProblemPage />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/about' element={<ComingSoonPage />}></Route>
          <Route path='/activities' element={<Activities />}></Route>
          <Route path='/leaderboard' element={<ComingSoonPage />}></Route>
          <Route path='/profile' element={<Profile />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
