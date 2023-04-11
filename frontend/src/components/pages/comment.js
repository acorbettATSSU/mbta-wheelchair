import React, { useState, useEffect } from "react";

const CommentForm = () => {
  const [username, setUsername] = useState("");
  const [stopName, setStationName] = useState("");
  const [comment, setComment] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [stopsInfo, setStopsInfo] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      username,
      stopName,
      comment
    };
    try {
      const response = await fetch("http://localhost:8081/com/addComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(commentData),
      });
      if (response.ok) {
        // Handle success, show modal
        setShowModal(true);
        setUsername("");
        setStationName("");
        setComment("");
      } else {
        // Handle errors, e.g., show an error message
        console.error("Failed to submit comment.");
      }
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api-v3.mbta.com/stops?filter%5Broute_type%5D=0,1,2"
        );
        const data = await response.json();
        const stops = data.data.map((stop) => {
          const name = stop.attributes.name.split(" - ")[0];
          const line = stop.attributes.description.split(" - ")[1];
          return {
            name,
            line,
          };
        });
        const uniqueStops = [
          ...new Map(stops.map((item) => [item.name, item])).values(),
        ];
        const sortedStops = uniqueStops.sort((a, b) => a.name.localeCompare(b.name));
        setStopsInfo(sortedStops);
      } catch (error) {
        console.error("Failed to fetch stop data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mt-4">
      <h3>Add Comment</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="stationName">Station Name:</label>
          <select
            id="stationName"
            className="form-control"
            value={stopName}
            onChange={(e) => setStationName(e.target.value)}
          >
            <option value="">Select a stop</option>
            {stopsInfo.map((stop, index) => (
              <option key={index} value={stop.name}>
                {stop.name} ({stop.line})
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            className="form-control"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {showModal && (
        <div
          className="modal-backdrop fade show"
          onClick={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default CommentForm;