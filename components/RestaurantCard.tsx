import React, { useContext } from "react";
import { Data } from "../types/types";
import { useFavorites } from "../context/FavouritesContext";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import Reveal from "./Reveal";

interface RestaurantCardProps {
  restaurant: Data;
  addToFavorites: (restaurantId: number) => void;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { calculateAverageRating } = useContext(RestaurantContext);

  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-4 res">
      <Reveal>
        <Link to={`/restaurant-details/${restaurant.businessname}`}>
          <picture className="position-relative">
            <img className="rounded-lg" src={restaurant.image} alt="" />
            <i
              className={`fa-heart small-heart res ${
                favorites.includes(restaurant.id) ? "fa-solid" : "fa-regular"
              }`}
              onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>) => {
                event.preventDefault();
                toggleFavorite(restaurant.id);
              }}
            ></i>
          </picture>
          <div
            style={{ height: "160px" }}
            className="bg-light rounded-bottom py-1 px-2"
          >
            <h5>{restaurant.businessname}</h5>
            <p className="bold red">{restaurant.restauranttype}</p>

            {restaurant.reviewsList.length === 0 ? null : (
              <div>
                <p>
                  <span className="bold"> Based on </span>
                  {restaurant.reviewsList.length}
                  {restaurant.reviewsList.length === 1 ? " review" : " reviews"}
                </p>
                <p>
                  <span className="bold">Ratings: </span>
                  {calculateAverageRating(restaurant.reviewsList).toFixed(2)}
                </p>
              </div>
            )}
          </div>
        </Link>
      </Reveal>
    </div>
  );
};

export default RestaurantCard;
