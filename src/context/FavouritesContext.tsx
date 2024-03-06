import React, { createContext, useContext, useEffect, useState } from "react";
import { Data } from "../types/types";

interface FavoritesContextType {
  favorites: Data[];
  addToFavorites: (restaurant: Partial<Data>) => void;
  removeFromFavorites: (product: Partial<Data>) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}

export const FavoritesContextProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<Data[]>([]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  const addToFavorites = (restaurant: Partial<Data>) => {
    const isRestaurantInFavorites = favorites.some(
      (favoriteItem) => favoriteItem.id === restaurant.id
    );

    if (!isRestaurantInFavorites) {
      setFavorites((prevFavorites) => [...prevFavorites, restaurant as Data]);
    }
  };
  const removeFromFavorites = (restaurant: Partial<Data>) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item.id !== restaurant.id)
    );
    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites.filter((item) => item.id !== restaurant.id))
    );
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addToFavorites, removeFromFavorites }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
