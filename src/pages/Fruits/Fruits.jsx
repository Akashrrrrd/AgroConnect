import React from 'react';
import './Fruits.css';
import fruit_1 from '../../assets/fruits_1.png'; 
import fruit_2 from '../../assets/fruits_2.png';
import fruit_3 from '../../assets/fruits_3.png';
import fruit_4 from '../../assets/fruits_4.png';
import fruit_5 from '../../assets/fruits_5.png'; 
import fruit_6 from '../../assets/fruits_6.png';
import fruit_7 from '../../assets/fruits_7.png';
import fruit_8 from '../../assets/fruits_8.png';

const Fruits = () => {
  const fruits = [
    { name: 'Apple', price: '₹60', rating: '★★★★☆', image: fruit_1 },
    { name: 'Banana', price: '₹40', rating: '★★★☆☆', image: fruit_2 },
    { name: 'Grapes', price: '₹120', rating: '★★★★★', image: fruit_3 },
    { name: 'Mango', price: '₹80', rating: '★★★★☆', image: fruit_4 },
    { name: 'Orange', price: '₹50', rating: '★★★★☆', image: fruit_5 },
    { name: 'Pineapple', price: '₹90', rating: '★★★☆☆', image: fruit_6 },
    { name: 'Papaya', price: '₹70', rating: '★★★☆☆', image: fruit_7 },
    { name: 'Watermelon', price: '₹45', rating: '★★★★☆', image: fruit_8 },
  ];

  return (
    <div className="grocery-page">
      <div className="content">
        <section className="best-deals">
          <h2>Fruits</h2>
          <div className="product-container">
            {fruits.slice(0, 4).map((fruit, index) => (
              <div key={index} className="product-item">
                <img src={fruit.image} alt={fruit.name} />
                <div className="product-details">
                  <h3>{fruit.name}</h3>
                  <div className="rating">{fruit.rating}</div>
                  <p className="price">{fruit.price}</p>
                  <button className="add-to-cart">View Details</button>
                </div>
              </div>
            ))}
          </div>
          <br/>
          <br/>
          <div className="product-container">
            {fruits.slice(4).map((fruit, index) => (
              <div key={index} className="product-item">
                <img src={fruit.image} alt={fruit.name} />
                <div className="product-details">
                  <h3>{fruit.name}</h3>
                  <div className="rating">{fruit.rating}</div>
                  <p className="price">{fruit.price}</p>
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

export default Fruits;
