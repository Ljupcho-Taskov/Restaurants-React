import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";

const RestaurantDetail = () => {
  const { restaurants, setRestaurants } = useContext(RestaurantContext);
  const { calculateAverageRating } = useContext(RestaurantContext);
  const { businessName } = useParams();

  const [newReview, setNewReview] = useState({
    author: "",
    comment: "",
    stars: 0,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("restaurants");
    if (storedData) {
      setRestaurants(JSON.parse(storedData));
    }
  }, [setRestaurants]);

  const restaurantIndex = restaurants.findIndex(
    (r) => r.businessname === businessName
  );

  const restaurant =
    restaurantIndex !== -1 ? restaurants[restaurantIndex] : null;

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!restaurant) return;

    const updatedRestaurant = {
      ...restaurant,
      reviewsList: [
        ...restaurant.reviewsList,
        {
          ...newReview,
          id: restaurant.reviewsList.length + 1,
        },
      ],
    };

    const updatedRestaurants = [...restaurants];
    updatedRestaurants[restaurantIndex] = updatedRestaurant;
    setRestaurants(updatedRestaurants);

    localStorage.setItem("restaurants", JSON.stringify(updatedRestaurants));

    setNewReview({ author: "", comment: "", stars: 0 });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({
      ...prevReview,
      [name]: value,
    }));
  };

  const handleStarsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const stars = parseInt(e.target.value);
    setNewReview((prevReview) => ({
      ...prevReview,
      stars,
    }));
  };

  if (!restaurant) {
    return <div>Restaurant not found</div>;
  }

  return (
    <div className="container">
      <h2 className="text-center">{restaurant.businessname}</h2>
      <picture className="picture-height">
        <img className="rounded-lg" src={restaurant.image} alt="" />
      </picture>
      <div className="py-1 px-2 bg-light rounded-bottom">
        {restaurant.reviewsList.length === 0 ? null : (
          <div>
            <p>
              <span className="bold">Based on </span>
              {restaurant.reviewsList.length}
              {restaurant.reviewsList.length === 1 ? " review" : " reviews"}
            </p>
            <p>
              <span className="bold"> Ratings: </span>
              {calculateAverageRating(restaurant.reviewsList).toFixed(2)}
            </p>
          </div>
        )}
        <p>{restaurant.email}</p>
        <p>{restaurant.address}</p>
        <p>{restaurant.parkinglot ? "We have a parking lot for you" : ""}</p>
      </div>
      <h2 className="text-center">Reviews</h2>
      <div>
        {restaurant.reviewsList.length > 0 ? (
          <>
            {restaurant.reviewsList.map((review) => (
              <div className="bg-light py-2 px-1 mb-3" key={review.id}>
                <p>
                  <span className="bold">Author:</span> {review.author}
                </p>
                <p>
                  <span className="bold">Comment:</span> {review.comment}
                </p>
                <p>
                  <span className="bold">Stars:</span> {review.stars}
                </p>
              </div>
            ))}
          </>
        ) : null}
      </div>
      <form onSubmit={handleSubmitReview}>
        <label htmlFor="name">Name</label>
        <br />
        <input
          className="w-100 mb-2"
          id="name"
          type="text"
          name="author"
          value={newReview.author}
          onChange={handleInputChange}
          placeholder="Your Name"
        />

        <label htmlFor="comment">Comment</label>
        <br />
        <textarea
          id="comment"
          className="w-100"
          name="comment"
          value={newReview.comment}
          onChange={handleInputChange}
          placeholder="Your Review"
        />

        <label htmlFor="stars">Stars</label>
        <input
          className="w-100"
          id="stars"
          name="stars"
          type="range"
          min="0"
          max="5"
          value={newReview.stars}
          onChange={handleStarsChange}
        />
        <button className="w-100 btn btn-success res" type="submit">
          Add Review
        </button>
      </form>
    </div>
  );
};

export default RestaurantDetail;
