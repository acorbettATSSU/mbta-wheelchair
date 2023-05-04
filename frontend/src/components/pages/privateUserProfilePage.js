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
  const [user, setUser] = useState({});
  const [comments, setComments] = useState([]);
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
      const { accessToken } = res;
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
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleDeleteComment = async (_id) => {
    try {
      await axios.delete(`http://localhost:8081/com/deleteComment/${_id}`);
      setComments((prevComments) => prevComments.filter((c) => c._id !== _id));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };
  
  

  

  useEffect(() => {
    const userInfo = getUserInfo();
    if (userInfo) {
      setUser(userInfo);
    }
    fetch("http://localhost:8081/com/getAllComment")
      .then((response) => response.json())
      .then((data) => {
        const sortedComments = data.sort((a, b) => {
          const dateA = new Date(a.date);
          const dateB = new Date(b.date);
          return dateB - dateA;
        });
        setComments(sortedComments);
        const uniqueStops = [...new Set(data.map((comment) => comment.stopName))];
        //setSuggestions(uniqueStops);
      });
  }, []);

  if (!user) return <div><h4>Log in to view this page.</h4></div>;
  const { id, email, username, password } = user;
  return (
    <div class="container">
      <div class="col-md-12 text-center">
        <h1>{user && user.username}</h1>
        <div class="col-md-12 text-center">
          <br />
          <h3>
            Welcome to the MBTA Wheelchair App,{" "}
            <span className="username"> @{username}</span>
          </h3>
          <br />
          <Button className="me-2" href="/editUserPage">
            Change Info
          </
          Button>

<br />
<br />
</div>
<div class="col-md-12 text-center">
<h3>My comments:</h3>
<br />
{comments.filter(comment => comment.username === user.username).map((comment) => (
  <div key={comment.id} style={{ border: "1px solid gray", padding: "10px" }}>
    <h2 style={{ backgroundColor: "white", padding: "5px" }}>{comment.username}</h2>
    <h3>at {comment.stopName}</h3>
    <p>{comment.comment}</p>
    <p style={{ fontSize: "12px" }}>Posted: {new Date(comment.date).toLocaleString()}</p>
    <Button
variant="danger"
onClick={() => handleDeleteComment(comment.id)}
>
Delete Comment
</Button>
  </div>
))}
<a href="/comment" style={{ gridColumn: "3 / 4", justifySelf: "end", position: "fixed", bottom: "20px", right: "20px", display: "flex", justifyContent: "center", alignItems: "center", width: "50px", height: "50px", borderRadius: "50%", border: "none", backgroundColor: "blue", color: "white", fontSize: "24px", textDecoration: "none" }}>
  <span>+</span>
</a>
</div>
</div>
</div>
);
};

export default PrivateUserProfile;