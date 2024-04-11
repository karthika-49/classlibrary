import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import HomePage from './Components/HomePage';
import Signup from './Components/Signup';
import Library from './Components/Library';
import SubjectPdfs from './Components/SubjectPdfs';
import UserProfile from './Components/UserProfile';
// import Chatbot from './Components/Chatbot';
function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check localStorage for login status during initialization
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Implement your login logic here
    setLoggedIn(true);
  };

  const handleLogout = () => {
    // Implement your logout logic here
    setLoggedIn(false);
    localStorage.removeItem('token');
  };

  return (
      <>
        <Navbar loggedIn={loggedIn} onLogout={handleLogout} />
        <Routes>
          <Route path="/" element={<HomePage loggedIn={loggedIn} />} />
          <Route
            path="/signup"
            element={
              loggedIn ? (
                <Navigate to="/" /> // Redirect to home if already logged in
              ) : (
                <Signup />
              )
            }
          />
          <Route
            path="/login"
            element={
              loggedIn ? (
                <Navigate to="/" /> // Redirect to home if already logged in
              ) : (
                <Login setLoggedIn={handleLogin} loggedIn={loggedIn} /> // Pass loggedIn prop
              )
            }
          />
           <Route path="/user/:userId" element={<UserProfile loggedIn={loggedIn}  />} />
          <Route path="/subjects" element={<Library />} />
          <Route
            path="/subjects/:subjectName"
            element={<SubjectPdfs loggedIn={loggedIn} />}
          />
        </Routes>
        {/* {loggedIn && <Chatbot />}  */}
      </>
  );
}

export default App;
