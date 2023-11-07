import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import Home from './pages/Home'
import About from './pages/About'
import Profile from './pages/Profile'
import SignIn from './pages/SignIn'
import Header from './components/header/Header'
import './App.css'

const App = () => {
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element={ <Home /> }  />
        <Route path='/about' element={ <About /> }  />
        <Route path='/profile' element={ <Profile /> }  />
        <Route path='/sign-in' element={ <SignIn /> }  />
        <Route path='/sign-up' element={ <SignUp /> }  />
      </Routes>
    </BrowserRouter>
  )
}

export default App