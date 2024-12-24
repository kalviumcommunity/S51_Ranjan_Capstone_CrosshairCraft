import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Correct import as named export
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../App.css";
import NavBar from "./NavBar";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://s51-ranjan-capstone-crosshaircraft.onrender.com/loginpage",
        { username, password },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        const { token } = response.data;
        document.cookie = `token=${token}; path=/;`;
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/home");
      }
    } catch (err) {
      console.error("Error logging in:", err);
      setError("Invalid username or password");
      toast.error("Login failed! Please check your credentials.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const setCookie = (name, value, expiresInDays) => {
    const date = new Date();
    date.setTime(date.getTime() + expiresInDays * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  };

  const handleGoogleResponse = async (response) => {
    try {
      const userObject = jwtDecode(response.credential); // Correct use of jwtDecode
      const result = await axios.post(
        "https://s51-ranjan-capstone-crosshaircraft.onrender.com/googlelogin",
        {
          email: userObject.email,
          name: userObject.name,
        }
      );

      setCookie("token", result.data.encryptedToken, 10);
      toast.success("Google login successful!", {
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/home");
    } catch (error) {
      console.error("Error logging in via Google:", error);
      toast.error("Google login failed!", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  useEffect(() => {
    /* global google */
    google.accounts.id.initialize({
      client_id:
        "126122565431-llvcdl9k4tciko83pr3uu8n46chgc5la.apps.googleusercontent.com",
      callback: handleGoogleResponse,
    });

    google.accounts.id.renderButton(document.getElementById("signinbtn"), {
      theme: "outline",
      size: "large",
    });
  }, []);

  return (
    <>
      <NavBar />
      <div className="login-page">
        <div className="left-side">
          <h1 className="greeting">Welcome Back!</h1>
          <p className="greeting-text">
            Login to your account to enter the realm and continue your journey.
            Adventure awaits!
          </p>
        </div>
        <div className="right-side">
          <div className="login-container">
            <h2>Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={handleUsernameChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                  required
                />
              </div>
              <button type="submit" className="buttonsubmit">
                Login
              </button>
              <span>(or)</span>
              <div id="signinbtn"></div>
            </form>
            <span>Don't have an account? </span>
            <Link to="/signuppage">Sign Up</Link>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;
