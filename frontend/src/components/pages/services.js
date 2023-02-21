import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


function Services() {
  const [alerts, setAlerts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        'https://api-v3.mbta.com/services?filter%5Broute%5D=Red',
      );
      setAlerts(result.data.data);
    }
    fetchData();
  }, []);


  return (
    <div>
      {alerts.map(alert => (
        <Card
        body
        outline
        color="success"
        className="mx-1 my-2"
        style={{ width: "30rem" }}
      >
        <Card.Body>
        <Card.Title>{"Test Line - " + alert.attributes.description}</Card.Title>
        <Card.Text>{alert.attributes.added_dates_notes}</Card.Text>
        <Card.Text>{alert.attributes.added_dates}</Card.Text>
        <Card.Text>{"Starts " + alert.attributes.rating_start_date}</Card.Text>
        <Card.Text>{"Ends " + alert.attributes.end}</Card.Text>
        <Card.Text>{"Doesn't include " + alert.attributes.rating_removed_dates + " " + alert.attributes.removed}</Card.Text>
        </Card.Body>
      </Card>
      ))}

a
        <h1>Red Line Service</h1>
      {alerts.map(alert => (
        <div key={alert.description}>
          <h3>{alert.attributes.header}</h3>
          <p>{alert.attributes.description}</p>
        </div>
      ))}
    </div>
  );
}


export default Services;