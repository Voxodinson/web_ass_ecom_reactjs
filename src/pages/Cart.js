import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Update cart in localStorage
  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Handle quantity updates
  const handleQuantityChange = (id, change) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    );

    updateLocalStorage(updatedCart);
  };

  // Remove item from cart
  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  // Calculate subtotal
  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <section className="cart_area">
      <div className="container">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center">
            <p>Your cart is empty.</p>
            <Link to="/" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="cart_inner">
            <div className="table-responsive">
              <table className="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="media">
                          <div className="d-flex">
                            <img
                              src={item.image}
                              alt={item.title}
                              style={{ width: "50px" }}
                            />
                          </div>
                          <div className="media-body">
                            <p>{item.title}</p>
                          </div>
                        </div>
                      </td>
                      <td>${item.price.toFixed(2)}</td>
                      <td>
                        <div className="d-flex align-items-center justify-content-center">
                          <button
                            className="btn btn-sm btn-light"
                            onClick={() => handleQuantityChange(item.id, -1)}
                          >
                            -
                          </button>
                          <span
                            className="mx-3"
                            style={{
                              minWidth: "30px",
                              textAlign: "center",
                            }}
                          >
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-sm btn-light"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${(item.price * item.quantity).toFixed(2)}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveItem(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td></td>
                    <td></td>
                    <td><strong>Subtotal</strong></td>
                    <td><strong>${subtotal.toFixed(2)}</strong></td>
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
                <button className="btn btn-primary">Proceed to Checkout</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
