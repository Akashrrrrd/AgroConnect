import React from "react";
import "./Hero.css";
import hero_image from "../../assets/hero_image.png";

const Hero = () => {
  return (
    <div className="hero">
      <div className="hero-text">
        <h1>
          Welcome to <span>AgroConnect</span> Where Freshness Meets Affordability
        </h1>
        <p>
          Connecting you directly with local farmers for fresh, affordable groceries. No middlemen, just fair prices and support for our farming community.
        </p>
      </div>
      <div className="hero-image">
        <img src={hero_image} alt="Fresh Vegetables" />
      </div>
    </div>
  );
};

export default Hero;
