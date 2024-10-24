import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-container">
      <header className="contact-header">
        <h1>Contact AgroConnect</h1>
        <p>Welcome to AgroConnect, Where Freshness Meets Affordability</p>
      </header>

      <div className="contact-info">
        <div className="contact-card">
          <h2>Get In Touch</h2>
          <p>
            Whether you have a question about our products, pricing, or anything else, our team is ready to answer all your questions.
          </p>
          <ul>
            <li>Email: support@agroconnect.com</li>
            <li>Phone: +91 9655667171</li>
            <li>Address: 123, Big Street, Chennai - 600 069</li>
          </ul>
        </div>

        <div className="contact-form">
          <h2>Contact Us</h2>
          <form>
            <label htmlFor="name">Your Name</label>
            <input type="text" id="name" name="name" required />

            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" name="email" required />

            <label htmlFor="message">Your Message</label>
            <textarea id="message" name="message" rows="5" required></textarea>

            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>

      <footer className="contact-footer">
        <h3>Connect with Us</h3>
        <ul className="social-icons">
          <li><a href="#"><i className="fab fa-facebook"></i></a></li>
          <li><a href="#"><i className="fab fa-twitter"></i></a></li>
          <li><a href="#"><i className="fab fa-instagram"></i></a></li>
          <li><a href="#"><i className="fab fa-linkedin"></i></a></li>
        </ul>
        <p>© 2024 AgroConnect. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Contact;
