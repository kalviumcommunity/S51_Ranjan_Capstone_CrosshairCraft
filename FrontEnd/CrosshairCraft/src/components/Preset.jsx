import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom'; // Use useParams to get dynamic ID
import NavBar from './NavBar';
import '../App.css';

function Preset() {
  const [crosshairs, setCrosshairs] = useState([]);
  const [filteredCrosshairs, setFilteredCrosshairs] = useState([]);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const { id } = useParams(); // Access the dynamic ID from the URL (if any)

  useEffect(() => {
    const fetchPreset = async () => {
      try {
        const token = document.cookie
          .split('; ')
          .find((row) => row.startsWith('token='))?.split('=')[1];

        if (!token) {
          throw new Error('You must be logged in to view crosshairs.');
        }

        let url = 'http://localhost:3000/preset'; // Default URL to get all presets
        if (id) {
          url = `http://localhost:3000/preset/${id}`; // Update URL to fetch specific preset by ID
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCrosshairs(response.data);
        setFilteredCrosshairs(response.data);
      } catch (error) {
        console.error('Error fetching crosshairs:', error);
        setError('Failed to load crosshairs. Please try again later.');
      }
    };

    fetchPreset();
  }, [id]); // Re-run the effect when `id` changes

  const handleDelete = async (id) => {
    try {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='))?.split('=')[1];

      if (!token) {
        throw new Error('Unauthorized access. Please log in.');
      }

      const response = await axios.delete(`http://localhost:3000/update/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        alert('Crosshair deleted successfully!');
        setCrosshairs(crosshairs.filter((crosshair) => crosshair.CrosshairID !== id));
        setFilteredCrosshairs(filteredCrosshairs.filter((crosshair) => crosshair.CrosshairID !== id));
      }
    } catch (error) {
      console.error('Error deleting crosshair:', error);
      alert('Error deleting crosshair. Please try again later.');
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filteredData = crosshairs.filter((crosshair) => {
      return (
        (crosshair.CrosshairID && crosshair.CrosshairID.toString().toLowerCase().includes(query)) ||
        (crosshair.Color && crosshair.Color.toString().toLowerCase().includes(query)) ||
        (crosshair.Type && crosshair.Type.toString().toLowerCase().includes(query)) ||
        (crosshair.Game && crosshair.Game.toString().toLowerCase().includes(query)) ||
        (crosshair.CreatedBy && crosshair.CreatedBy.toString().toLowerCase().includes(query))
      );
    });

    setFilteredCrosshairs(filteredData);
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <h2>Preset Crosshairs</h2>
        {error && <div className="error-message">{error}</div>}

        <div className="search-container">
          <input
            type="text"
            placeholder="Search by ID, Color, Type, Game, or Creator"
            value={searchQuery}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <div className="crosshair-list">
          {filteredCrosshairs.length === 0 ? (
            <p>No crosshairs available.</p>
          ) : (
            filteredCrosshairs
              .filter((crosshair) => crosshair && crosshair.CrosshairID) // Ensure valid data
              .map((crosshair) => (
                <div key={`${crosshair.CrosshairID}-${crosshair.CreatedBy}`} className="crosshair-item">
                  <h3>{crosshair.CrosshairID}</h3>
                  <p><strong>Color:</strong> {crosshair.Color}</p>
                  <p><strong>Type:</strong> {crosshair.Type}</p>
                  <p><strong>Game:</strong> {crosshair.Game}</p>
                  <p><strong>Created By:</strong> {crosshair.CreatedBy}</p>
                  <div className="crosshair-actions">
                    <Link to={`/update/${crosshair.CrosshairID}`} className="btn-edit">
                      Edit
                    </Link>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(crosshair.CrosshairID)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </>
  );
}

export default Preset;
