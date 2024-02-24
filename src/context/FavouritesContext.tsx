import React, { createContext, useContext, useState } from "react";

interface FavoritesContextType {
  favorites: number[];
  toggleFavorite: (restaurantId: number) => void;
}

export const FavoritesContext = createContext<FavoritesContextType | undefined>(
  undefined
);

interface Props {
  children: React.ReactNode;
}

export const FavoritesContextProvider: React.FC<Props> = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>(
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const toggleFavorite = (restaurantId: number) => {
    setFavorites((prevFavorites) => {
      const index = prevFavorites.indexOf(restaurantId);
      if (index !== -1) {
        const updatedFavorites = [...prevFavorites];
        updatedFavorites.splice(index, 1);
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      } else {
        const updatedFavorites = [...prevFavorites, restaurantId];
        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
        return updatedFavorites;
      }
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
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
