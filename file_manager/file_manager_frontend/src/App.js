import React, { useRef, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import { Col, Row } from "reactstrap";
import MapView from './components/MapView';

const App = () => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [username, setUserName] = useState(localStorage.getItem('username'));
  const headerRef = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    // Check for stored token on app initialization
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setAuthToken(storedToken);
    }
  }, []);



  const handleLogin = (token, username) => {
    // Save the token in localStorage on successful login
    localStorage.setItem('authToken', token);
    localStorage.setItem('username', username);
    setAuthToken(token);
    setUserName(username);
  };

  const handleLogout = () => {
    const handleLogout = () => {
      // Clear the stored token on logout
      localStorage.removeItem('authToken');
      localStorage.removeItem('username');
      window.location.reload();

    };
  };

  useEffect(() => {
    setHeaderHeight(headerRef.current.offsetHeight);
  }, []);


  const styles = {
    contentDiv: {
      display: "flex",
      height: `calc(100vh - ${headerHeight}px)`,
      overflow: "auto",
      backgroundColor: "#8b8585",

    },
    contentMargin: {
      // marginLeft: "10px",
      width: "100%",
    },
  };

  return (
    <div>
      <div ref={headerRef}>
        <Header authToken={authToken} username={username} onLogout={handleLogout} />
      </div>
      {!authToken ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div style={styles.contentDiv}>
          <Router>
            <div style={styles.contentMargin}>
              <Routes>
              <Route path="/" element={<MapView  altura={`${headerHeight}`}/>} />
              {/* <Route path="/adminusuarios" element={<AdminUser authToken={authToken} altura={`${headerHeight}`} />} /> */}
              {/* <Route path="/micuenta" element={<Account authToken={authToken} altura={`${headerHeight}`} />} /> */}
                {/* Añade más rutas aquí para otros MenuItem */}
            </Routes>
        </div>
        </Router>
        </div >
      )}

    </div >
  );
};

export default App;
