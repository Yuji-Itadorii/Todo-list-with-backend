import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Todos from './components/Todos/Todos'
import UserContext from './components/UserContext/UserContext'
import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoutes/ProtectedRoute'
import Home from './components/Authentication/Home'


function App() {
  const [email, setEmail] = useState('')





  return (
    <>
      <UserContext.Provider value={{ email, setEmail }}>
        <Router>
          <Header />
          <Routes>
            <Route path='/login' element={<Home />} />
            <Route path='/' element={
              <ProtectedRoute>
                <Todos />
              </ProtectedRoute>
            } />
          </Routes>
        </Router>
      </UserContext.Provider>
    </>
  )
}

export default App
