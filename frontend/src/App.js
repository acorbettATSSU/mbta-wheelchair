import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import './index.css';

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import MbtaServicePage from "./components/pages/mbtaService";

import Stops from "./components/pages/stops"
import RatingView from "./components/pages/ratingView"
import NewRating from "./components/pages/newRating"
import ViewComment from "./components/pages/viewComments"
import Comment from "./components/pages/comment"
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";
import Services from "./components/pages/services";
import EditUserPage from "./components/pages/editUserPage";
// Push pull test
export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/editUserPage" element={<EditUserPage/>} />
          <Route exact path="/viewComments" element={<ViewComment/>} />
          <Route exact path = "/comment" element={<Comment/>} />
          <Route exact path="/mbtaService" element={<MbtaServicePage />} />
          <Route exact path="/services" element={<Services />} />
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/newRating" element={<NewRating />} />
          <Route path="/ratings" element={<RatingView />} />
          <Route path="/stops" element={<Stops />} />
          
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
