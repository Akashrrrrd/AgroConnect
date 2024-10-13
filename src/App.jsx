import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Hero from './components/Hero/Hero';
import Sample from './components/Sample/Sample';
import Breadcrum from './components/Breadcrum/Breadcrum';
import BestDeals from './components/BestDeals/BestDeals';
import Footer from './components/Footer/Footer';
import SignIn from './pages/SignIn/SignIn';
import Fruits from './pages/Fruits/Fruits';
import Vegetables from './pages/Vegetables/Vegetables';
import DairyEggs from './pages/DairyEggs/DairyEggs';
import Millets from './pages/Millets/Millets';
import Cart from './pages/Cart/Cart';
import Sample2 from './components/Sample2/Sample2';
import Sample3 from './components/Sample3/Sample3';
import Scrollbar from './components/Scrollbar/Scrollbar';
import ConnectNow from './components/ConnectNow/ConnectNow';
import Beverages from './pages/Beverages/Beverages';
import Bakery from './pages/Bakery/Bakery';
import SnacksAndSweets from './pages/Snacks&Sweets/Snacks&Sweets';
import MeatAndSeafood from './pages/MeatAndSeafood/MeatAndSeafood';
import ViewDetails from './pages/ViewDetails/ViewDetails';
import Testimonials from './components/Testimonials/Testimonials';
import Dashboard from './pages/Dashboard/Dashboard';
import UserPage from './pages/UserPage/UserPage';
import NearFarm from './pages/NearFarm/NearFarm';
import PaymentPage from './pages/PaymentPage/PaymentPage';
import Wishlist from './pages/Wishlist/Wishlist';
import OrderHistory from './pages/OrderHistory/OrderHistory';
import AI from './pages/AI/AI';
import FAQ from './components/FAQ/FAQ';

const App = () => {
  const [cartItems, setCartItems] = useState(() => {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find((cartItem) => cartItem.id === item.id);
      if (itemExists) {
        return prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  const updateCartQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Router>
      <NavBar cartItemCount={cartItemCount} />
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <Sample />
            <Breadcrum />
            <BestDeals />
            <Sample2 />
            <Scrollbar />
            <Sample3 />
            <Testimonials />
            <FAQ/>
            <ConnectNow />
            <Footer />
          </>
        } />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/fruits" element={<Fruits />} />
        <Route path="/vegetables" element={<Vegetables />} />
        <Route path="/dairyeggs" element={<DairyEggs />} />
        <Route path="/millets" element={<Millets />} />
        <Route path="/best-deals" element={<BestDeals />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={
          <Cart
            cartItems={cartItems}
            updateCartQuantity={updateCartQuantity}
            removeFromCart={removeFromCart}
          />
        } />
        <Route path="/beverages" element={<Beverages />} />
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/snacks" element={<SnacksAndSweets />} />
        <Route path="/meat" element={<MeatAndSeafood />} />
        <Route path="/view-details" element={<ViewDetails addToCart={addToCart} />} />
        <Route path="/user-page" element={<UserPage />} />
        <Route path="/near-farm" element={<NearFarm />} />
        <Route path='/payment-page' element={<PaymentPage />} />
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/order-history' element={<OrderHistory/>}/>
        <Route path='/ask-ai' element={<AI/>}/>
      </Routes>
    </Router>
  );
};

export default App;
