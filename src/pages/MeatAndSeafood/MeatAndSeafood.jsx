import React from 'react';
import './MeatAndSeafood.css';
import meatImage1 from '../../assets/meat_1.png'; 
import meatImage2 from '../../assets/meat_2.png';
import meatImage3 from '../../assets/meat_3.png';
import meatImage4 from '../../assets/meat_4.png';
import seafoodImage1 from '../../assets/seafood_1.png';
import seafoodImage2 from '../../assets/seafood_2.png';
import seafoodImage3 from '../../assets/seafood_3.png';
import seafoodImage4 from '../../assets/seafood_4.png';

const MeatAndSeafood = () => {
  const meatAndSeafoodItems = [
    { name: 'Chicken Breast', price: '₹200', rating: '★★★★☆', image: meatImage1 },
    { name: 'Beef Steak', price: '₹500', rating: '★★★★★', image: meatImage2 },
    { name: 'Pork Ribs', price: '₹350', rating: '★★★★☆', image: meatImage3 },
    { name: 'Lamb Chops', price: '₹600', rating: '★★★★★', image: meatImage4 },
    { name: 'Salmon Fillet', price: '₹450', rating: '★★★★☆', image: seafoodImage1 },
    { name: 'Shrimp', price: '₹300', rating: '★★★★☆', image: seafoodImage2 },
    { name: 'Crab', price: '₹700', rating: '★★★★★', image: seafoodImage3 },
    { name: 'Tuna', price: '₹550', rating: '★★★★☆', image: seafoodImage4 }
  ];

  return (
    <div className="grocery-page">
      <div className="content">
        <section className="best-deals">
          <h2>Meat & Seafood</h2>
          <div className="product-container">
            {meatAndSeafoodItems.slice(0, 4).map((item, index) => (
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
          <br/>
          <br/>
          <div className="product-container">
            {meatAndSeafoodItems.slice(4).map((item, index) => (
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

export default MeatAndSeafood;
