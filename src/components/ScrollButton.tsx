import React, { useState, useEffect } from "react";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      // Check if user has scrolled down by certain amount, e.g., 400px
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Attach event listener when component mounts
    window.addEventListener("scroll", handleScroll);

    // Cleanup: remove event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Run this effect only once when component mounts

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      className="scroll-button res"
      onClick={scrollToTop}
      style={{ display: isVisible ? "block" : "none" }}
    >
      <i className="fa-solid fa-angle-up"></i>
    </button>
  );
};

export default ScrollButton;
