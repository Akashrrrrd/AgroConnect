import React, { useState } from "react";
import "./Scrollbar.css";

import img_1 from '../../assets/img_1.png';
import img_2 from '../../assets/img_2.png';
import img_3 from '../../assets/img_3.png';
import img_4 from '../../assets/img_4.png';

const Scrollbar = () => {
  const images = [img_1, img_2, img_3, img_4]; // Use the imported images
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="scrollbar-container">
      <div className="carousel">
        <img
          src={images[currentIndex]}
          alt={`Image ${currentIndex + 1}`}
          className="scrollbar-image"
        />
        <button className="scrollbar-nav left" onClick={handlePrev}>
          &lt;
        </button>
        <button className="scrollbar-nav right" onClick={handleNext}>
          &gt;
        </button>
      </div>

      <br/>
      <br/>
      {/* AgroConnect Description */}
      <div className="agroconnect-description">
        <h2>AgroConnect – Online Grocery Store</h2>
        <p>
          Have you ever imagined having farm-fresh fruits and vegetables, premium-quality grains, organic dairy products,
          and a wide variety of branded essentials delivered right to your doorstep with just a click? In today's busy
          world, <strong>AgroConnect</strong>, India's trusted online grocery store, brings you a curated selection of
          over 30,000 products from over 800 trusted brands. Whether it's wholesome groceries, pantry staples, organic produce,
          or the latest wellness and personal care products, <strong>AgroConnect</strong> is your reliable one-stop solution for
          all your daily essentials. Experience convenience like never before with fast delivery, quality products, and unbeatable
          prices, all at <strong>AgroConnect</strong>!
        </p>
      </div>
    </div>
  );
};

export default Scrollbar;
