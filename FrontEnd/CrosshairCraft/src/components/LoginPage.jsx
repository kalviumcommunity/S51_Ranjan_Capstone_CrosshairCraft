import  { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

import "./../App.css";

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
      const header = new Headers({
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "*",
      });
      const response = await axios.post(
        "https://s51-ranjan-capstone-crosshaircraft.onrender.com/loginpage",
        {
          headers: header,
          mode: "no-cors",
          username,
          password,
        }
      );
      if (response.status === 200) {
        const { token } = response.data;
        console.log(response.data);
        document.cookie = `token=${token}; path=/;`;
        navigate("/");
        window.location.reload();
      } else {
        const errorData = response.data;
        navigate("/");
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Something went wrong!");
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
  }, []);

  return (
    <div className="login-container">
      <h2 className="h2">Login</h2>
      <br />
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label" htmlFor="username">
            Username{" "}
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
            Password{" "}
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
            <h6>(or)</h6>
            <div id="signinbtn"></div>
        </div>
        
      </form>
      <span> Dont have an account? </span>
      <Link to="/signuppage">SIGN UP</Link>
    </div>
  );
}

export default Login;
