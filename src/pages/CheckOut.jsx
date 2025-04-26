import React, { useState, useEffect } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const CheckoutForm = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    zip: "",
    country: "",
  });
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

  const handleInputChange = (e) => {
    setShippingInfo({ ...shippingInfo, [e.target.name]: e.target.value });
  };
const handlePaymentSuccess = async (details) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (!user || !token) {
    alert("User not logged in.");
    return;
  }

  const { name, address, city, zip, country } = shippingInfo;

  if (!name || !address || !city || !zip || !country) {
    alert("Please fill in all shipping details.");
    return;
  }

  const orderPayload = {
    user_id: user.id,
    payment_method: "Credit Card",
    payment_status: "paid",
    transaction_id: details.id,
    total_amount: totalAmount,
    shipping_name: name,
    shipping_address: address,
    shipping_city: city,
    shipping_zip: zip,
    shipping_country: country,
    items: cartItems.map((item) => ({
      product_id: item.id,
      quantity: item.quantity,
      color: item.color,
      size: item.size,
    })),
  };

  try {
    const response = await fetch("http://127.0.0.1:8000/public/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error:", errorData);
      throw new Error("Failed to place order.");
    }

    alert(`Transaction completed by ${details.payer.name.given_name}`);
    localStorage.removeItem("cart");
    setCartItems([]);
    setTotalAmount(0);
    navigate("/");
  } catch (error) {
    console.error("Error placing PayPal order:", error);
    alert("There was an error completing your order.");
  }
};

  const handlePayOnDelivery = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    if (!user || !token) {
      alert("User not logged in.");
      return;
    }

    const { name, address, city, zip, country } = shippingInfo;

    if (!name || !address || !city || !zip || !country) {
      alert("Please fill in all shipping details.");
      return;
    }

    const orderPayload = {
      user_id: user.id,
      payment_method: "Pay on Delivery",
      payment_status: "pending",
      transaction_id: null,
      total_amount: totalAmount,
      shipping_name: name,
      shipping_address: address,
      shipping_city: city,
      shipping_zip: zip,
      shipping_country: country,
      items: cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      })),
    };

    try {
      const response = await fetch("http://127.0.0.1:8000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderPayload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API error:", errorData);
        throw new Error("Failed to place order.");
      }

      alert("Order placed successfully with Pay on Delivery.");
      localStorage.removeItem("cart");
      setCartItems([]);
      setTotalAmount(0);
      navigate("/");
    } catch (error) {
      console.error("Error during Pay on Delivery:", error);
      alert("There was an error placing your order.");
    }
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
                    <td>
                      $
                      {(Number(item.price) * (item.quantity || 0))
                        ?.toFixed(2) || "0.00"}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm"
                        role="button"
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <Trash2 className="text-danger cursor-pointer" />
                      </button>
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="4" className="text-right">
                    <strong>Total:</strong>
                  </td>
                  <td>
                    <strong>${totalAmount.toFixed(2)}</strong>
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="col-md-4">
            <h2>Shipping Info</h2>
            <input
              type="text"
              className="form-control mb-2"
              name="name"
              placeholder="Full Name"
              value={shippingInfo.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              name="address"
              placeholder="Address"
              value={shippingInfo.address}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              name="city"
              placeholder="City"
              value={shippingInfo.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              name="zip"
              placeholder="ZIP Code"
              value={shippingInfo.zip}
              onChange={handleInputChange}
            />
            <input
              type="text"
              className="form-control mb-2"
              name="country"
              placeholder="Country"
              value={shippingInfo.country}
              onChange={handleInputChange}
            />

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

            {/* Pay on Delivery Button */}
            <button
              className="btn btn-primary mt-3 w-100"
              onClick={handlePayOnDelivery}
              disabled={cartItems.length === 0}
            >
              Pay on Delivery
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
