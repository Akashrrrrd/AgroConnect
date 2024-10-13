import React from 'react';
import './Bakery.css';
import bakeryImage1 from '../../assets/bakery_1.png'; 
import bakeryImage2 from '../../assets/bakery_2.png';
import bakeryImage3 from '../../assets/bakery_3.png';
import bakeryImage4 from '../../assets/bakery_4.png';
import bakeryImage5 from '../../assets/bakery_5.png';
import bakeryImage6 from '../../assets/bakery_6.png';
import bakeryImage7 from '../../assets/bakery_7.png';
import bakeryImage8 from '../../assets/bakery_8.png';

const Bakery = () => {
  const bakeryItems = [
    { name: 'Bread', price: '₹40', rating: '★★★★☆', image: bakeryImage1 },
    { name: 'Cake', price: '₹300', rating: '★★★★★', image: bakeryImage2 },
    { name: 'Croissant', price: '₹50', rating: '★★★★☆', image: bakeryImage3 },
    { name: 'Donuts', price: '₹60', rating: '★★★☆☆', image: bakeryImage4 },
    { name: 'Cookies', price: '₹80', rating: '★★★★☆', image: bakeryImage5 },
    { name: 'Muffins', price: '₹70', rating: '★★★☆☆', image: bakeryImage6 },
    { name: 'Pastries', price: '₹90', rating: '★★★★★', image: bakeryImage7 },
    { name: 'Bagels', price: '₹45', rating: '★★★★☆', image: bakeryImage8 },
  ];

  return (
    <div className="grocery-page">
      <div className="content">
        <section className="best-deals">
          <h2>Bakery Products</h2>
          <div className="product-container">
            {bakeryItems.slice(0, 4).map((item, index) => (
              <div key={index} className="product-item">
                <img src={item.image} alt={item.name} />
                <div className="product-details">
                  <h3>{item.name}</h3>
                  <div className="rating">{item.rating}</div>
                  <p className="price">{item.price}</p>
                  <button className="add-to-cart">View Details</button>
                </div>
              </div>
            ))}
          </div>
          <br />
          <br />
          <div className="product-container">
            {bakeryItems.slice(4).map((item, index) => (
              <div key={index} className="product-item">
                <img src={item.image} alt={item.name} />
                <div className="product-details">
                  <h3>{item.name}</h3>
                  <div className="rating">{item.rating}</div>
                  <p className="price">{item.price}</p>
                  <button className="add-to-cart">View Details</button>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="navigation-arrows">
            <button className="arrow left">&lt;</button>
            <button className="arrow right">&gt;</button>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default Bakery;
