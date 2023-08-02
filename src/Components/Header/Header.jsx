import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import './Stayle.css'

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  // Stanje koje prati vrednost ulogovanosti korisnika koja se čuva u local storage-u
  const [localStorageLoggedIn, setLocalStorageLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');

  // Efekat koji se izvršava kada se promeni vrednost ulogovanosti korisnika (isLoggedIn)
  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn);
    setLocalStorageLoggedIn(isLoggedIn);
  }, [isLoggedIn]);

  // Funkcija za obradu događaja klika na dugme "Login"
  const handleLogin = () => {
    setIsLoggedIn(true);
  };
  
  return (
    
    <header className="d-flex justify-content-between align-items-center bg-dark text-light p-3">
      <div style={{ flex: 1 }}>
      
        {!localStorageLoggedIn && <Button variant="primary" size="lg" block onClick={handleLogin}>Login</Button>}
       
       
        {localStorageLoggedIn && <p>You are logged in!</p>}
      </div>
      <div style={{ flex: 2, textAlign: 'center' }}>
        
        <h1  style={{ fontSize: '48px' }}>CRYPTO EXCHANGE</h1>
      </div>
      <div style={{ flex: 1 }}></div>
    </header>
  );
};

export default Header;