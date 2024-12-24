import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import NavBar from './NavBar';
import '../App.css';

function Update() {
  const { id } = useParams(); // Retrieve the 'id' from the URL parameters
  const [formData, setFormData] = useState({
    CrosshairID: '',
    Color: '',
    Type: '',
    Game: '',
    CreatedBy: '',
  });
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='))?.split('=')[1];

    if (!token) {
      alert('You must be logged in to access this page.');
      navigate('/loginpage');
      return;
    }

    setIsAuthenticated(true);

    if (id) {
      // Fetch crosshair data only if the ID exists
      const fetchCrosshair = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/preset/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200) {
            setFormData(response.data);
          } else {
            setError('Crosshair not found.');
          }
        } catch (error) {
          if (error.response && error.response.status === 404) {
            setError('Crosshair not found. Please check the ID.');
          } else {
            console.error('Error fetching crosshair:', error);
            setError('Failed to load the crosshair data.');
          }
        }
      };

      fetchCrosshair();
    }
  }, [id, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))?.split('=')[1];

      if (!token) {
        throw new Error('Unauthorized access. Please log in.');
      }

      const response = await axios.put(
        `http://localhost:3000/api/preset/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        setError('');
        alert('Crosshair updated successfully!');
        navigate('/');
      }
    } catch (error) {
      console.error('Error updating crosshair:', error);
      setError(
        error.response?.data?.message ||
        'Something went wrong. Please try again later.'
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
                value={formData.CrosshairID}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-field">
              <label htmlFor="color">Color</label>
              <input
                type="text"
                id="color"
                name="Color"
                value={formData.Color}
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
                value={formData.Type}
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
                value={formData.Game}
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
                value={formData.CreatedBy}
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

export default Update;
