import React, { useState } from 'react';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    name: 'Akash R',
    location: 'Chennai, India',
    message: 'I love shopping on Agro Connect! The produce is always fresh, and I love supporting local farmers directly.',
    image: '/api/placeholder/100/100'
  },
  {
    id: 2,
    name: 'Abishek S',
    location: 'Chennai, India',
    message: 'Fantastic service and quality! The direct connection with farmers makes all the difference.',
    image: '/api/placeholder/100/100'
  },
  {
    id: 3,
    name: 'Karthik Raj S',
    location: 'Chennai, India',
    message: 'Great platform! I get fresh groceries and support local agriculture. Highly recommend!',
    image: '/api/placeholder/100/100'
  },
  {
    id: 4,
    name: 'Venkat Balaji',
    location: 'Chennai, India',
    message: 'The quality of produce and customer service is outstanding. Shopping here feels like a connection to nature.',
    image: '/api/placeholder/100/100'
  }
];


const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const { name, location, message, image } = testimonials[currentIndex];

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <h2>What Our Customers Say About Agro Connect</h2>
        <div className="testimonial-slider">
          <div className="testimonial-card">
            <div className="testimonial-content">
              <img src={image} alt={name} className="testimonial-image" />
              <div className="testimonial-info">
                <div className="testimonial-header">
                  <h3 className="testimonial-name">{name}</h3>
                  <p className="testimonial-location">{location}</p>
                </div>
                <p className="testimonial-message">"{message}"</p>
              </div>
            </div>
          </div>
          <button className="slider-btn prev" onClick={handlePrev}>
            &#10094;
          </button>
          <button className="slider-btn next" onClick={handleNext}>
            &#10095;
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;