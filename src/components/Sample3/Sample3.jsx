import React from 'react';
import './Sample3.css';
import sample3_img from '../../assets/sample3_img.png'

const Sample3 = () => {
  return (
    <div className="sample3">
      <div className="sample3-content">
        <h1>Enjoy the convenience of fresh, farm-sourced produce delivered straight to your home</h1>
        <p>
          Connecting you directly with local farmers for fresh, affordable groceries. 
          No middlemen, just fair prices and support for our farming community.
        </p>
      </div>
      <div className="sample3-image">
        <img src={sample3_img} alt="Consumer" />
      </div>
    </div>
  );
};

export default Sample3;
