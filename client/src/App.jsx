import { useState } from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import Home from './pages/Home.jsx'
import Problems from './pages/Problems.jsx'

function App() {

  return (
   <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
          <Route path='/problems' element={<Problems/>}></Route>
        </Routes>
      </BrowserRouter>
   </div>
  )
}

export default App
