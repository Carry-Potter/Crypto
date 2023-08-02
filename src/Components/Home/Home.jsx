import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import lottie from 'lottie-web';
import animationData from '../../assets/animation_lktyosyz.json';
import './Stayle.css'

const Home = () => {
  const [tickerData, setTickerData] = useState([]);

  // Dohvatanje podataka o svim simbolima pri pokretanju komponente
  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await axios.get('/v2/tickers?symbols=ALL');
        setTickerData(response.data);
      } catch (error) {
        console.error('Error fetching ticker data:', error);
      }
    };

    fetchTickerData();
  }, []);

  // Učitavanje i prikazivanje Lottie animacije pri pokretanju komponente
  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById('lottie-container'), 
      animationData: animationData, 
      renderer: 'svg', 
      loop: false, 
      autoplay: true, 
      
    });
  }, []);

  return (
    <div>
      {tickerData.length > 0 ? (
        // Prikazivanje tabele sa podacima ako ima dostupnih podataka
        <div className="mt-4">
          <Table className="table table-bordered" style={{ maxWidth: '60vw', margin: '0 auto' }}>
            <thead className="thead-dark">
              <tr>
                <th>Name</th>
                <th>Last</th>
                <th>Change</th>
                <th>Change Percent</th>
                <th>High</th>
                <th>Low</th>
              </tr>
            </thead>
            <tbody>
              {/* Prikazivanje redova tabele za prvih 5 simbola */}
              {tickerData.slice(0, 5).map((ticker) => (
                <TickerRow key={ticker[0]} ticker={ticker} />
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        // Prikazivanje poruke "Loading..." ako nema dostupnih podataka
        <p>Loading...</p>
      )}
      {/* Prikazivanje Lottie animacije */}
      <div style={{ width: '300px', height: '300px', margin: '0 auto',transformOrigin: "center center" }} id="lottie-container"></div>
    </div>
  );
};

// Komponenta koja prikazuje red tabele za pojedini simbol
const TickerRow = ({ ticker }) => {
  const symbol = ticker[0];
  const lastPrice = ticker[7];
  const change = ticker[5];
  const changePercent = ticker[6] * 100;
  const high = ticker[9];
  const low = ticker[10];

  return (
    <tr>
      {/* Povezivanje na detalje za određeni simbol */}
      <td>
        <Link
          style={{ fontWeight: 'bold', color: '#1bd1fa', textDecoration: 'none' }}
          to={`/details/${symbol}`}
        >
          {symbol.toUpperCase()}
        </Link>
      </td>
      <td>{lastPrice}</td>
      <td>{change}</td>
      <td>{changePercent.toFixed(2)}%</td>
      <td>{high}</td>
      <td>{low}</td>
    </tr>
  );
};

export default Home;