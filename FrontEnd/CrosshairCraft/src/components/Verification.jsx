import React, { useState, useEffect } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'


function Verification() {
    

    useEffect(() => {
        verifyEmail()
    }, [])

    const verifyEmail = async () => {
        try {
            const url = "http://localhost:3000/verification"
           
            const { data } = await axios.get(url)
            console.log(data)

        } catch (err) { 
            console.log(err)
        }
    }
    

    return (
        <>
            <h1>Email verified </h1>
            <Link to='/loginpage'><button>Click to continue</button></Link>
        </>
    )
}

export default Verification 