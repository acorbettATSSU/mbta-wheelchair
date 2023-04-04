import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";
import axios from 'axios';


import Row from 'react-bootstrap/Row';
const CommentPage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/com/getAllComment')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken')
        return navigate('/')
    }
    const handleChange = ({ currentTarget: input }) => {
      
    };
    useEffect(() => {
        setUser(getUserInfo())
    }, [])
    const handleSubmit = async (e) => {
      
    }


    if (!user) return (
        <div><h4>Please log in or register an account  to view and leave comments.</h4></div>)
    const { id, email, username, password } = user
    return (
    
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
    }}>
      
<Form>

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Commenting as {user && user.username}:</Form.Label>
        <Form.Control as="textarea" rows={3}
                type="comment"
        name="comment"
        onChange={handleChange}
        placeholder="Comment"
      /> 
        <Button
                  variant="primary"
                  type="submit"
                  onClick={handleSubmit}
                >
                  Post
                </Button>
      </Form.Group>
    </Form>
    <ul>
      {posts.map(post => (
        <li>{post.username}: {post.comment}</li>
      ))}
    </ul>
    </div>
    )
}

export default CommentPage