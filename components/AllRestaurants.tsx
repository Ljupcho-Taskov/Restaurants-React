import React, { useContext } from "react";
import RestaurantCard from "./RestaurantCard";
import { RestaurantContext } from "../context/RestaurantContext";
import { useFavorites } from "../context/FavouritesContext";

const AllRestaurants: React.FC = () => {
  const { restaurants } = useContext(RestaurantContext);
  const { toggleFavorite } = useFavorites();
  return (
    <div className="container">
      <h2 className="text-center mb-3">All Restaurants</h2>

      <div className="d-flex flex-wrap">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            addToFavorites={toggleFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
