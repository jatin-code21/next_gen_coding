import React, { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import ProblemsList1 from './pages/ProblemsList1.jsx'

const Home = lazy(() => import('./pages/Home.jsx'))
const Home1 = lazy(() => import('./pages/Home.jsx'))
const ProblemList = lazy(() => import('./pages/ProblemsList.jsx'))
const Login = lazy(() => import('./pages/Login.jsx'))
const RecentActivities = lazy(() => import('./pages/RecentActivities.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Leadboard = lazy(() => import('./pages/Leadboard.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const ProblemPage = lazy(() => import('./pages/ProblemPage.jsx'))
const ComingSoonPage = lazy(() => import('./pages/ComingSoonPage.jsx'))
const ProFeatures = lazy(() => import('./pages/ProFeatures.jsx'))

const Loading = () => <div>Loading...</div>

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
                  <ProblemsList1 />
                </ProtectedRoute>
              } />
              <Route path='/problems/:problemName/:problemId' element={<ProblemPage />}></Route>
              <Route path="/pro-features" element={<ProFeatures />} />
              <Route path='/login' element={<Login />}></Route>
              <Route path='/about' element={<ComingSoonPage />}></Route>
              <Route path='/activities' element={<RecentActivities/>}></Route>
              <Route path='/leaderboard' element={<ComingSoonPage />}></Route>
              <Route path='/profile' element={<Profile />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </div>
  )
}

export default App
