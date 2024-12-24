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

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    try {
      const response = await axios.post("http://localhost:3000/signuppage", {
        name: name.trim(),
        username: username.trim(),
        email: email.trim(),
        password: password.trim(),
      });

      if (response.status === 200) {
        alert("Signup successful! Please login.");
        navigate("/waiting");
      }
    } catch (error) {
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error("Error response:", error.response.data);
        setError(error.response.data.message || "Invalid input data!");
      } else if (error.request) {
        // Request made but no response received
        console.error("Error request:", error.request);
        setError("No response from server. Please try again later.");
      } else {
        // Other errors
        console.error("Error message:", error.message);
        setError("An unexpected error occurred. Please try again.");
      }
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
                  onChange={handleInputChange(setName)}
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
                  onChange={handleInputChange(setUsername)}
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
                  onChange={handleInputChange(setEmail)}
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
                  onChange={handleInputChange(setPassword)}
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
