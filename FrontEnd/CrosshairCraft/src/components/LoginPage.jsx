import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import "./../App.css";
import NavBar from "./NavBar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
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
      const header = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "*",
      };
      const response = await axios.post(
        "https://s51-ranjan-capstone-crosshaircraft.onrender.com/loginpage",
        {
          username,
          password,
        },
        {
          headers: header,
          mode: "no-cors",
        }
      );
      if (response.status === 200) {
        const { token } = response.data;
        document.cookie = `token=${token}; path=/;`;
        navigate("/");
        window.location.reload();
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid username or password");
    }
  };

  function handleCallbackResponse(response) {
    console.log("jwt:::", response.credential);
    const userObject = jwtDecode(response.credential);
    console.log(userObject);

    // Redirect to home page
    navigate("/");
  }

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "126122565431-llvcdl9k4tciko83pr3uu8n46chgc5la.apps.googleusercontent.com",
      callback: handleCallbackResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signinbtn"), {
      theme: "outline",
      size: "large",
    });
  });

  return (
    <>
      <NavBar />
      <div className="login-page">
        <div className="left-side">
          <h1 className="greeting">Welcome Back!</h1>
          <br />
          <p className="greeting-text">
            Login to your account to Enter the realm and continue your journey.
            Adventure awaits!{" "}
          </p>
          <br />
        </div>
        <div className="right-side">
          <div className="login-container">
            <h2 className="h2">Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="label" htmlFor="username">
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
                <label className="label" htmlFor="password">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="inputpassword"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <div className="cred">
                <button className="buttonsubmit" type="submit">
                  Login
                </button>
                <div id="signinbtn"></div>
              </div>
            </form>
            <span>Dont have an account?</span>
            <Link to="/signuppage">Sign Up</Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
