import React, { useContext } from "react";
import RestaurantCard from "./RestaurantCard";
import { RestaurantContext } from "../context/RestaurantContext";

const AllRestaurants: React.FC = () => {
  const { restaurants } = useContext(RestaurantContext);

  return (
    <div className="container">
      <h2 className="text-center mb-3">All Restaurants</h2>

      <div className="d-flex flex-wrap">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard index={index} key={restaurant.id} {...restaurant} />
        ))}
      </div>
    </div>
  );
};

export default AllRestaurants;
