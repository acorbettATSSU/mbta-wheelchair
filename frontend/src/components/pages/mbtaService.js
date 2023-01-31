import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


function Alerts() {
  const [alerts, setAlerts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        //'https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
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
        <Card.Body>  {/* still called alert.(whatever), calls from service, not alerts */} 
        <Card.Title>{"Red line - " + alert.attributes.description}</Card.Title>
        <Card.Text>{alert.attributes.added_dates_notes}</Card.Text>
        <Card.Text>{alert.attributes.added_dates}</Card.Text>
        <Card.Text>{"Starts " + alert.attributes.rating_start_date}</Card.Text>
        <Card.Text>{"Ends: " + alert.attributes.rating_end_date}</Card.Text>
        <Card.Text>{"Doesnt Include: " + alert.attributes.removed_dates + " " + alert.attributes.removed_dates_notes}</Card.Text>
        </Card.Body>
      </Card>
      ))}

          
        <h1>Red Line service</h1> 
      {alerts.map(alert => (   //All say alerts below, not actualy using it, just named that
        <div key={alert.id}>   
          <h3>{alert.attributes.description}</h3>
          <p>{alert.attributes.added_dates_notes}</p>
          <p>{alert.attributes.added_dates}</p>
          
          <p>{"Starts " + alert.attributes.rating_start_date}</p>
          <p>{"Ends: " + alert.attributes.rating_end_date}</p>  
          <p>{"Doesnt Include: " + alert.attributes.removed_dates + " " + alert.attributes.removed_dates_notes}</p>        
        </div>
      ))}
    </div>
  );
}


export default Alerts;
