import React, { useState } from "react";
import { CreditCard, Calendar, Lock, User } from "lucide-react";
import "./PaymentPage.css";
import { useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PaymentPage = () => {
  const location = useLocation();
  const { selectedPayment } = location.state || {};

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    amount: "",
    upiId: "",
    accountHolder: "",
    ifscCode: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "cardNumber") {
      value = value
        .replace(/\s/g, "")
        .replace(/(\d{4})/g, "$1 ")
        .trim();
    } else if (e.target.name === "expiryDate") {
      value = value.replace(/\D/g, "").replace(/(\d{2})(\d{2})/, "$1/$2");
    }
    setPaymentInfo({ ...paymentInfo, [e.target.name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      
      // Show success toast
      toast.success("Payment processed successfully!");

      setPaymentInfo({
        cardNumber: "",
        cardHolder: "",
        expiryDate: "",
        cvv: "",
        amount: "",
        upiId: "",
        accountHolder: "",
        ifscCode: "",
      });
    }, 2000);
  };

  const renderPaymentForm = () => {
    switch (selectedPayment) {
      case "mobile-banking":
        return (
          <div className="pp-form-group">
            <label className="pp-label">Amount</label>
            <input
              type="number"
              name="amount"
              value={paymentInfo.amount}
              onChange={handleChange}
              placeholder="Enter amount"
              min="0"
              step="0.01"
              required
              className="pp-input"
            />
          </div>
        );
      case "Cash on Delivery":
        return (
          <div className="pp-confirmation">
            <p>Thank you for ordering!</p>
            <p>You will need to provide cash on delivery once we reach you.</p>
          </div>
        );
      case "UPI":
        return (
          <>
            <div className="pp-form-group">
              <label htmlFor="accountHolder" className="pp-label">
                Account Holder Name
              </label>
              <input
                type="text"
                id="accountHolder"
                name="accountHolder"
                value={paymentInfo.accountHolder}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="pp-input"
              />
            </div>
            <div className="pp-form-group">
              <label htmlFor="upiId" className="pp-label">
                UPI ID
              </label>
              <input
                type="text"
                id="upiId"
                name="upiId"
                value={paymentInfo.upiId}
                onChange={handleChange}
                placeholder="example@upi"
                required
                className="pp-input"
              />
            </div>
            <div className="pp-form-group">
              <label htmlFor="ifscCode" className="pp-label">
                IFSC Code
              </label>
              <input
                type="text"
                id="ifscCode"
                name="ifscCode"
                value={paymentInfo.ifscCode}
                onChange={handleChange}
                placeholder="IFSC Code"
                required
                className="pp-input"
              />
            </div>
          </>
        );
      case "Visa / Master":
      default:
        return (
          <>
            <div className="pp-form-group">
              <label htmlFor="cardNumber" className="pp-label">
                Card Number
              </label>
              <div className="pp-input-wrapper">
                <CreditCard className="pp-input-icon" />
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={paymentInfo.cardNumber}
                  onChange={handleChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                  required
                  className="pp-input"
                />
              </div>
            </div>

            <div className="pp-form-group">
              <label htmlFor="cardHolder" className="pp-label">
                Card Holder Name
              </label>
              <input
                type="text"
                id="cardHolder"
                name="cardHolder"
                value={paymentInfo.cardHolder}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className="pp-input"
              />
            </div>

            <div className="pp-form-row">
              <div className="pp-form-group">
                <label htmlFor="expiryDate" className="pp-label">
                  Expiry Date
                </label>
                <div className="pp-input-wrapper">
                  <Calendar className="pp-input-icon" />
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={paymentInfo.expiryDate}
                    onChange={handleChange}
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                    className="pp-input"
                  />
                </div>
              </div>

              <div className="pp-form-group">
                <label htmlFor="cvv" className="pp-label">
                  CVV
                </label>
                <div className="pp-input-wrapper">
                  <Lock className="pp-input-icon" />
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={paymentInfo.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength="3"
                    required
                    className="pp-input"
                  />
                </div>
              </div>
            </div>
          </>
        );
    }
  };

  return (
    <div className="pp-payment-page">
      <h2 className="pp-title">Eco-Friendly Payment</h2>
      <form className="pp-payment-form" onSubmit={handleSubmit}>
        {renderPaymentForm()}
        {selectedPayment !== "Cash on Delivery" && (
          <button type="submit" className="pp-pay-btn" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Pay Now"}
          </button>
        )}
      </form>
      <ToastContainer />
    </div>
  );
};

export default PaymentPage;
