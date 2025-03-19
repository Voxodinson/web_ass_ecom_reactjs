import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

const CheckoutForm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [isPayPalReady, setIsPayPalReady] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Load cart items from localStorage
    try {
      const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartItems(storedCart);

      // Calculate total amount
      const total = storedCart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotalAmount(parseFloat(total.toFixed(2)));
    } catch (error) {
      console.error("Error loading cart items from localStorage:", error);
    }
  }, []);

  const handlePaymentSuccess = (details) => {
    alert(`Transaction completed by ${details.payer.name.given_name}`);
    console.log("Transaction Details:", details);

    // Clear the cart after successful payment
    localStorage.removeItem("cart");
    setCartItems([]);
    setTotalAmount(0);
    navigate("/"); // Redirect to homepage
  };

  const initialPayPalOptions = {
    "client-id": "AR314w0tEAwZ28Y3kkUoRN5x-fJvy7NsuweBJ2yCLeEgEOzVxMTR9EneNbkRc4Yd49iUr0uAqfAWxrWr", // Use your actual client ID here
    currency: "USD",
  };

  return (
    <div>
      <h1>Checkout</h1>
      <div className="container">
        <div className="row">
          {/* Order Summary */}
          <div className="col-md-6">
            <h2>Your Order</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Total</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      {item.title} <strong>x</strong> {item.quantity}
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td><strong>Order Total</strong></td>
                  <td><strong>${totalAmount}</strong></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* PayPal Payment */}
          <div className="col-md-6">
            <h2>Pay with PayPal</h2>
            <PayPalScriptProvider options={initialPayPalOptions}>
              <div className="paypal-container">
                {totalAmount <= 0 ? (
                  <p>Please add items to the cart to proceed with the payment.</p>
                ) : (
                  <PayPalButtons
                    style={{ layout: "vertical" }}
                    createOrder={(data, actions) => {
                      return actions.order.create({
                        purchase_units: [
                          {
                            amount: {
                              value: totalAmount.toFixed(2),
                            },
                          },
                        ],
                      });
                    }}
                    onApprove={(data, actions) => {
                      return actions.order.capture().then((details) => {
                        handlePaymentSuccess(details);
                      });
                    }}
                    onError={(err) => {
                      console.error("PayPal Checkout Error:", err);
                      alert("An error occurred while processing your payment.");
                    }}
                  />
                )}
              </div>
            </PayPalScriptProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
