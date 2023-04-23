import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import './mystyles.css'; 


// Here, we display our Navbar
export default function Navbar() {
  // We are pulling in the user's info but not using it for now.
  // Warning disabled:  
  // eslint-disable-next-line
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(getUserInfo())
  }, [])
  
  // if (!user) return null   - for now, let's show the bar even not logged in.
  // we have an issue with getUserInfo() returning null after a few minutes
  // it seems.
  return (
    <ReactNavbar bg="dark" variant="dark" id="my-navbar" className="my-custom-navbar">
      <Container fluid>
        <div className="mbtawheels-card">
          <Card className="bg-dark text-white p-.5">
            <Card.Title id="mbtawheels">MBTAccessibility</Card.Title> 
          </Card>
        </div>
        <Nav className="me-auto align-items-center">
          <Nav.Link href="/home">Home</Nav.Link>
          <Nav.Link href="/privateUserProfile">Profile</Nav.Link>
          <Nav.Link href="/mbtaService">MBTA Service</Nav.Link>
          <Nav.Link href="/stops">Stops</Nav.Link>
          <Nav.Link href="/viewComments">Comments</Nav.Link>
          <Nav.Link href="/ratings">Station Ratings</Nav.Link>   
        </Nav>
        <Nav className="justify-content-end">
          <Nav.Link href="/" id="RegisterandLogin">Register/Login</Nav.Link>
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
