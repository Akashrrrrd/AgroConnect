import React from 'react';
import './Beverages.css';
import beverage_1 from '../../assets/beverage_1.png'; 
import beverage_2 from '../../assets/beverage_2.png';
import beverage_3 from '../../assets/beverage_3.png';
import beverage_4 from '../../assets/beverage_4.png';
import beverage_5 from '../../assets/beverage_5.png';
import beverage_6 from '../../assets/beverage_6.png';
import beverage_7 from '../../assets/beverage_7.png';
import beverage_8 from '../../assets/beverage_8.png';

const Beverages = () => {
  const beverages = [
    { name: 'Coke', price: '₹40', rating: '★★★★☆', image: beverage_1 },
    { name: 'Pepsi', price: '₹35', rating: '★★★☆☆', image: beverage_2 },
    { name: 'Juice', price: '₹50', rating: '★★★★★', image: beverage_3 },
    { name: 'Mineral Water', price: '₹20', rating: '★★★★☆', image: beverage_4 },
    { name: 'Lemonade', price: '₹25', rating: '★★★☆☆', image: beverage_5 },
    { name: 'Coffee', price: '₹60', rating: '★★★★☆', image: beverage_6 },
    { name: 'Tea', price: '₹30', rating: '★★★★☆', image: beverage_7 },
    { name: 'Smoothie', price: '₹80', rating: '★★★☆☆', image: beverage_8 },
  ];

  return (
    <div className="grocery-page">
      <div className="content">
        <section className="best-deals">
          <h2>Beverages</h2>
          <div className="product-container">
            {beverages.slice(0, 4).map((beverage, index) => (
              <div key={index} className="product-item">
                <img src={beverage.image} alt={beverage.name} />
                <div className="product-details">
                  <h3>{beverage.name}</h3>
                  <div className="rating">{beverage.rating}</div>
                  <p className="price">{beverage.price}</p>
                  <button className="add-to-cart">View Details</button>
                </div>
              </div>
            ))}
          </div>
          <br/>
          <br/>
          <div className="product-container">
            {beverages.slice(4).map((beverage, index) => (
              <div key={index} className="product-item">
                <img src={beverage.image} alt={beverage.name} />
                <div className="product-details">
                  <h3>{beverage.name}</h3>
                  <div className="rating">{beverage.rating}</div>
                  <p className="price">{beverage.price}</p>
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

export default Beverages;
