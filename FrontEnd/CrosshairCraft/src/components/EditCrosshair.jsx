import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import NavBar from "./NavBar";
import "../App.css";

function EditCrosshair() {
  const [formdata, setFormData] = useState({
    CrosshairID: "",
    Color: "",
    Type: "",
    Game: "",
    CreatedBy: "",
  });

  const [error, setError] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();  // Get the id from the URL params

  useEffect(() => {
    // Check if user is logged in by validating token
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) {
      alert("You must be logged in to access this page.");
      navigate("/loginpage"); // Redirect to login if not authenticated
    } else {
      setIsAuthenticated(true);
    }

    // Fetch the crosshair details to populate the form for editing
    if (id) {
      fetchCrosshairDetails(id);
    }
  }, [id, navigate]);

  const fetchCrosshairDetails = async (id) => {
    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      const response = await axios.get(`http://localhost:3000/preset/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send token for authentication
        },
      });

      setFormData(response.data); // Pre-fill form with fetched data
    } catch (error) {
      console.error("Error fetching crosshair details:", error);
      setError("Error fetching data. Please try again later.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formdata,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("Unauthorized access. Please log in.");
      }

      const response = await axios.put(
        `http://localhost:3000/preset/${id}`,
        formdata,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send token for authentication
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        alert("Crosshair updated successfully!");
        navigate(`/preset/${id}`); // Redirect to the updated crosshair details page or any other page
      }
    } catch (error) {
      console.error("Error updating crosshair:", error);
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again later."
      );
    }
  };

  return (
    <>
      <NavBar />
      {isAuthenticated && (
        <div className="form-container">
          <h2>Edit Crosshair</h2>
          <br />
          {error && <div className="error-message">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="input-field">
              <label htmlFor="crosshair-id">ID</label>
              <input
                type="text"
                id="crosshair-id"
                name="CrosshairID"
                value={formdata.CrosshairID}
                onChange={handleChange}
                required
                disabled // ID cannot be edited
              />
            </div>
            <div className="input-field">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                name="Color"
                value={formdata.Color}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="type">Type</label>
              <input
                type="text"
                id="type"
                name="Type"
                value={formdata.Type}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="game">Game</label>
              <input
                type="text"
                id="game"
                name="Game"
                value={formdata.Game}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="created-by">CreatedBy</label>
              <input
                type="text"
                id="created-by"
                name="CreatedBy"
                value={formdata.CreatedBy}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
        </div>
      )}
    </>
  );
}

export default EditCrosshair;
