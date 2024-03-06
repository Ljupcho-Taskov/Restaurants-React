import React, { useContext } from "react";

import RestaurantCard from "./RestaurantCard";
import { RestaurantContext } from "../context/RestaurantContext";

const PopularRestaurants: React.FC = () => {
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
        {top10.map((restaurant, index) => (
          <RestaurantCard index={index} key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </div>
  );
};

export default PopularRestaurants;
