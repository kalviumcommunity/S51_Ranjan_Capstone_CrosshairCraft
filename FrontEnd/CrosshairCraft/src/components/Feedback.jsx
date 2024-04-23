import { useEffect, useState } from "react";
import "../App.css";
import NavBar from "./NavBar";

function Feedback() {
  const [feedbacks, setFeedbacks] = useState([]);

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

  return (
    <>
      <NavBar />
      <div className="preset-grid">
        {feedbacks.map((feedback) => (
          <div className="preset-item" key={feedback._id}>
            <h1>{feedback.feedback}</h1>
            <h2>{feedback.name}</h2>
          </div>
        ))}
      </div>
    </>
  );
}

export default Feedback;
