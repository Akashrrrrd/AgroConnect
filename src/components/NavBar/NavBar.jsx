import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import logo_icon from "../../assets/logo.png";
import search_icon from "../../assets/search_icon.png";
import shopping_icon from "../../assets/shopping_icon.png";
import user_icon from "../../assets/user_icon.png";
import wishlist_icon from "../../assets/wishlist_icon.png";
import ai_icon from "../../assets/ai_icon.png";
import { auth } from "../../../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebaseConfig";
import logo_img from './../../../Logo_img.png';

const NavBarMenu = ({ role }) => (
  <ul>
    <li>
      <Link to="/" className="navbar-link">
        Home
      </Link>
    </li>
    <li>
      <Link to="/best-deals" className="navbar-link">
        Products
      </Link>
    </li>
    {role === "seller" && (
      <li>
        <Link to="/dashboard" className="navbar-link">
          Dashboard
        </Link>
      </li>
    )}
    {role === "customer" && (
      <li>
        <Link to="/order-history" className="navbar-link">
          Orders
        </Link>
      </li>
    )}
    <li>
      <Link to="/partners" className="navbar-link">
        Partners
      </Link>
    </li>
    <li>
      <Link to="/contact" className="navbar-link">
        Contact
      </Link>
    </li>
  </ul>
);

const NavBarIcons = ({ user, cartItemCount }) => (
  <>
    {user && (
      <>
        <div className="icon-container">
          <Link to="/ask-ai" className="ai-icon-container">
            <img src={ai_icon} className="icon" alt="AI Assistant" />
            <span className="tooltip">AI</span>
          </Link>
        </div>
        <div className="icon-container">
          <Link to="/wishlist" className="wishlist-icon-container">
            <img src={wishlist_icon} className="icon" alt="Wishlist" />
            <span className="tooltip">Wishlist</span>
          </Link>
        </div>
        <div className="icon-container">
          <Link to="/cart" className="cart-icon-container">
            <img src={shopping_icon} className="icon" alt="Shopping" />
            {cartItemCount > 0 && (
              <div className="cart-item-count">{cartItemCount}</div>
            )}
            <span className="tooltip">Cart</span>
          </Link>
        </div>
        <div className="icon-container">
          <Link to="/user-page">
            <img src={user_icon} className="icon user-icon" alt="User" />
            <span className="tooltip">Profile</span>
          </Link>
        </div>
      </>
    )}
  </>
);

const NavBar = ({ cartItemCount }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();

  const products = [
    { id: 1, name: "Apple", path: "/fruits" },
    { id: 2, name: "Carrot", path: "/vegetables" },
    { id: 3, name: "Milk", path: "/dairyeggs" },
    { id: 4, name: "Bread", path: "/bakery" },
    { id: 5, name: "Banana", path: "/fruits" },
    { id: 6, name: "Tomato", path: "/vegetables" },
    { id: 7, name: "Cucumber", path: "/vegetables" },
    { id: 8, name: "Mongo", path: "/fruits" },
    { id: 9, name: "Grapes", path: "/fruits" },
    { id: 10, name: "Onion", path: "/vegetables" },
    { id: 11, name: "Potato", path: "/vegetables" },
    { id: 12, name: "Orange", path: "/fruits" },
    { id: 13, name: "Broccoli", path: "/vegetables" },
    { id: 14, name: "Pineapple", path: "/fruits" },
    { id: 15, name: "Spinach", path: "/vegetables" },
    { id: 16, name: "Papaya", path: "/fruits" },
    { id: 17, name: "Capsicum", path: "/vegetables" },
    { id: 18, name: "Watermelon", path: "/fruits" },
    { id: 19, name: "Cake", path: "/bakery" },
    { id: 20, name: "Eggs", path: "/dairyeggs" },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setRole(userDoc.data().role);
        }
      } else {
        setUser(null);
        setRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term.trim() !== "") {
      const filteredResults = products.filter((product) =>
        product.name.toLowerCase().includes(term.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleSearchSelect = (path) => {
    navigate(path);
    setSearchTerm("");
    setSearchResults([]);
  };

  return (
    <div className="navbar">
      <img src={logo_img} className="navbar-logo" alt="Logo" />
      <div className="navbar-menu">
        <NavBarMenu role={role} />
      </div>
      <div className="navbar-icons">
        <div className="search-container">
          <input
            placeholder="Search your products"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <img src={search_icon} className="icon" alt="Search" />
          {searchResults.length > 0 && (
            <div className="search-dropdown">
              {searchResults.map((result) => (
                <div
                  key={result.id}
                  className="search-item"
                  onClick={() => handleSearchSelect(result.path)}
                >
                  {result.name}
                </div>
              ))}
            </div>
          )}
        </div>
        <NavBarIcons user={user} cartItemCount={cartItemCount} />
      </div>
      {user ? (
        <button className="btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <Link to="/signin">
          <button className="btn signup-btn">Sign Up</button>
        </Link>
      )}
    </div>
  );
};

export default NavBar;
