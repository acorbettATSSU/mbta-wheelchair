import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';


function Alerts() {
  const [alerts, setAlerts] = useState([]);


  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        //'https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE',
        'https://api-v3.mbta.com/stops?filter%5Broute%5D=0%2C1%2C2',
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
        <Card.Title>{alert.attributes.name}</Card.Title>
        <Card.Text>{alert.attributes.wheelchair_boarding}</Card.Text>
        
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
