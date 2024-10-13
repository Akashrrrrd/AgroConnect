import React from 'react';
import './BestDeals.css';
import Image1 from '../../assets/vegetable_1.png'; 
import Image2 from '../../assets/vegetable_2.png';
import Image3 from '../../assets/vegetable_3.png';
import Image4 from '../../assets/vegetable_7.png';
import FruitImage1 from '../../assets/fruits_8.png'; 
import FruitImage2 from '../../assets/fruits_5.png'; 
import FruitImage3 from '../../assets/fruits_3.png'; 
import FruitImage4 from '../../assets/fruits_4.png'; 
import { Link } from 'react-router-dom';

const bestDeals = [
  // Vegetables
  { 
    id: 1, 
    name: 'Tomato', 
    image: Image1, 
    rating: '★★★★☆', 
    price: '₹40', 
    stock: 50, 
    manufacturedDate: '2024-09-01',
    description: 'Fresh, ripe tomatoes with a perfect balance of sweetness and acidity. Ideal for salads and cooking.'
  },
  { 
    id: 2, 
    name: 'Cucumber', 
    image: Image2, 
    rating: '★★★☆☆', 
    price: '₹30', 
    stock: 40, 
    manufacturedDate: '2024-08-15',
    description: 'Crisp and refreshing cucumbers. Great for adding a crunchy texture to salads or enjoying as a healthy snack.'
  },
  { 
    id: 3, 
    name: 'Carrot', 
    image: Image3, 
    rating: '★★★★★', 
    price: '₹50', 
    stock: 60, 
    manufacturedDate: '2024-07-20',
    description: 'Sweet and crunchy carrots, packed with vitamins and perfect for snacking, salads, or cooking.'
  },
  { 
    id: 4, 
    name: 'Onion', 
    image: Image4, 
    rating: '★★★☆☆', 
    price: '₹20', 
    stock: 70, 
    manufacturedDate: '2024-09-01',
    description: 'Versatile onions that add a savory depth of flavor to any dish. Essential for cooking and salads.'
  },
  
  // Fruits
  { 
    id: 5, 
    name: 'Watermelon', 
    image: FruitImage1, 
    rating: '★★★★☆', 
    price: '₹60', 
    stock: 30, 
    manufacturedDate: '2024-08-10',
    description: 'Juicy and sweet watermelon, perfect for a refreshing summer treat. Enjoy chilled for the best taste.'
  },
  { 
    id: 6, 
    name: 'Orange', 
    image: FruitImage2, 
    rating: '★★★☆☆', 
    price: '₹40', 
    stock: 45, 
    manufacturedDate: '2024-07-15',
    description: 'Citrusy and tangy oranges, packed with vitamin C. Great for juicing or eating fresh.'
  },
  { 
    id: 7, 
    name: 'Grapes', 
    image: FruitImage3, 
    rating: '★★★★★', 
    price: '₹120', 
    stock: 20, 
    manufacturedDate: '2024-08-20',
    description: 'Sweet and juicy grapes, ideal for snacking or adding to fruit salads. Enjoy their natural sweetness.'
  },
  { 
    id: 8, 
    name: 'Mango', 
    image: FruitImage4, 
    rating: '★★★★☆', 
    price: '₹80', 
    stock: 35, 
    manufacturedDate: '2024-09-05',
    description: 'Lush and aromatic mangoes with a rich flavor. Perfect for smoothies, desserts, or eating fresh.'
  }
];


const BestDeals = () => {
  return (
    <div className="grocery-page">
      <div className="content">
        <section className="best-deals">
          <h2>Best Deals of this Week!</h2>
          <div className="product-container">
            {bestDeals.map((item) => (
              <div key={item.id} className="product-item">
                <img src={item.image} alt={item.name} />
                <div className="product-details">
                  <h3>{item.name}</h3>
                  <div className="rating">{item.rating}</div>
                  <p className="price">{item.price}</p>
                  <Link 
                    to="/view-details"
                    state={{ item }}
                  >
                    <button className="add-to-cart">View Details</button>
                  </Link>
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

export default BestDeals;
