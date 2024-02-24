import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import AllRestaurants from "../components/AllRestaurants";
import Cuisines from "../components/Cuisines";
import RestaurantContextConstructor from "../context/RestaurantContext";
import RestaurantDetail from "../components/RestaurantDetail ";
import CuisinesDetails from "../components/CuisinesDetails";
import PopularResaurants from "../components/PopularRestaurants";
import SurpriseRestaurant from "../components/SurpriseRestaurant";
import Favorites from "../components/Favorites";
import { FavoritesContextProvider } from "../context/FavouritesContext";

const Home = () => {
  return (
    <RestaurantContextConstructor>
      <FavoritesContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SurpriseRestaurant />
                  <PopularResaurants />
                  <Cuisines />
                  <AllRestaurants />
                </>
              }
            ></Route>
            <Route
              path="/restaurant-details/:businessName"
              element={<RestaurantDetail />}
            ></Route>
            <Route
              path="/cuisine-details/:cuisineType"
              element={<CuisinesDetails />}
            ></Route>
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </FavoritesContextProvider>
    </RestaurantContextConstructor>
  );
};

export default Home;
