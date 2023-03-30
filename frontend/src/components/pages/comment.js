import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
const CommentPage = () => {
    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const handleClick = (e) => {
        e.preventDefault();
        localStorage.removeItem('accessToken')
        return navigate('/')
    }

    useEffect(() => {
        setUser(getUserInfo())
    }, [])


    if (!user) return (
        <div><h4>Please log in or register an account  to view and leave comments.</h4></div>)
    const { id, email, username, password } = user
    return (
    
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
    }}>

    <form>
    <label>
      Comment: 
      <input type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
    </div>
    )
}

export default CommentPage