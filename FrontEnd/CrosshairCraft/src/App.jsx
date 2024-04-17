import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import LoginPage from './components/LoginPage'
import Home from './components/Home'
import NewData from "./components/NewData";
import LandingPage from './components/LandingPage'
import Update from "./components/Update";
import SignupPage from './components/SignupPage'
import AboutUs from './components/AboutUs'
import Preset from './components/Preset'

function App() {
   return (
    <>
      {/* <br /> */}
      
       <div>
        <BrowserRouter>
        
          <Routes>
          <Route path='/' element={<LandingPage/>} />
            <Route path='/home' element={<Home/>} />
            <Route path='/loginpage' element={<LoginPage/>} />
            <Route path='/signuppage' element={<SignupPage/>} /> 
            <Route path="/newdata" element={<NewData />}></Route>
            <Route path="/update/:id" element={<Update />}></Route>
            <Route path='/about' element={<AboutUs/>}></Route>
            <Route path='/preset' element={<Preset/>} ></Route>
          </Routes>
        </BrowserRouter>
      </div>


    </>
  )
}

export default App
