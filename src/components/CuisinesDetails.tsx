import React, { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import { useParams } from "react-router-dom";
import RestaurantCard from "./RestaurantCard";
import { useFavorites } from "../context/FavouritesContext";

const CuisineDetails: React.FC = () => {
  const { cuisineType } = useParams();
  const { restaurants } = useContext(RestaurantContext);
  const { toggleFavorite } = useFavorites();

  const filteredRestaurants = restaurants.filter(
    (restaurant) => restaurant.restauranttype === cuisineType
  );
  if (!filteredRestaurants) {
    return <div>restaurant not found</div>;
  }
  const restaurant = restaurants.find((r) => r.restauranttype === cuisineType);
  return (
    <div className="container">
      <h2>{restaurant?.restauranttype}</h2>
      <div className="row d-flex">
        {filteredRestaurants.map((restaurant) => (
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

export default CuisineDetails;
