import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import NavBar from './components/NavBar'
import Home from './components/Home'
import SignupPage from './components/SignupPage'

function App() {
   return (
    <>
      <NavBar/><br />
      
       <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/loginpage' element={<LoginPage/>} />
            <Route path='/signuppage' element={<SignupPage/>} /> 
          </Routes>
        </BrowserRouter>
      </div>


    </>
  )
}

export default App
