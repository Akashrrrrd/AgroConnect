import React, { useState, useEffect } from "react";
import { db } from "./../../../firebaseConfig"; // Import Firestore from firebaseConfig
import { collection, addDoc, getDocs } from "firebase/firestore"; // Import Firestore methods
import "./Dashboard.css";

const Dashboard = () => {
  const [orders, setOrders] = useState([
    { id: 1, product: "Tomatoes", status: "Pending", price: 20 },
    { id: 2, product: "Carrots", status: "Shipped", price: 15 },
    { id: 3, product: "Potatoes", status: "Delivered", price: 18 },
  ]);

  const [products, setProducts] = useState([]);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    available: true, // Default to 'In Stock'
  });

  // Fetch products from Firestore on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "dashboard"));
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching products: ", error);
      }
    };

    fetchProducts();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const handleAddProduct = async () => {
    if (newProduct.name && newProduct.price) {
      try {
        // Add product to Firestore
        const docRef = await addDoc(collection(db, "dashboard"), {
          name: newProduct.name,
          price: parseFloat(newProduct.price),
          available: newProduct.available,
        });

        // Update local state with new product
        setProducts((prevProducts) => [
          ...prevProducts,
          {
            id: docRef.id,
            name: newProduct.name,
            price: parseFloat(newProduct.price),
            available: newProduct.available,
          },
        ]);

        // Reset new product form
        setNewProduct({ name: "", price: "", available: true });
        setIsAddProductModalOpen(false);
      } catch (error) {
        console.error("Error adding product to Firestore: ", error);
      }
    }
  };

  return (
    <div className="db-dashboard">
      <header className="db-dashboard-header">
        <h1>Farm Fresh Dashboard</h1>
        <p>Manage your harvest and orders</p>
      </header>

      <main className="db-dashboard-content">
        <section className="db-orders-section">
          <h2>Recent Orders</h2>
          <div className="db-order-list">
            {orders.map((order) => (
              <div key={order.id} className="db-order-item">
                <div className="db-order-info">
                  <span className="db-product-name">{order.product}</span>
                  <span className="db-order-price">
                    ₹{order.price.toFixed(2)}
                  </span>
                </div>
                <div className="db-order-status">
                  <span
                    className={`db-status-badge db-${order.status.toLowerCase()}`}
                  >
                    {order.status}
                  </span>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      handleStatusChange(order.id, e.target.value)
                    }
                    className="db-status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="db-products-section">
          <h2>Inventory</h2>
          <button
            onClick={() => setIsAddProductModalOpen(true)}
            className="db-add-product-btn"
          >
            Add New Product
          </button>
          <div className="db-product-list">
            {products.map((product) => (
              <div
                key={product.id}
                className={`db-product-item ${
                  product.available ? "db-available" : "db-unavailable"
                }`}
              >
                <span className="db-product-name">{product.name}</span>
                <span className="db-product-price">
                  ₹{product.price ? product.price.toFixed(2) : "0.00"}
                </span>
                <span className="db-product-status">
                  {product.available !== undefined
                    ? product.available
                      ? "In Stock"
                      : "Out of Stock"
                    : "In Stock"}
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {isAddProductModalOpen && (
        <div className="db-modal-overlay">
          <div className="db-modal-content">
            <div className="db-modal-header">
              <h3 className="db-modal-title">Add New Product</h3>
              <button
                onClick={() => setIsAddProductModalOpen(false)}
                className="db-close-button"
              >
                &times;
              </button>
            </div>
            <div className="db-form-group">
              <label htmlFor="product-name">Product Name</label>
              <input
                id="product-name"
                type="text"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
                placeholder="Enter product name"
              />
            </div>
            <div className="db-form-group">
              <label htmlFor="product-price">Price</label>
              <input
                id="product-price"
                type="number"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
                placeholder="Enter price"
              />
            </div>
            <div className="db-form-group">
              <label className="db-checkbox-label">
                <input
                  type="checkbox"
                  checked={newProduct.available}
                  onChange={(e) =>
                    setNewProduct({
                      ...newProduct,
                      available: e.target.checked,
                    })
                  }
                  className="db-checkbox"
                />
                Available
              </label>
            </div>
            <div className="db-modal-footer">
              <button onClick={handleAddProduct} className="db-submit-btn">
                Add Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
