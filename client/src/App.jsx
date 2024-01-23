// import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import About from './pages/about/About'
// import Profile from './pages/profile/Profile'
import SignIn from './pages/signin/SignIn'
import SignUp from './pages/signup/SignUp'
import Header from './components/header/Header'
import './App.css'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/createListing/CreateListing'
import UpdateListing from './pages/updateListing/UpdateListing'
import Listing from './pages/listing/Listing'


const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={ <Home /> }  />
        <Route path='/about' element={ <About /> }  />
        <Route path='/sign-in' element={ <SignIn /> }  />
        <Route path='/sign-up' element={ <SignUp /> }  />
        <Route path='/listing/:listingId' element={ <Listing /> }  />
        <Route element={<PrivateRoute />}>
          <Route path='/create-listing' element={ <CreateListing /> }  />
          <Route path='/update-listing/:listingId' element={ <UpdateListing /> }  />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App