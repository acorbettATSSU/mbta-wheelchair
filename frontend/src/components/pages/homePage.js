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
//

    if (!user) return (
        <div><h4>Welcome to the MBTA Wheelchair app, please login or register an account.</h4></div>)
    const { id, email, username, password, favline } = user
    return (
        <>
            <div>
                <h3>
                    Welcome to the MBTA Wheelchair app, 
                    <span className='username'> @{username}</span>
                </h3>
                <br></br>
                <h3>
                    <span className='favline'> Favorite Line: {favline}</span>
                </h3>
                <br></br>
                <h5>MBTA News:</h5>
                <br></br>
                <br></br>
                <br></br>
                <h5>Route News:</h5>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <button onClick={(e) => handleClick(e)}>
                Log Out
            </button>
        </>
    )
}

export default HomePage