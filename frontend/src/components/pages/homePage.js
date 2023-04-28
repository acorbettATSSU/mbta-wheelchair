import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import getUserInfo from '../../utilities/decodeJwt'
import './HomePage.css'

const HomePage = () => {
  const [user, setUser] = useState({})
  const [mbtaNews, setMbtaNews] = useState([])
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    localStorage.removeItem('accessToken')
    return navigate('/')
  }

  useEffect(() => {
    setUser(getUserInfo())

    const fetchMbtaNews = async () => {
      try {
        const response = await fetch(
          'https://api-v3.mbta.com/alerts?sort=banner&filter%5Bactivity%5D=BOARD%2CEXIT%2CRIDE'
        )
        const data = await response.json()
        setMbtaNews(data.data)
      } catch (error) {
        console.log(error)
      }
    }

    fetchMbtaNews()
  }, [])
  
  if (!user) {
    return (
      <div>
        <h4>
          Welcome to the MBTA Wheelchair app, please login or register an
          account.
        </h4>
      </div>
    )
  }

  const { username } = user

  return (
    <>
      <div>
        <h3>MBTA News:</h3>
        <div className='mbta-news-container'>
          {mbtaNews.map((newsItem) => (
            <div key={newsItem.id} className='mbta-news-item'>
              <h6 className='mbta-news-header'>
                {newsItem.attributes.short_header}
              </h6>
              
              <p className='mbta-news-description'>
                {newsItem.attributes.description}
              </p>
            </div>
          ))}
        </div> 
        <br />
      </div>
      <br />
      <br />
      <br />
      <br />
      <button onClick={(e) => handleClick(e)}>Log Out</button>
    </>
  )
}

export default HomePage