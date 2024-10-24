import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const NavBarMenu = ({ role }) => (
  <ul>
    <li><Link to="/" className="navbar-link">Home</Link></li>
    <li><Link to="/best-deals" className="navbar-link">Products</Link></li>
    {role === "seller" && <li><Link to="/dashboard" className="navbar-link">Dashboard</Link></li>}
    {role === "customer" && <li><Link to="/order-history" className="navbar-link">Orders</Link></li>}
    <li><Link to="/partners" className="navbar-link">Partners</Link></li>
    <li><Link to="/contact" className="navbar-link">Contact</Link></li>
  </ul>
);

const NavBarIcons = ({ user, cartItemCount }) => (
  <>
    {user && (
      <>
        <div className="search-container">
          <input placeholder="Search your products" />
          <img src={search_icon} className="icon" alt="Search" />
        </div>
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
            {cartItemCount > 0 && <div className="cart-item-count">{cartItemCount}</div>}
            <span className="tooltip">Cart</span>
          </Link>
        </div>
        <div className="icon-container">
          <Link to="/user-page">
            <img src={user_icon} className="icon user-icon" alt="User" />
            <span className="tooltip">Profile</span>
          </Link>
          <span className="user-name">{user.displayName || " "}</span>
        </div>
      </>
    )}
  </>
);

const NavBar = ({ cartItemCount }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

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

  return (
    <div className="navbar">
      <img src={logo_icon} className="navbar-logo" alt="Logo" />
      <div className="navbar-menu">
        <NavBarMenu role={role} />
      </div>
      <div className="navbar-icons">
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
