import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
const HomePage = () => {
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
        <div><h4>Welcome to the MBTA Wheelchair app, please login or register an account.</h4></div>)
    const { id, email, username, password } = user
    return (
        <>
            <div>
                <h3>
                    Welcome to the MBTA Wheelchair app, 
                    <span className='username'> @{username}</span>
                </h3>
            </div>
            <button onClick={(e) => handleClick(e)}>
                Log Out
            </button>
        </>
    )
}

export default HomePage