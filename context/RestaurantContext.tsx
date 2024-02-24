import React, { createContext, useEffect, useState } from "react";
import { Data, ReviewsList } from "../types/types";

interface RestaurantContextType {
  restaurants: Data[];
  reviewsList: ReviewsList[];
  setReviewsList: React.Dispatch<React.SetStateAction<ReviewsList[]>>;
  setRestaurants: React.Dispatch<React.SetStateAction<Data[]>>;
  calculateAverageRating: (reviewsList: ReviewsList[]) => number;
}

export const RestaurantContext = createContext<RestaurantContextType>({
  restaurants: [],
  reviewsList: [],
  setReviewsList: () => {},
  setRestaurants: () => {},
  calculateAverageRating: () => 0,
});

interface Props {
  children: React.ReactNode;
}

export const RestaurantContextConstructor: React.FC<Props> = ({ children }) => {
  const [restaurants, setRestaurants] = useState<Data[]>([
    {
      reviews: 0,
      parkinglot: false,
      phone: "",
      image: "",
      restauranttype: "",
      businessname: "",
      address: "",
      slug: "",
      email: "",
      id: 0,
      reviewsList: [],
    },
  ]);

  const [reviewsList, setReviewsList] = useState<ReviewsList[]>([]);

  const calculateAverageRating = (reviewsList: ReviewsList[]) => {
    if (reviewsList.length > 0) {
      const totalStars = reviewsList.reduce(
        (acc, review) => acc + review.stars,
        0
      );
      return totalStars / reviewsList.length;
    }
    return 0;
  };

  useEffect(() => {
    fetch("http://localhost:5001/restaurants/")
      .then((res) => res.json())
      .then((data) => {
        setRestaurants(data);
        setReviewsList(data.reviewsList);
      });
  }, []);

  const contextValue: RestaurantContextType = {
    restaurants,
    reviewsList,
    setRestaurants,
    setReviewsList,
    calculateAverageRating,
  };

  return (
    <RestaurantContext.Provider value={contextValue}>
      {children}
    </RestaurantContext.Provider>
  );
};

export default RestaurantContextConstructor;
