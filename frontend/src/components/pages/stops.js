import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';


function StopGrid() {
  const [stops, setStops] = useState([]);
  const [selectedLine, setSelectedLine] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetch('https://api-v3.mbta.com/stops?filter%5Broute_type%5D=0,1,2')
      .then(response => response.json())
      .then(data => {
        const stopMap = new Map();
        data.data.forEach(stopData => {
          const stop = {
            id: stopData.id,
            description: stopData.attributes.description,
            wheelchair_boarding: stopData.attributes.wheelchair_boarding
          };
          const index = stop.description.indexOf('-', stop.description.indexOf('-') + 1);
          if (index >= 0) {
            stop.description = stop.description.substring(0, index);
          }
          if (!stopMap.has(stop.description)) {
            stopMap.set(stop.description, stop);
          }
        });
        setStops(Array.from(stopMap.values()));
      });
  }, []);

  const handleLineSelect = (event) => {
    setSelectedLine(event.target.value);
  };

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getWheelchairAccessibility = (boardingValue) => {
    switch (boardingValue) {
      case 0:
        return 'Not Wheelchair Accessible';
        case 1:
          return <img src="handicap-icon.png" alt="Wheelchair Accessible" style={{ width: '24px', height: '24px' }} />;        
      case 2:
        return 'No accessibility data';
      default:
        return 'Error';
    }
  };

  const getFilteredStops = () => {
    let filteredStops = stops;
    if (selectedLine !== 'All') {
      filteredStops = filteredStops.filter(stop => stop.description.includes(selectedLine));
    }
    if (searchTerm !== '') {
      filteredStops = filteredStops.filter(stop => stop.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    return filteredStops;
  };

  return (
    <>
    <Container className="my-4 mx-auto" style={{ maxWidth: '800px' }}>
      <Form>
        <Form.Group controlId="line-select">
          <Form.Label>Line</Form.Label>
          <Form.Select value={selectedLine} onChange={handleLineSelect}>
            <option value="All">All</option>
            <option value="Red Line">Red Line</option>
            <option value="Blue Line">Blue Line</option>
            <option value="Orange Line">Orange Line</option>
            <option value="Silver Line">Silver Line</option>
            <option value="Commuter Rail">Commuter Rail</option>
            <option value="Mattapan Trolley">Mattapan Trolley</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="search">
          <Form.Label>Search</Form.Label>                
          <Form.Control type="text" value={searchTerm} autoComplete="off" onChange={handleSearchTermChange} />
        </Form.Group>
      </Form>
      <p></p>  {/* adds a gap */}
      <p></p>
      <Row xs={1} md={3} className="g-4">
        {getFilteredStops().map(stop => (
          <Col key={stop.id}>
            <Card>
              <Card.Body>
                <Card.Title>{stop.description}</Card.Title>
                <Card.Text> {getWheelchairAccessibility(stop.wheelchair_boarding)}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
          
        </Row>
        </Container>
      </>
    );
  }
  

export default StopGrid;
