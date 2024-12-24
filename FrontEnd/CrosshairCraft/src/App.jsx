import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import LoginPage from './components/LoginPage';
import Home from './components/Home';
import NewData from './components/NewData';
import LandingPage from './components/LandingPage';
import Update from './components/Update';
import SignupPage from './components/SignupPage';
import AboutUs from './components/AboutUs';
import Preset from './components/Preset';
import Feedback from './components/Feedback';
import Addcrosshair from './components/Addcrosshair';
import Waiting from './components/Waiting';
import Verification from './components/Verification';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<LandingPage />} />
            <Route path='/home' element={<Home />} />
            <Route path='/loginpage' element={<LoginPage />} />
            <Route path='/signuppage' element={<SignupPage />} />
            <Route path='/newdata' element={<NewData />} />
            <Route path='/update/:id' element={<Update />} />
            <Route path='/about' element={<AboutUs />} />
            {/* Update the route here for dynamic preset */}
            <Route path='/preset/:id' element={<Preset />} />
            <Route path='/feed' element={<Feedback />} />
            <Route path='/adding' element={<Addcrosshair />} />
            <Route path='/waiting' element={<Waiting />} />
            <Route path='/verification' element={<Verification />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
