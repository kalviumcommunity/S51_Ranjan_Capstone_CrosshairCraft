import React from 'react'
import {Link} from 'react-router-dom'
import { useState, useEffect } from 'react'
import {PulseLoader} from 'react-spinners' 
import NavBar from './NavBar'

import Footer from './Footer'

import './../App.css' 

function Home() {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(()=>{
        checkLoginStatus()},[])
    const checkLoginStatus = () => {
        const token = getCookie('token');
        setIsLoggedIn(!!token);
    };
    const handleLogout = () => {
        document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        setIsLoggedIn(false);
        window.location.reload();
    };
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    };
    return (
        <>
            <NavBar/>
            <div className='Home'>
                <h1>Crosshair Craft</h1><br /> 
                <p>Welcome to CrosshairCraft, the ultimate crosshair generator for FPS enthusiasts. This tool empowers you to design and customize your crosshair, offering a personalized aiming experience tailored to your preferences. Whether you are a seasoned gamer or a casual player, CrosshairCraft makes it easy to elevate your aiming precision with style.</p><br />
            </div>

            <div className='ontheway'>
                <PulseLoader/>    
            </div>
            <Footer/>
            
        </>
    )
}
export default Home