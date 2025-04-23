import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const Cart = () => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (error) {
      console.error("Error parsing cart data from local storage:", error);
      return [];
    }
  });

  useEffect(() => {
    console.log("Cart from localStorage:", localStorage.getItem("cart"));
  }, []);

  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, change) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );
    updateLocalStorage(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <section className="cart-page-container">
      <div className="container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <div className="empty-cart-message">
            <p>Your cart is empty.</p>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table cart-table">
                <thead>
                  <tr className="cart-table-header">
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="">
                      <td>
                        <div className="media">
                          <div className="product-image-container">
                            <img
                              src={item.image}
                              alt={item.title}
                            />
                          </div>
                          <div className="media-body">
                            <p className="product-cart-title">{item.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="product-price">${item.price?.toFixed(2) || "0.00"}</td>
                      <td className="product-quantity">
                        <div className="quantity-controls">
                          <button
                            className="quantity-button"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1} 
                          >
                            -
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button
                            className="quantity-button"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td className="product-total">${((item.price || 0) * (item.quantity || 0))?.toFixed(2) || "0.00"}</td>
                      <td className="product-actions">
                        <button
                          className="remove-cart-item"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="cart-subtotal-row">
                    <td></td>
                    <td></td>
                    <td><strong>Subtotal</strong></td>
                    <td className="subtotal-value"><strong>${subtotal?.toFixed(2) || "0.00"}</strong></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="checkout_btn_inner text-right">
              <Link to="/" className="btn btn-secondary">
                Continue Shopping
              </Link>
              <Link to="/checkout">
                <button className="btn btn-primary checkout-button" disabled={cart.length === 0}>
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;