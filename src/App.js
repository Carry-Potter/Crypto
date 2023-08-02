// App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Home from './Components/Home/Home';
import Favorites from './Components/Favorites/Favorites';
import Details from './Components/Details/Details';
import { FavoritesProvider } from './Components/Favorites/FavoritesContext';
import Header from './Components/Header/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import Footer from './Components/Footer/Footer';

const App = () => {
  // Stanje za praćenje statusa prijavljenosti korisnika
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // Provajder za FavoritesContext kako bi se omogućio pristup informacijama o omiljenim simbolima i operacijama s omiljenima
    <FavoritesProvider>
      <Router>
        <div>
         
          <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />

       
          <Nav variant="tabs" defaultActiveKey="/">
            <Nav.Item>
              <Nav.Link
                eventKey="/"
                as={Link}
                to="/"
                className="nav-link"
                style={{
                  fontSize: '18px',
                  fontWeight: 'bold',
                  color: '#1bd1fa',
                  textDecoration: 'none',
                }}
              >
                Home
              </Nav.Link>
            </Nav.Item>
          
            {isLoggedIn && (
              <Nav.Item>
                <Nav.Link
                  eventKey="/favorites"
                  as={Link}
                  to="/favorites"
                  className="nav-link"
                  style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#1bd1fa',
                    textDecoration: 'none',
                  }}
                >
                  Favorites
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>

         
          <Switch>
            <Route path="/favorites">
              {/* Komponenta za prikaz omiljenih simbola */}
              <Favorites isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/details/:symbol">
              {/* Komponenta za prikaz detalja o određenom simbolu */}
              <Details isLoggedIn={isLoggedIn} />
            </Route>
            <Route path="/">
              {/* Početna stranica aplikacije */}
              <Home />
            </Route>
          </Switch>

          
          <Footer />
        </div>
      </Router>
    </FavoritesProvider>
  );
};

export default App;
