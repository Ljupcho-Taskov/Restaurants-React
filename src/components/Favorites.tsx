import React, { useContext, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { Data } from "../types/types";
import { useFavorites } from "../context/FavouritesContext";
import { RestaurantContext } from "../context/RestaurantContext";

const Favorites: React.FC = () => {
  const { toggleFavorite } = useFavorites();
  const [favoriteRestaurants, setFavoriteRestaurants] = React.useState<Data[]>(
    []
  );

  const { restaurants } = useContext(RestaurantContext);

  useEffect(() => {
    const storedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const favoriteRestaurantsFromStorage = storedFavorites.map((id: number) => {
      return restaurants.find((r) => r.id === id);
    });

    setFavoriteRestaurants(favoriteRestaurantsFromStorage);
  }, [restaurants]);

  return (
    <div className="container">
      <h2 className="text-center">Favorite Restaurants</h2>
      <div className="d-flex flex-wrap">
        {favoriteRestaurants.map(
          (restaurant: Data) =>
            restaurant && (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
                addToFavorites={toggleFavorite}
              />
            )
        )}
      </div>
    </div>
  );
};

export default Favorites;
