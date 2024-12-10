import React from "react";
import { Link } from "react-router-dom";
import "./Sample.css";
import backgroundImage from "../../assets/background.png";
import fruitsImage from "../../assets/fruits_icon.png";
import vegetablesImage from "../../assets/vegetables_icon.png";
import dairyImage from "../../assets/dairy_milk_icon.png";
import milletsImage from "../../assets/millets_icon.png";
import beveragesImage from "../../assets/beverages_icon.png";
import snacksImage from "../../assets/snacks_icon.png";
import meatImage from "../../assets/meat_icon.png";
import bakeryImage from "../../assets/bakery_icon.png";
import popularFruitsImage from "../../assets/fruits_1.png";
import popularVegetablesImage from "../../assets/vegetable_4.png";
import popularDairyImage from "../../assets/dairy_8.png";
import popularMilletsImage from "../../assets/millet_3.png";
import popularBeveragesImage from "../../assets/beverage_6.png";
import popularSnacksImage from "../../assets/snack_2.png";
import popularMeatImage from "../../assets/seafood_3.png";
import popularBakeryImage from "../../assets/bakery_5.png";

const popularProducts = [
  {
    id: 9,
    name: "Apples",
    image: popularFruitsImage,
    rating: "★★★★☆",
    price: "₹60",
    stock: 100,
    manufacturedDate: "2024-09-01",
  },
  {
    id: 10,
    name: "Broccoli",
    image: popularVegetablesImage,
    rating: "★★★★☆",
    price: "₹90",
    stock: 50,
    manufacturedDate: "2024-08-20",
  },
  {
    id: 11,
    name: "Curd",
    image: popularDairyImage,
    rating: "★★★★☆",
    price: "₹35",
    stock: 200,
    manufacturedDate: "2024-09-10",
  },
  {
    id: 12,
    name: "Jowar",
    image: popularMilletsImage,
    rating: "★★★★☆",
    price: "₹75",
    stock: 75,
    manufacturedDate: "2024-07-15",
  },
  {
    id: 13,
    name: "Coffee",
    image: popularBeveragesImage,
    rating: "★★★★☆",
    price: "₹60",
    stock: 80,
    manufacturedDate: "2024-08-05",
  },
  {
    id: 14,
    name: "Chocolate",
    image: popularSnacksImage,
    rating: "★★★★☆",
    price: "₹120",
    stock: 150,
    manufacturedDate: "2024-09-12",
  },
  {
    id: 15,
    name: "Crab",
    image: popularMeatImage,
    rating: "★★★★☆",
    price: "₹700",
    stock: 25,
    manufacturedDate: "2024-09-15",
  },
  {
    id: 16,
    name: "Cookies",
    image: popularBakeryImage,
    rating: "★★★★☆",
    price: "₹80",
    stock: 120,
    manufacturedDate: "2024-09-01",
  },
];

const Sample = () => {
  return (
    <div className="grocery-page">
      <div
        className="background-image"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="content">
        <div className="banner">
          <h1 className="sample-header">
            Discover Amazing Grocery Deals! <span>Shop Now</span>
          </h1>
        </div>

        <section className="featured-categories">
          <h2>Featured Categories</h2>
          <div className="category-container">
            <Link to="/fruits" className="category-item">
              <img src={fruitsImage} alt="Fruits" />
              <p>Fruits</p>
            </Link>
            <Link to="/vegetables" className="category-item">
              <img src={vegetablesImage} alt="Vegetables" />
              <p>Vegetables</p>
            </Link>
            <Link to="/dairyeggs" className="category-item">
              <img src={dairyImage} alt="Dairy & Eggs" />
              <p>Dairy & Eggs</p>
            </Link>
            <Link to="/millets" className="category-item">
              <img src={milletsImage} alt="Millets" />
              <p>Millets</p>
            </Link>
          </div>
          <br />
          <br />
          <div className="category-container">
            <Link to="/bakery" className="category-item">
              <img src={bakeryImage} alt="Bakery Products" />
              <p>Bakery Products</p>
            </Link>
            <Link to="/beverages" className="category-item">
              <img src={beveragesImage} alt="Beverages" />
              <p>Beverages</p>
            </Link>
            <Link to="/snacks" className="category-item">
              <img src={snacksImage} alt="Snacks & Sweets" />
              <p>Snacks & Sweets</p>
            </Link>
            <Link to="/meat" className="category-item">
              <img src={meatImage} alt="Meat & Seafood" />
              <p>Meat & Seafood</p>
            </Link>
          </div>
        </section>

        <br />
        <br />

        <section className="popular-products">
          <h2>Popular Products</h2>
          <div className="product-container">
            {popularProducts.map((item) => (
              <div key={item.id} className="product-item">
                <img src={item.image} alt={item.name} />
                <div className="product-details">
                  <h3>{item.name}</h3>
                  <div className="rating">{item.rating}</div>
                  <p className="price">{item.price}</p>
                  <Link to="/view-details" state={{ item }}>
                    <button className="add-to-cart">View Details</button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Sample;
