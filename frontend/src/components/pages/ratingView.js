import React, { useState, useEffect } from 'react';
import { Card, Row, Col, Form, Container, Button } from 'react-bootstrap';

function StationRatings() {
  const [ratings, setRatings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showEmojiRating, setShowEmojiRating] = useState(false);

  useEffect(() => {
    fetch('http://localhost:8081/rating/getAllRating')
      .then(response => response.json())
      .then(data => {
        // Group ratings by stopName
        const groupedRatings = {};
        data.forEach(rating => {
          if (!groupedRatings[rating.stopName]) {
            groupedRatings[rating.stopName] = [];
          }
          groupedRatings[rating.stopName].push(rating.rating);
        });

        // Calculate average rating for each stop
        const averageRatings = Object.keys(groupedRatings).map(stopName => {
          const ratings = groupedRatings[stopName];
          const sum = ratings.reduce((acc, rating) => acc + rating, 0);
          const average = sum / ratings.length;
          return { stopName, average };
        });

        setRatings(averageRatings);
      });
  }, []);

  const filteredRatings = ratings.filter(({ stopName }) =>
    stopName.toLowerCase().includes(searchTerm.toLowerCase())
  );
const getRatingDisplay = rating => {
  if (showEmojiRating) {
    const roundedRating = Math.round(rating * 2) / 2;
    switch (roundedRating) {
      case 0.5:
        return '🌗🌑🌑🌑🌑';
      case 1:
        return '🌕🌑🌑🌑🌑';
      case 1.5:
        return '🌕🌗🌑🌑🌑';
      case 2:
        return '🌕🌕🌑🌑🌑';
      case 2.5:
        return '🌕🌕🌗🌑🌑';
      case 3:
        return '🌕🌕🌕🌑🌑';
      case 3.5:
        return '🌕🌕🌕🌗🌑';
      case 4:
        return '🌕🌕🌕🌕🌑';
      case 4.5:
        return '🌕🌕🌕🌕🌗';
      case 5:
        return '🌕🌕🌝🌕🌕';
      default:
        return '';
    }
  } else {
    return rating.toFixed(1);
  }
};


  return (
    <div>
      <Container className="px-3">
  <Row xs={1} className="mb-3">
    <Col>
      <h1>Station Ratings</h1>
    </Col>
    <Col xs="auto">
      <Form.Control
        type="text"
        placeholder="Search for a stop..."
        value={searchTerm}
        onChange={event => setSearchTerm(event.target.value)}
      />
    </Col>
    <Col xs="auto">
      <Button
        variant="primary"
        onClick={() => setShowEmojiRating(!showEmojiRating)}
      >
        {showEmojiRating ? 'Show number rating' : 'Show emoji rating'}
      </Button>
    </Col>
  </Row>
  <Row xs={1} sm={2} md={3} className="g-4 mt-3">
    {filteredRatings.map(({ stopName, average }) => (
      <Col key={stopName}>
        <Card>
          <Card.Body>
            <Card.Title>{stopName}</Card.Title>
            <Card.Text>{getRatingDisplay(average)}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    ))}
  </Row>
</Container>
<a href="/newRating" style={{ gridColumn: "3 / 4", justifySelf: "end", position: "fixed", bottom: "20px", right: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", borderRadius: "50%", border: "none", backgroundColor: "blue", color: "white", fontSize: "24px", textDecoration: "none" }}>
        <span>+</span>
      </a>
</div>

      

);
}

export default StationRatings;  