import React from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./ViewDetails.css";

const ViewDetails = ({ addToCart, addToWishlist }) => {
  const location = useLocation();
  const { item } = location.state || {};

  // Log the item and location state for debugging
  console.log("Location State:", location.state);
  console.log("Selected Item:", item);

  // If no item is found in state, show an error message
  if (!item) {
    return <div className="vd-view-details">Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(item);
    toast.success("Item added to cart!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  };

  const handleAddToWishlist = () => {
    const storedWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    // Check if the item is already in the wishlist
    const isItemInWishlist = storedWishlist.some(
      (wishlistItem) => wishlistItem.id === item.id
    );

    if (isItemInWishlist) {
      // If the item is already in the wishlist, show a message
      toast.info("Item already in wishlist!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      // If the item is not in the wishlist, add it
      const updatedWishlist = [...storedWishlist, item];
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
      toast.success("Item added to wishlist!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="vd-view-details">
      <ToastContainer />
      <div className="vd-product-container">
        <div className="vd-product-image-container">
          <img src={item.image} alt={item.name} className="vd-product-image" />
        </div>
        <div className="vd-product-details-container">
          <h2 className="vd-product-name">{item.name}</h2>
          <p className="vd-product-description">
            {item.description || "No description available"}
          </p>
          <p className="vd-product-price">Price: {item.price}</p>
          <p className="vd-product-stock">Remaining Stock: {item.stock}</p>
          <p className="vd-product-date">
            Manufactured Date: {item.manufacturedDate}
          </p>
          <div className="vd-button-container">
            <button className="vd-add-to-cart" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button
              className="vd-add-to-wishlist"
              onClick={handleAddToWishlist}
            >
              Add to Wishlist
            </button>
            <Link to="/near-farm">
              <button className="vd-find-near-farm">Find Near Farm</button>
            </Link>
          </div>
        </div>
      </div>

      <div className="vd-additional-info">
        <div className="vd-reviews-section">
          <h3>Customer Reviews</h3>
          <div className="vd-review-item">
            <strong>Akash Rajendran:</strong> Great product! Fresh and high
            quality.
            <span className="vd-rating">★★★★★</span>
          </div>
          <div className="vd-review-item">
            <strong>Abishek S:</strong> Satisfied with the purchase. Will order
            again!
            <span className="vd-rating">★★★★☆</span>
          </div>
        </div>

        <div className="vd-related-products">
          <h3>Related Products</h3>
          <div className="vd-related-product-list">
            {Array.isArray(item.relatedProducts) &&
            item.relatedProducts.length > 0 ? (
              item.relatedProducts.map((relatedProduct, index) => (
                <div key={index} className="vd-related-product-item">
                  <img src={relatedProduct.image} alt={relatedProduct.name} />
                  <p>{relatedProduct.name}</p>
                  <span className="vd-related-price">
                    ₹{relatedProduct.price}
                  </span>
                </div>
              ))
            ) : (
              <p>No related products available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewDetails;
