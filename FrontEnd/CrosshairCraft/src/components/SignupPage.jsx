import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./../App.css";
import NavBar from "./NavBar";

function Signup() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/signuppage",
        {
          name,
          username,
          email,
          password,
        }
      );
      if (response.status === 200) {
        alert("Signup successful! Please login.");
        navigate("/waiting");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError("Something went wrong!");
    }
  };

  return (
    <>
      <NavBar />
      <div className="signup-page">
        <div className="left-side1">
          <div className="signup-container">
            <h2>Sign Up</h2>
            <br />
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name" className="label">
                  Name
                </label>
                <input
                  type="text"
                  className="inputText"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="username" className="label">
                  Username
                </label>
                <input
                  type="text"
                  className="inputText"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="label">
                  Email
                </label>
                <input
                  type="email"
                  className="inputText"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <input
                  type="password"
                  className="inputText"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button className="button-submit" type="submit">
                Sign Up
              </button>
            </form>
            <br />
            <span>Already have an account?</span>
            <Link to="/loginpage">Login</Link>
          </div>
        </div>
        <div className="right-side1">
          <h1 className="greeting1">Join Us!</h1>
          <p className="greeting-text1">
            Start your adventure by creating an account. The realm awaits you!
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
