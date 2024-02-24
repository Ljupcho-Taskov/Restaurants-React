import React, { useContext } from "react";
import { useFavorites } from "../context/FavouritesContext";
import RestaurantCard from "./RestaurantCard";
import { RestaurantContext } from "../context/RestaurantContext";
import { Data } from "../types/types";
const PopularRestaurants: React.FC = () => {
  const { toggleFavorite } = useFavorites();
  const { restaurants, calculateAverageRating } = useContext(RestaurantContext);

  const sortedRestaurants = [...restaurants].sort(
    (a, b) =>
      calculateAverageRating(b.reviewsList) -
      calculateAverageRating(a.reviewsList)
  );

  const top10 = sortedRestaurants.slice(0, 10);

  return (
    <div className="container">
      <h2 className="text-center mb-4">Popular Restaurants</h2>
      <div className="row d-flex">
        {top10.map((restaurant: Data) => (
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

export default PopularRestaurants;
