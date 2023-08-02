// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { FavoritesProvider } from './Components/Favorites/FavoritesContext';
import 'bootstrap/dist/css/bootstrap.min.css';
ReactDOM.render(
  <React.StrictMode>
    <FavoritesProvider>
      <App />
    </FavoritesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
