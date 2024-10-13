import React from 'react';
import './DairyEggs.css';
import dairy_1 from '../../assets/dairy_1.png'; 
import dairy_2 from '../../assets/dairy_2.png';
import dairy_3 from '../../assets/dairy_3.png';
import dairy_4 from '../../assets/dairy_4.png';
import dairy_5 from '../../assets/dairy_5.png';
import dairy_6 from '../../assets/dairy_6.png';
import dairy_7 from '../../assets/dairy_7.png';
import dairy_8 from '../../assets/dairy_8.png';

const DairyEggs = () => {
  const dairyProducts = [
    { name: 'Milk', price: '₹50', rating: '★★★★☆', image: dairy_1 },
    { name: 'Cheese', price: '₹100', rating: '★★★★★', image: dairy_2 },
    { name: 'Butter', price: '₹70', rating: '★★★★☆', image: dairy_3 },
    { name: 'Yogurt', price: '₹40', rating: '★★★☆☆', image: dairy_4 },
    { name: 'Eggs', price: '₹60', rating: '★★★★☆', image: dairy_5 },
    { name: 'Paneer', price: '₹80', rating: '★★★★★', image: dairy_6 },
    { name: 'Honey', price: '₹90', rating: '★★★☆☆', image: dairy_7 },
    { name: 'Curd', price: '₹35', rating: '★★★★☆', image: dairy_8 },
  ];

  return (
    <div className="grocery-page">
      <div className="content">
        <section className="best-deals">
          <h2>Dairy & Eggs</h2>
          <div className="product-container">
            {dairyProducts.slice(0, 4).map((product, index) => (
              <div key={index} className="product-item">
                <img src={product.image} alt={product.name} />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <div className="rating">{product.rating}</div>
                  <p className="price">{product.price}</p>
                  <button className="add-to-cart">View Details</button>
                </div>
              </div>
            ))}
          </div>
          <br/>
          <br/>
          <div className="product-container">
            {dairyProducts.slice(4).map((product, index) => (
              <div key={index} className="product-item">
                <img src={product.image} alt={product.name} />
                <div className="product-details">
                  <h3>{product.name}</h3>
                  <div className="rating">{product.rating}</div>
                  <p className="price">{product.price}</p>
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

export default DairyEggs;
