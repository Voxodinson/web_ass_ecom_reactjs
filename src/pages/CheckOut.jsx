import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
const CheckoutForm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    try {
      const storedCart = localStorage.getItem("cart");
      const parsedCart = storedCart ? JSON.parse(storedCart) : [];
      setCartItems(parsedCart);
      calculateTotal(parsedCart);
    } catch (error) {
      console.error("Error loading cart items from localStorage:", error);
      setCartItems([]);
      setTotalAmount(0);
    }
  };

  const updateCart = (updatedCart) => {
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    calculateTotal(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    updateCart(updatedCart);
  };

  const handleQuantityChange = (id, change) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    updateCart(updatedCart);
  };

  const calculateTotal = (items) => {
    const total = items.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (item.quantity || 0),
      0
    );
    setTotalAmount(parseFloat(total.toFixed(2)));
  };

  const handlePaymentSuccess = (details) => {
    alert(`Transaction completed by ${details.payer.name.given_name}`);
    console.log("Transaction Details:", details);

    localStorage.removeItem("cart");
    setCartItems([]);
    setTotalAmount(0);
    navigate("/");
  };

  const initialPayPalOptions = {
    "client-id": "AR314w0tEAwZ28Y3kkUoRN5x-fJvy7NsuweBJ2yCLeEgEOzVxMTR9EneNbkRc4Yd49iUr0uAqfAWxrWr",
    currency: "USD",
  };

  return (
    <div>
      <div className="container">
      <h1>Checkout</h1>
        <div className="row mt-5">
          <div className="col-md-8">
            <h2>Your Order</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Size</th>
                  <th>Color</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.size}</td>
                    <td>{item.color}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => handleQuantityChange(item.id, -1)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                        <span className="mx-2">{item.quantity}</span>
                        <button
                          className="btn btn-sm btn-light"
                          onClick={() => handleQuantityChange(item.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td>${Number(item.price)?.toFixed(2) || "0.00"}</td>
                    <td>${(Number(item.price) || 0) * (item.quantity || 0)?.toFixed(2) || "0.00"}</td>
                    <td>
                      <button
                        className="btn btn-sm"
                        role="button"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="text-danger cursor-pointer"/>
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-right">
                    <strong>Total:</strong>
                  </td>
                  <td><strong>${totalAmount.toFixed(2)}</strong></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-4">
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