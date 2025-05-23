import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Minus, Plus, Trash2 } from "lucide-react";

const Cart = () => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      return parsedCart.map(item => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1,
      }));
    } catch (error) {
      console.error("Error parsing cart data from local storage:", error);
      return [];
    }
  });

  const updateLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (id, change) => {
    const updatedCart = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, Number(item.quantity) + change) }
        : item
    );
    updateLocalStorage(updatedCart);
  };

  const handleRemoveItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    updateLocalStorage(updatedCart);
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + Number(item.price) * Number(item.quantity),
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
                    <tr key={item.id}>
                      <td>
                        <div className="media">
                          <div className="media-body">
                            <p className="product-cart-title">{item.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="product-price">${Number(item.price).toFixed(2)}</td>
                      <td className="product-quantity">
                        <div className="quantity-controls d-flex align-items-center gap-2">
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleQuantityChange(item.id, -1)}
                            disabled={item.quantity <= 1}
                          >
                            <Minus size={16} />
                          </button>
                          <span className="quantity-value">{item.quantity}</span>
                          <button
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => handleQuantityChange(item.id, 1)}
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </td>
                      <td className="product-total">${(Number(item.price) * Number(item.quantity)).toFixed(2)}</td>
                      <td className="product-actions">
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleRemoveItem(item.id)}
                          title="Remove Item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="cart-subtotal-row">
                    <td></td>
                    <td></td>
                    <td><strong>Subtotal</strong></td>
                    <td className="subtotal-value"><strong>${subtotal.toFixed(2)}</strong></td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="checkout_btn_inner text-right">
              <Link to="/" className="btn btn-secondary me-2">
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
