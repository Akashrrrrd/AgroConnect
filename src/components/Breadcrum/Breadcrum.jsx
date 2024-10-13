import React from "react";
import "./Breadcrum.css";
import farmImage from "../../assets/breadcrum_img.png"; 

const Breadcrum = () => {
  return (
    <div className="breadcrum">
      <div className="breadcrum-text">
        <h1>Everyday Fresh and Clean from the Farm!</h1>
      </div>
      <div className="breadcrum-image">
        <img src={farmImage} alt="Farm" />
      </div>
    </div>
  );
};

export default Breadcrum;
