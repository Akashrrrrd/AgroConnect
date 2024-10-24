import React from 'react';
import './Partners.css';
import partners_1 from "./../../assets/partners_1.png";
import partners_2 from "./../../assets/partners_2.png";
import partners_3 from "./../../assets/partners_3.png";
import partners_4 from "./../../assets/partners_4.png";
import partners_5 from "./../../assets/partners_5.png";

const Partners = () => {
  return (
    <div className="partners-container">
      <h1 className="partners-heading">Our Trusted Partners</h1>
      <p className="partners-description">
        AgroConnect brings together the best partners to ensure seamless delivery of fresh and affordable produce.
      </p>
      <p className="partners-message">
        As a platform created with the heart of farmers in mind, we strive to bring you closer to trusted partners who are as committed to freshness and quality as you are.
      </p>

      <div className="partners-grid">
        <div className="partner-card">
          <img src={partners_1} alt="Partner 1" className="partner-image" />
          <h3 className="partner-name">Bluedart</h3>
        </div>
        <div className="partner-card">
          <img src={partners_2} alt="Partner 2" className="partner-image" />
          <h3 className="partner-name">Delhivery</h3>
        </div>
        <div className="partner-card">
          <img src={partners_3} alt="Partner 3" className="partner-image" />
          <h3 className="partner-name">Ecom Express</h3>
        </div>
        <div className="partner-card">
          <img src={partners_4} alt="Partner 4" className="partner-image" />
          <h3 className="partner-name">Porter</h3>
        </div>
        <div className="partner-card">
          <img src={partners_5} alt="Partner 5" className="partner-image" />
          <h3 className="partner-name">XpressBees</h3>
        </div>
      </div>
    </div>
  );
};

export default Partners;
