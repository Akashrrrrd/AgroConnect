import React from 'react';
import './Sample2.css';
import sample2_img from '../../assets/sample2_img.png'

const Sample2 = () => {
  return (
    <div className="sample2">
      <div className="sample2-content">
        <h1>Farm-to-Table Revolution: Bridging the Gap Between Farmers and Consumers</h1>
        <p>
          Connecting you directly with local farmers for fresh, affordable groceries. 
          No middlemen, just fair prices and support for our farming community.
        </p>
      </div>
      <div className="sample2-image">
        <img src={sample2_img} alt="Farmer" />
      </div>
    </div>
  );
};

export default Sample2;
