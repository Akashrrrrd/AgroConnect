import React from 'react';
import './Vegetables.css';
import vegetable_1 from '../../assets/vegetable_1.png'; 
import vegetable_2 from '../../assets/vegetable_2.png';
import vegetable_3 from '../../assets/vegetable_3.png';
import vegetable_4 from '../../assets/vegetable_4.png';
import vegetable_5 from '../../assets/vegetable_5.png';
import vegetable_6 from '../../assets/vegetable_6.png';
import vegetable_7 from '../../assets/vegetable_7.png';
import vegetable_8 from '../../assets/vegetable_8.png';

const Vegetables = () => {
  const vegetables = [
    { name: 'Tomato', price: '₹40', rating: '★★★★☆', image: vegetable_1 },
    { name: 'Cucumber', price: '₹30', rating: '★★★☆☆', image: vegetable_2 },
    { name: 'Carrot', price: '₹50', rating: '★★★★★', image: vegetable_3 },
    { name: 'Broccoli', price: '₹90', rating: '★★★★☆', image: vegetable_4 },
    { name: 'Spinach', price: '₹25', rating: '★★★☆☆', image: vegetable_5 },
    { name: 'Capsicum', price: '₹60', rating: '★★★★☆', image: vegetable_6 },
    { name: 'Onion', price: '₹20', rating: '★★★★☆', image: vegetable_7 },
    { name: 'Potato', price: '₹35', rating: '★★★☆☆', image: vegetable_8 },
  ];

  return (
    <div className="grocery-page">
      <div className="content">
        <section className="best-deals">
          <h2>Vegetables</h2>
          <div className="product-container">
            {vegetables.slice(0, 4).map((vegetable, index) => (
              <div key={index} className="product-item">
                <img src={vegetable.image} alt={vegetable.name} />
                <div className="product-details">
                  <h3>{vegetable.name}</h3>
                  <div className="rating">{vegetable.rating}</div>
                  <p className="price">{vegetable.price}</p>
                  <button className="add-to-cart">View Details</button>
                </div>
              </div>
            ))}
          </div>
          <br/>
          <br/>
          <div className="product-container">
            {vegetables.slice(4).map((vegetable, index) => (
              <div key={index} className="product-item">
                <img src={vegetable.image} alt={vegetable.name} />
                <div className="product-details">
                  <h3>{vegetable.name}</h3>
                  <div className="rating">{vegetable.rating}</div>
                  <p className="price">{vegetable.price}</p>
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

export default Vegetables;
