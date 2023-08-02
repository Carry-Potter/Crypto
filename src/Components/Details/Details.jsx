import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useFavorites } from "../Favorites/FavoritesContext";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import lottie from "lottie-web";
import animationData from "../../assets/animation_lktyozqh.json";
import "./Details.css";
const Details = ({ isLoggedIn }) => {
  // Dobavljanje simbola iz URL
  const { symbol } = useParams();

  // Stanja koja prate podatke o simbolu, validnosti simbola i informacije o omiljenosti simbola
  const [tickerData, setTickerData] = useState(null);
  const [invalidSymbol, setInvalidSymbol] = useState(false);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  // Funkcija za obradu događaja dodavanja/uklanjanja simbola iz omiljenih
  const handleToggleFavorite = () => {
    if (!isLoggedIn) {
      // Ako korisnik nije prijavljen, vrati se jer ne može da menja omiljene simbole
      return;
    }

    // Proveri da li je simbol već omiljen, pa ga dodaj ili ukloni iz liste omiljenih
    if (isFavorite(symbol)) {
      removeFavorite(symbol);
    } else {
      addFavorite(symbol);
    }
  };

  // Efekat koji se izvršava kada se promeni simbol, dohvata podatke o tom simbolu
  useEffect(() => {
    const fetchTickerData = async () => {
      try {
        const response = await axios.get(`/v2/ticker/${symbol}`);
        setTickerData(response.data);
      } catch (error) {
        console.error(
          `Greška prilikom dohvatanja ticker podataka za simbol ${symbol}:`,
          error
        );
        setInvalidSymbol(true);
      }
    };

    // Ako je simbol definisan, izvrši fetchTickerData funkciju
    if (symbol) {
      fetchTickerData();
    }
  }, [symbol]);

  useEffect(() => {
    lottie.loadAnimation({
      container: document.getElementById("lottie-container"),
      animationData: animationData,
      renderer: "svg",
      loop: true,
      autoplay: true,
    });
  }, []);

  // Prikazivanje detalja o simbolu i opciju dodavanja/uklanjanja iz omiljenih
  return (
    <div className="container" style={{ margin: "0 20%" }}>
      {invalidSymbol ? (
        <p>Invalid symbol: {symbol}</p>
      ) : (
        <div>
          <h2 className="mt-4">
            Detalji za simbol: {symbol && symbol.toUpperCase()}
          </h2>
          {tickerData ? (
            <div className="mt-3 table-responsive">
              <div className="mt-3 table-responsive table-container">
                <table className="table table-bordered table-striped">
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
                    <tr>
                    <td style={{ fontWeight: 'bold', color: '#1bd1fa', textDecoration: 'none', fontSize: '16px', textAlign: 'center' }}>
  {symbol && symbol.toUpperCase()}
</td>
                      <td >
                        {tickerData[6]}
                      </td>
                      <td>{tickerData[4]}</td>
                      <td>{(tickerData[5] * 100).toFixed(2)}%</td>
                      <td>{tickerData[8]}</td>
                      <td>{tickerData[9]}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {isLoggedIn && (
                <button
                  className="btn btn-primary"
                  onClick={handleToggleFavorite}
                >
                  {isFavorite(symbol)
                    ? "Remove from Favorites"
                    : "Add to Favorites"}
                </button>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}

          <div
            style={{
              width: "300px",
              height: "300px",
              margin: "0 auto",
              transform: "rotate(90deg)",
              transformOrigin: "center center",
            }}
            id="lottie-container"
          ></div>
        </div>
      )}
    </div>
  );
};

export default Details;
