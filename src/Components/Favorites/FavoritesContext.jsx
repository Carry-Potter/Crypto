import React, { createContext, useContext, useState } from 'react';

// Kreiranje FavoritesContext konteksta pomoću createContext()
const FavoritesContext = createContext();

// Custom hook koji koristi FavoritesContext da omogući pristup omiljenim simbolima i funkcijama za upravljanje njima
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}

// Komponenta FavoritesProvider koja upravlja stanjem omiljenih simbola
export function FavoritesProvider({ children }) {
  // Stanje omiljenih simbola koje se pamti u favorites
  const [favorites, setFavorites] = useState([]);

  // Funkcija za dodavanje omiljenog simbola
  const addFavorite = (symbol) => {
    if (!favorites.some((fav) => fav === symbol)) {
      setFavorites([...favorites, symbol]);
    }
  };

  // Funkcija za uklanjanje omiljenog simbola
  const removeFavorite = (symbol) => {
    setFavorites(favorites.filter((fav) => fav !== symbol));
  };

  // Provera da li je simbol omiljen
  const isFavorite = (symbol) => favorites.includes(symbol);

  // Objekat koji sadrži omiljene simbole i funkcije za njihovo upravljanje
  const value = {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };

  // Returnovanje Providera sa vrednostima (favorites i funkcije za upravljanje) koje će biti dostupne svim potomcima
  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}