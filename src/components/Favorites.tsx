import React, { useContext, useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import { Data } from "../types/types";
import { useFavorites } from "../context/FavouritesContext";
import { RestaurantContext } from "../context/RestaurantContext";

const Favorites: React.FC = () => {
  const { favorites } = useFavorites();
  const { restaurants } = useContext(RestaurantContext);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState<Data[]>([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const favoriteRestaurantsFromStorage = storedFavorites.map((id: string) => {
      return restaurants.find((r) => r.id === id);
    });

    setFavoriteRestaurants(favoriteRestaurantsFromStorage);
  }, [restaurants]);

  return (
    <div className="container">
      <h2 className="text-center">Favorite Restaurants</h2>
      <div className="d-flex flex-wrap">
        {favorites.map((restaurant, index) => (
          <RestaurantCard key={restaurant.id} index={index} {...restaurant} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;
