import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { RestaurantContext } from "../context/RestaurantContext";
import { ReviewsList } from "../types/types";

interface ButtonProps {
  title: string;
}
const Button = ({ title }: ButtonProps) => {
  const { restaurants } = useContext(RestaurantContext);
  return (
    <>
      {restaurants.map((restaurant) => (
        <Link
          to={`/cuisine-details/${restaurant.restauranttype}`}
          key={restaurant.id}
        >
          <button className="btn btn-warning cuisine text-white">
            {title}
          </button>
        </Link>
      ))}
    </>
  );
};

export default Button;
