import React, { useEffect, useState } from "react";
import getUserInfo from '../utilities/decodeJwt';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import ReactNavbar from 'react-bootstrap/Navbar';
import Card from 'react-bootstrap/Card';
import './mystyles.css'; 

export default function Navbar() {
  const [user, setUser] = useState({})

  useEffect(() => {
    setUser(getUserInfo())
  }, [])
  
  const handleLogout = () => {
    localStorage.clear();
    setUser({});
  };

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
          <Nav.Link href="/mbtaService">Map</Nav.Link>
          <Nav.Link href="/stops">Stops</Nav.Link>
          <Nav.Link href="/viewComments">Comments</Nav.Link>
          <Nav.Link href="/ratings">Station Ratings</Nav.Link>   
        </Nav>
        <Nav className="justify-content-end">
          {user && user.email ?
            <Nav.Link onClick={handleLogout} id="logout">Logout</Nav.Link> :
            <Nav.Link href="/" id="loginPage">Register/Login</Nav.Link>
          }
        </Nav>
      </Container>
    </ReactNavbar>
  );
}
