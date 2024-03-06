import React, { useContext } from "react";
import { Data } from "../types/types";
import { useFavorites } from "../context/FavouritesContext";
import { Link } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import Reveal from "./Reveal";

interface RestaurantCardProps extends Data {
  index: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  reviews,
  parkinglot,
  phone,
  image,
  restauranttype,
  businessname,
  address,
  slug,
  email,
  id,
  reviewsList,
}) => {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const { calculateAverageRating } = useContext(RestaurantContext);

  const isFavorite = favorites.some((favoriteItem) => favoriteItem.id === id);

  const handleToggleFavorite = (
    event: React.MouseEvent<HTMLParagraphElement>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (isFavorite) {
      removeFromFavorites({
        reviews,
        parkinglot,
        phone,
        image,
        restauranttype,
        businessname,
        address,
        slug,
        email,
        id,
        reviewsList,
      });
    } else {
      addToFavorites({
        reviews,
        parkinglot,
        phone,
        image,
        restauranttype,
        businessname,
        address,
        slug,
        email,
        id,
        reviewsList,
      });
    }
  };

  return (
    <div className="col-12 col-sm-6 col-lg-4 mb-4 res">
      <Reveal>
        <Link to={`/restaurant-details/${businessname}`}>
          <picture className="position-relative">
            <img className="rounded-lg" src={image} alt="" />

            <span onClick={handleToggleFavorite}>
              {isFavorite ? (
                <i className="fa-heart small-heart fa-solid"></i>
              ) : (
                <i className="fa-heart small-heart fa-regular"></i>
              )}
            </span>
          </picture>
          <div
            style={{ height: "160px" }}
            className="bg-light rounded-bottom py-1 px-2"
          >
            <h5>{businessname}</h5>
            <p className="bold red">{restauranttype}</p>

            {reviewsList.length === 0 ? null : (
              <div>
                <p>
                  <span className="bold"> Based on </span>
                  {reviewsList.length}
                  {reviewsList.length === 1 ? " review" : " reviews"}
                </p>
                <p>
                  <span className="bold">Ratings: </span>
                  {calculateAverageRating(reviewsList).toFixed(2)}
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
