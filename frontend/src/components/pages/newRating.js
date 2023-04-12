import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
//  
const RatingForm = () => {
  const [username, setUsername] = useState("");
  const [stopName, setStopName] = useState("");
  const [rating, setRating] = useState("");
  const [stops, setStops] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handleStopNameChange = (event) => setStopName(event.target.value);
  const handleRatingChange = (event) => setRating(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, stopName, rating }),
    };

    fetch("http://localhost:8081/rating/addRating", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setShowModal(true);
      })
      .catch((error) => console.error(error));
  };
  // 
  useEffect(() => {
  fetch("https://api-v3.mbta.com/stops?filter%5Broute_type%5D=0,1")
    .then((response) => response.json())
    .then((data) => {
      const stopNames = data.data.map((stop) => {
        const descriptionArr = stop.attributes.description.split("-");
        const stopName = descriptionArr[0].trim();
        const line = descriptionArr[1].trim();
        return `${stopName} - ${line}`;
      });
      setStops(stopNames);
    })
    .catch((error) => console.error(error));
}, []);

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <Form onSubmit={handleSubmit} className="mt-3">
        <Form.Group controlId="username">
          <Form.Label>Username:</Form.Label>
          <Form.Control type="text" value={username} onChange={handleUsernameChange} />
        </Form.Group>
        <Form.Group controlId="stopName">
          <Form.Label>Stop Name:</Form.Label>
          <Form.Control as="select" value={stopName} onChange={handleStopNameChange}>
            {stops.map((stop, index) => (
              <option key={index} value={stop}>
                {stop}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="rating">
          <Form.Label>Rating:</Form.Label>
          <Form.Control as="select" value={rating} onChange={handleRatingChange}>
            {[.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Comment Added</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your comment has been successfully added.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            <a href="/ratings">Back</a>
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RatingForm;
