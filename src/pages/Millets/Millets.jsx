import React from 'react';
import './Millets.css';
import milletImage1 from '../../assets/millet_1.png';
import milletImage2 from '../../assets/millet_2.png';
import milletImage3 from '../../assets/millet_3.png';
import milletImage4 from '../../assets/millet_4.png';
import milletImage5 from '../../assets/millet_5.png';
import milletImage6 from '../../assets/millet_6.png';
import milletImage7 from '../../assets/millet_7.png';
import milletImage8 from '../../assets/millet_8.png';

const Millets = () => {
  const milletProducts = [
    { name: 'Ragi', price: '₹70', rating: '★★★★☆', image: milletImage1 },
    { name: 'Kodo', price: '₹65', rating: '★★★★☆', image: milletImage2 },
    { name: 'Jowar', price: '₹75', rating: '★★★★★', image: milletImage3 },
    { name: 'Sama', price: '₹80', rating: '★★★★☆', image: milletImage4 },
    { name: 'Bajra', price: '₹85', rating: '★★★★☆', image: milletImage5 },
    { name: 'Foxtail', price: '₹90', rating: '★★★★★', image: milletImage6 },
    { name: 'Little Millet', price: '₹70', rating: '★★★☆☆', image: milletImage7 },
    { name: 'Barnyard Millet', price: '₹95', rating: '★★★★☆', image: milletImage8 }
  ];  

  return (
    <div className="grocery-page">
      <div className="content">
        <section className="best-deals">
          <h2>Millets</h2>
          <div className="product-container">
            {milletProducts.map((millet, index) => (
              <div key={index} className="product-item">
                <img src={millet.image} alt={millet.name} />
                <div className="product-details">
                  <h3>{millet.name}</h3>
                  <div className="rating">{millet.rating}</div>
                  <p className="price">{millet.price}</p>
                  <button className="add-to-cart">View Details</button>
                </div>
              </div>
            ))}
          </div>
          <br />
          <br />
          {/* <div className="navigation-arrows">
            <button className="arrow left">&lt;</button>
            <button className="arrow right">&gt;</button>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default Millets;
