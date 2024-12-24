import { useEffect, useState } from "react";
import "../App.css";
import NavBar from "./NavBar";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [feedbacksPerPage] = useState(5); // Number of feedbacks per page
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date
  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    feedback: ""
  });

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch("http://localhost:3000/feedback");
      if (!response.ok) {
        throw new Error("Failed to fetch feedbacks");
      }
      const data = await response.json();
      setFeedbacks(data);
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  // Get current feedbacks
  const indexOfLastFeedback = currentPage * feedbacksPerPage;
  const indexOfFirstFeedback = indexOfLastFeedback - feedbacksPerPage;
  const currentFeedbacks = feedbacks.slice(indexOfFirstFeedback, indexOfLastFeedback);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFeedbackForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(feedbackForm)
      });
      if (!response.ok) {
        throw new Error("Failed to submit feedback");
      }
      // Refresh feedback list after submission
      fetchFeedbacks();
      // Reset feedback form
      setFeedbackForm({ name: "", feedback: "" });
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  // Sort feedbacks
  const sortedFeedbacks = [...currentFeedbacks].sort((a, b) => {
    if (sortBy === "date") {
      return new Date(b.date) - new Date(a.date);
    } else if (sortBy === "rating") {
      return b.rating - a.rating;
    }
    return 0;
  });

  return (
    <>
      <NavBar />
      <div className="feedback-container">
        {/* Feedback Form */}
        <form onSubmit={handleSubmit} className="feedback-form">
          <h3>Submit Feedback</h3><br />
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" value={feedbackForm.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback:</label>
            <textarea id="feedback" name="feedback" value={feedbackForm.feedback} onChange={handleInputChange} required />
          </div>
          <button type="submit">Submit</button>
        </form>

        {/* Feedback List */}
        <div className="feedback-list">
          <h3>Feedback</h3>
          {/* Sorting Options */}
          <div className="sort-options">
            <label>Sort By:</label>
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="date">Date</option>
              <option value="rating">Rating</option>
            </select>
          </div>
          {/* Display Feedbacks */}
          {sortedFeedbacks.map((feedback) => (
            <div className="feedback-item" key={feedback._id}>
              <h4>{feedback.feedback}</h4>
              <p>By: {feedback.name}</p>
              <p>Date: {new Date(feedback.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(feedbacks.length / feedbacksPerPage) }).map((_, index) => (
          <button key={index} onClick={() => paginate(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default Feedback;