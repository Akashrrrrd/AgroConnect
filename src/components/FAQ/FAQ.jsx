import React, { useState } from "react";
import "./FAQ.css";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is AgroConnect?",
      answer:
        "AgroConnect is a platform that connects consumers directly with farmers, allowing them to purchase fresh grocery products, including fruits and vegetables, without middlemen.",
    },
    {
      question: "How do I place an order on AgroConnect?",
      answer:
        "To place an order, browse our product categories, select the items you wish to purchase, add them to your cart, and proceed to checkout to finalize your order.",
    },
    {
      question: "How can I find nearby farms selling products?",
      answer:
        "After selecting your desired products, AgroConnect will display a map showing the nearest farms that sell those items, helping you buy directly from local farmers.",
    },
    {
      question: "Are the prices on AgroConnect fixed by the farmers?",
      answer:
        "Yes, farmers set their own prices for their products, ensuring fair compensation for their hard work and fresh produce.",
    },
    {
      question: "How can I be sure that the products are fresh?",
      answer:
        "All products available on AgroConnect are sourced directly from farmers, guaranteeing that you receive the freshest fruits and vegetables possible.",
    },
    {
      question: "What payment methods does AgroConnect accept?",
      answer:
        "AgroConnect accepts a variety of payment methods, including credit/debit cards, digital wallets, and cash on delivery, for your convenience.",
    },
    {
      question: "Can I track my order?",
      answer:
        "Yes, you can track your order status through your account on AgroConnect, allowing you to see updates on delivery or pickup times.",
    },
    {
      question: "Is there a loyalty program for regular customers?",
      answer:
        "Absolutely! AgroConnect offers a loyalty program that rewards frequent buyers with discounts and special offers on future purchases.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="faq-container">
      <h1 className="faq-container-header">Frequently Asked Questions</h1>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <button
              className={`faq-question ${openIndex === index ? "open" : ""}`}
              onClick={() => toggleFAQ(index)}
            >
              {faq.question}
              <span className="faq-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>
            {openIndex === index && (
              <div className="faq-answer">{faq.answer}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
