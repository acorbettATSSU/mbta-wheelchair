import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import getUserInfo from "../../utilities/decodeJwt";
import Form from "react-bootstrap/Form";
import axios from "axios";



//link to service
//http://localhost:8096/privateUserProfile

const PrivateUserProfile = () => {
  const [show, setShow] = useState(false);
  const [user, setUser] = useState({})
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const [data, setData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    

    const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
    };


  const PRIMARY_COLOR = "#cc5c99";
  const SECONDARY_COLOR = "#0c0c1f";
  const url = "http://localhost:8081/user/editUser";
  
    
  
  
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const { data: res } = await axios.post(url, data);
        const {accessToken} = res
        //store token in localStorage
        navigate("/login");
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
    };


  // handle logout button
  const handleLogout = (async) => {
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    setUser(getUserInfo())
  }, []);




  // 	<span><b>{<FollowerCount username = {username}/>}</b></span>&nbsp;
  // <span><b>{<FollowingCount username = {username}/>}</b></span>;
  if (!user) return (<div><h4>Log in to view this page.</h4></div>)
  const { id, email, username, password } = user
  return (
    
    <div class="container">
      <div class="col-md-12 text-center">
        <h1>{user && user.username}</h1>
        <div class="col-md-12 text-center">
          <br></br>
          <>
                <h3>
                    Welcome to the MBTA Wheelchair App, 
                    <span className='username'> @{username}</span>
                </h3>
                <br></br>
          <Button className="me-2" href="/editUserPage">
              Change Password
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Change Password</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="username"
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter username"
                  />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    onChange={handleChange}
                    placeholder="Enter Email Please"
                  />
                  <Form.Text className="text-muted">
                    
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Label>(min. 8 characters)</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                  />
                </Form.Group>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="flexSwitchCheckDefault"
                    onChange={() => {
                    }}
                  />
                  <label
                    class="form-check-label"
                    for="flexSwitchCheckDefault"
                    className="text-muted"
                  >
                  
                  </label>
                </div>
                {error && (
                  <div>
                    {error}
                  </div>
                )}
                <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                  className="mt-2"
                >
                  Change
                </Button>
              </Form>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>

            <Button className="me-2" onClick={handleShow}>
              Log Out
            </Button>
            <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
            >
              <Modal.Header closeButton>
                <Modal.Title>Log Out</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to Log Out?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleLogout}>
                  Yes
                </Button>
              </Modal.Footer>
            </Modal>

          </>
        </div>
      </div>
    </div>
    
    
  );
};

export default PrivateUserProfile;
