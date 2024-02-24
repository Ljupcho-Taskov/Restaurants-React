import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";

const SurpriseRestaurant: React.FC = () => {
  const { restaurants } = useContext(RestaurantContext);
  const navigate = useNavigate();

  const getRandomRestaurant = () => {
    const randomIndex = Math.floor(Math.random() * restaurants.length);

    const randomRestaurant = restaurants[randomIndex];

    navigate(`/restaurant-details/${randomRestaurant.businessname}`);
  };

  return (
    <div className="container">
      <h2 className="text-uppercasse text-center mb-4">Surprise Restaurant</h2>
      <button
        className="btn btn-success w-100 res"
        onClick={getRandomRestaurant}
      >
        Get a Surprise Restaurant
      </button>
    </div>
  );
};

export default SurpriseRestaurant;
