import React, { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import { useNavigate } from "react-router-dom";
import Reveal from "./Reveal";

const Cuisines: React.FC = () => {
  const { restaurants } = useContext(RestaurantContext);
  const navigate = useNavigate();

  const cuisineType: string[] = [];

  restaurants.forEach((restaurant) => {
    if (!cuisineType.includes(restaurant.restauranttype)) {
      cuisineType.push(restaurant.restauranttype);
    }
  });

  const navigateToCuisineDetails = (cuisine: string) => {
    navigate(`/cuisine-details/${cuisine}`);
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">Cuisines</h2>
      <div className="row justify-content-center ">
        {cuisineType.map((cuisine, index) => (
          <div className="col-8 col-sm-4 col-lg-2 mb-3 res " key={index}>
            <Reveal>
              <button
                className="red-background "
                onClick={() => navigateToCuisineDetails(cuisine)}
              >
                {cuisine}
              </button>
            </Reveal>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cuisines;
