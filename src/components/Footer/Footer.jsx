import React, { useState } from "react";
import "./Footer.css";
import insta_icon from "../../assets/insta_icon.png";
import linkedin_icon from "../../assets/linkedin_icon.png";
import facebook_icon from "../../assets/facebook_icon.png";
import x_icon from "../../assets/x_icon.png";
import app_google_icon from "../../assets/google_img.png";
import app_apple_icon from "../../assets/apple_img.png";

const Footer = () => {
  const [query, setQuery] = useState("");

  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h2 className="footer-title">AgroConnect</h2>
          <p>Cultivating innovation for sustainable agriculture.</p>
          <p>Join us in growing a greener future.</p>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li>About Us</li>
            <li>Our Services</li>
            <li>Blog</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Legal</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
            <li>Cookie Policy</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Us</h4>
          <p>
            <i className="fas fa-envelope"></i> support@agroconnect.com
          </p>
          <p>
            <i className="fas fa-phone"></i> +91 9876543210
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> 123 Green Avenue,
          </p>
          <p>Eco City, Nature State - 600069.</p>
        </div>
        <div className="footer-section">
          <h4>Get Our App</h4>
          <img
            className="app-links"
            src={app_google_icon}
            alt="Get it on Google Play"
          />
          <img
            className="app-links"
            src={app_apple_icon}
            alt="Download on App Store"
          />
        </div>
      </div>

      <div className="footer-section social">
        <h4>Connect With Us</h4>
        <div className="social-links">
          <a href="#">
            <img src={insta_icon} alt="Instagram" />
          </a>
          <a href="#">
            <img src={linkedin_icon} alt="LinkedIn" />
          </a>
          <a href="#">
            <img src={facebook_icon} alt="Facebook" />
          </a>
          <a href="#">
            <img src={x_icon} alt="Twitter" />
          </a>
        </div>
      </div>
      <div className="copy-footer">
        <p>
          &copy; {new Date().getFullYear()} AgroConnect Pvt. Ltd. All Rights
          Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
