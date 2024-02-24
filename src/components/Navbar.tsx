import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="container pt-3">
        <div className="d-flex justify-content-between align-items-center">
          <Link to="">
            <h3>Restaurants</h3>
          </Link>
          <Link to="/favorites">
            <i className="fa-solid fa-heart fa-2xl text-danger"></i>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
