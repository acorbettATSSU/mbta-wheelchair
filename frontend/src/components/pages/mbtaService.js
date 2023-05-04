import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import getUserInfo from '../../utilities/decodeJwt'


function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [user, setUser] = useState({})

  

const { id, email, username, password, favline } = user
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

          
      
        <img src="MBTA_Map.png" alt="My Image"></img>
        



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
// MBTA_Map.png credits to MBTA.com

export default Alerts;
