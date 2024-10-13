import React, { useState } from 'react';
import './Cart.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { db } from './../../../firebaseConfig'; // Import Firestore
import { addDoc, collection } from 'firebase/firestore'; // Firestore methods

const Cart = ({ cartItems, updateCartQuantity, removeFromCart }) => {
  const [selectedPayment, setSelectedPayment] = useState('');
  const navigate = useNavigate();

  const subtotal = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price.replace('₹', ''));
    return total + price * item.quantity;
  }, 0);

  const handleProceedToPay = async () => {
    if (selectedPayment) {
      try {
        // Add the order to Firestore's 'orders' collection
        await addDoc(collection(db, 'orders'), {
          items: cartItems,
          total: subtotal.toFixed(2),
          paymentMethod: selectedPayment,
          timestamp: new Date(),
        });

        toast.success('Proceeding to payment...');
        navigate('/payment-page', { state: { selectedPayment } });
      } catch (error) {
        toast.error('Failed to save the order. Please try again.');
        console.error('Error saving order:', error);
      }
    } else {
      toast.error('Please select a payment method to proceed.');
    }
  };

  const handleRemoveFromCart = (id) => {
    removeFromCart(id);
    toast.info('Item removed from cart.');
  };

  const handleQuantityUpdate = (id, quantity) => {
    if (quantity <= 0) {
      toast.warning('Quantity cannot be less than 1.');
    } else {
      updateCartQuantity(id, quantity);
      toast.success('Cart updated successfully.');
    }
  };

  return (
    <div className="shopping-cart">
      <ToastContainer />
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <div className="no-products-found">No Products Found</div>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            <div className="cart-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Subtotal</span>
            </div>
            {cartItems.map((item) => {
              const price = parseFloat(item.price.replace('₹', ''));
              return (
                <div key={item.id} className="cart-item">
                  <div className="product">
                    <img src={item.image} alt={item.name} />
                    <span>{item.name}</span>
                  </div>
                  <span className="price">₹{price}</span>
                  <div className="quantity">
                    <button onClick={() => handleQuantityUpdate(item.id, item.quantity - 1)}>-</button>
                    <input type="text" value={item.quantity} readOnly />
                    <button onClick={() => handleQuantityUpdate(item.id, item.quantity + 1)}>+</button>
                  </div>
                  <span>₹{(price * item.quantity).toFixed(2)}</span>
                  <button className="remove" onClick={() => handleRemoveFromCart(item.id)}>×</button>
                </div>
              );
            })}
            <button className='pay-btn' onClick={handleProceedToPay}>Order Now</button>
          </div>
          <div className="cart-summary">
            <h2>Summary</h2>
            <div className="summary-items">
              <div>Subtotal</div>
              <div>₹{subtotal.toFixed(2)}</div>
              <div>Tax</div>
              <div>₹0</div>
              <div>Shipping</div>
              <div>₹0</div>
              <div className="total">Overall Total</div>
              <div>₹{subtotal.toFixed(2)}</div>
            </div>
            <div className="coupon">
              <input type="text" placeholder="Coupon code" />
              <button>Apply</button>
            </div>
            <div className="payment-method">
              <p>Payment method:</p>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="Cash on Delivery"
                  checked={selectedPayment === 'Cash on Delivery'}
                  onChange={() => setSelectedPayment('Cash on Delivery')}
                />
                Cash on Delivery
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="UPI"
                  checked={selectedPayment === 'UPI'}
                  onChange={() => setSelectedPayment('UPI')}
                />
                UPI
              </label>
              <label>
                <input
                  type="radio"
                  name="payment"
                  value="Mobile Banking"
                  checked={selectedPayment === 'Mobile Banking'}
                  onChange={() => setSelectedPayment('Mobile Banking')}
                />
                Mobile Banking
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
