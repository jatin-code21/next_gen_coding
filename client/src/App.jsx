import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Loader from './components/Loader.jsx'
import './App.css'

const Home = lazy(() => import('./pages/Home.jsx'))
const ProblemList = lazy(() => import('./pages/ProblemsList.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const Activities = lazy(() => import('./pages/Activities.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Leadboard = lazy(() => import('./pages/Leadboard.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const ProblemPage = lazy(() => import('./pages/ProblemPage.jsx'))
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage.jsx'))
const ProFeatures = lazy(() => import('./pages/ProFeatures.jsx'))

const Loading = () => <Loader />

function App() {

  return (
    <div>
      <BrowserRouter>
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route index element={<Home />}></Route>
            <Route path='/home' element={<Home />}></Route>
            <Route path='/problems' element={
              <ProtectedRoute>
                <ProblemList />
              </ProtectedRoute>
            } />
            <Route path='/problems/:problemName/:problemId' element={<ProblemPage />}></Route>
            <Route path="/pro-features" element={<ProFeatures />} />
            <Route path='/login' element={<Login />}></Route>
            <Route path='/about' element={<ComingSoonPage />}></Route>
            <Route path='/activities' element={<Activities />}></Route>
            <Route path='/leaderboard' element={<ComingSoonPage />}></Route>
            <Route path='/profile' element={<Profile />}></Route>
          </Routes>
        </Suspense>
      </BrowserRouter>

    </div>
  )
}

export default App
