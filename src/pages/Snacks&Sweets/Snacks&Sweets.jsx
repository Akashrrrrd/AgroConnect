import React from 'react';
import './Snacks&Sweets.css';
import snack_1 from '../../assets/snack_1.png'; 
import snack_2 from '../../assets/snack_2.png';
import snack_3 from '../../assets/snack_3.png';
import snack_4 from '../../assets/snack_4.png';
import snack_5 from '../../assets/snack_5.png';
import snack_6 from '../../assets/snack_6.png';
import snack_7 from '../../assets/snack_7.png';
import snack_8 from '../../assets/snack_8.png';

const SnacksAndSweets = () => {
  const snacksAndSweets = [
    { name: 'Chips', price: '₹50', rating: '★★★★☆', image: snack_1 },
    { name: 'Chocolate', price: '₹120', rating: '★★★★★', image: snack_2 },
    { name: 'Nuts', price: '₹80', rating: '★★★★☆', image: snack_3 },
    { name: 'Jalebi', price: '₹70', rating: '★★★☆☆', image: snack_4 },
    { name: 'Popcorn', price: '₹60', rating: '★★★★☆', image: snack_5 },
    { name: 'Gummies', price: '₹90', rating: '★★★☆☆', image: snack_6 },
    { name: 'Candy', price: '₹40', rating: '★★★★★', image: snack_7 },
    { name: 'Pudding', price: '₹100', rating: '★★★★☆', image: snack_8 },
  ];

  return (
    <div className="grocery-page">
      <div className="content">
        <section className="best-deals">
          <h2>Snacks & Sweets</h2>
          <div className="product-container">
            {snacksAndSweets.slice(0, 4).map((item, index) => (
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
            {snacksAndSweets.slice(4).map((item, index) => (
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

export default SnacksAndSweets;
