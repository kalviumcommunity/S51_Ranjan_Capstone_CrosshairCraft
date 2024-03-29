import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './../App.css' 

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const header = new Headers({"Access-Control-Allow-Origin":"*", 'Content-Type' : '*'})
            const response = await axios.post('https://s51-ranjan-capstone-crosshaircraft.onrender.com/loginpage',{
                headers: header,
                'mode' : "no-cors",
                username,
                password
            });
            if (response.status === 200) {
                const { token } = response.data;
                console.log(response.data);
                document.cookie = `token=${token}; path=/;`;
                navigate('/');
                window.location.reload();
            } else {
                const errorData = response.data;
                navigate('/');
                setError(errorData.error);
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Something went wrong!');
        }
    };

    return (
        <div className="login-container">
            <h2 className='h2'>Login</h2><br />
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className='label' htmlFor="username">Username </label>
                    <input  type="text" className='inputText' id="username" value={username} onChange={handleUsernameChange} required />
                </div>
                <div className="form-group">
                    <label className='label' htmlFor="password">Password </label>
                    <input type="password" id="password" className='inputpassword' value={password} onChange={handlePasswordChange} required />
                </div>
                <button className='buttonsubmit' type="submit">Login</button>
            </form>
            <span> Dont have an account? </span><Link to="/signuppage">SIGN UP</Link>
        </div>
    );
}

export default Login;