import React, { useState, useEffect } from 'react';
import { db } from './../../../firebaseConfig'; // Import Firestore config
import { collection, getDocs } from 'firebase/firestore'; // Firestore methods
import './OrderHistory.css'; // Import custom CSS

const OrderHistory = () => {
  const [orderHistory, setOrderHistory] = useState([]);

  // Fetch order history from Firestore
  useEffect(() => {
    const fetchOrderHistory = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'orders')); // Fetch orders from Firestore
        const orderData = [];
        querySnapshot.forEach((doc) => {
          orderData.push({ id: doc.id, ...doc.data() });
        });
        setOrderHistory(orderData);
      } catch (error) {
        console.error('Error fetching order history:', error);
      }
    };

    fetchOrderHistory();
  }, []);

  return (
    <div className="order-history-container">
      <h2>Order History</h2>
      {orderHistory.length === 0 ? (
        <div>No order history available</div>
      ) : (
        <div className="orders">
          {orderHistory.map((order) => (
            <div key={order.id} className="order-card">
              <h3>Order ID: {order.id}</h3>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>Total: ₹{order.total}</p>
              <p>Order Date: {new Date(order.timestamp.toDate()).toLocaleDateString()}</p>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img src={item.image} alt={item.name} className="order-item-image" />
                    <div className="item-details">
                      <p>{item.name}</p>
                      <p>Price: {item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>Subtotal: ₹{(item.quantity * parseFloat(item.price.replace('₹', ''))).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
