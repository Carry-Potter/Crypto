import React from 'react';
import axios from 'axios';
import { useFavorites } from './FavoritesContext';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './Stayle.css'
const Favorites = ({ isLoggedIn }) => {
  // Dohvatanje omiljenih simbola i funkcije za uklanjanje iz omiljenih preko "useFavorites" 
  const { favorites, removeFavorite } = useFavorites();

  return (
    <div>
      {isLoggedIn && (
        <div className="mt-4 container" style={{ margin: '0 20%' }}>
          <h1>Favorite Symbols</h1>
          {favorites.length > 0 ? (
            <div className="table-responsive">
              <Table className="table table-bordered">
                <thead className="thead-dark">
                  <tr>
                    <th>Name</th>
                    <th>Last</th>
                    <th>Change</th>
                    <th>Change Percent</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {/* Mapiranje omiljenih simbola na komponentu "TickerRow" */}
                  {favorites.map((symbol) => (
                    <TickerRow key={symbol} symbol={symbol} removeFavorite={removeFavorite} />
                  ))}
                </tbody>
              </Table>
            </div>
          ) : (
            <p>No favorites added yet.</p>
          )}
        </div>
      )}
    </div>
  );
};

// Komponenta koja prikazuje red u tabeli za omiljeni simbol
const TickerRow = ({ symbol, removeFavorite }) => {
  const [tickerData, setTickerData] = React.useState(null);

  // Efekat koji se izvršava kada se komponenta montira (kada se prvi put prikaže)
  React.useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await axios.get(`/v2/ticker/${symbol}`);
        setTickerData(response.data);
      } catch (error) {
        console.error(`Greška prilikom dohvatanja ticker podataka za simbol ${symbol}:`, error);
      }
    };

    // Poziv funkcije za dohvatanje podataka o simbolu kada se promeni vrednost "symbol"
    fetchTickerData();
  }, [symbol]);

  return (
    <tr>
      <td style={{ fontWeight: 'bold', color: '#1bd1fa', textDecoration: 'none', fontSize: '16px', textAlign: 'center' }}>{symbol && symbol.toUpperCase()}</td>
      {tickerData ? (
        
        <>
          <td>{tickerData[6]}</td>
          <td>{tickerData[4]}</td>
          <td>{(tickerData[5] * 100).toFixed(2)}%</td>
          <td>{tickerData[8]}</td>
          <td>{tickerData[9]}</td>
          <td>
         
            <Button variant="danger" onClick={() => removeFavorite(symbol)}>Remove from Favorites</Button>
          </td>
        </>
      ) : (
        
        <td colSpan="6">Loading...</td>
      )}
    </tr>
  );
};

export default Favorites;
