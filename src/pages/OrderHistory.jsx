import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log(user)
    if (user) {
      try {
        const parsedUser = JSON.parse(user);
        setUserId(parsedUser.id);

        axios.get(`http://127.0.0.1:8000/api/public/orders/user/${parsedUser.id}`)
          .then(res => {
            setOrders(res.data.data);
          })
          .catch(err => {
            console.error("Failed to fetch orders", err);
          });
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
      }
    }
  }, []);

  return (
    <div className="container py-5">
      <h2 className="mb-4">Order History</h2>
      {orders.length === 0 ? (
        <div className="alert alert-info">No orders found.</div>
      ) : (
        orders.map((order) => (
          <div key={order.id} className="card mb-4">
            <div className="card-header d-flex justify-content-between">
              <span><strong>Order ID:</strong> {order.id}</span>
              <span><strong>Total:</strong> ${order.total_amount}</span>
            </div>
            <div className="card-body">
              <p><strong>Date:</strong> {new Date(order.created_at).toLocaleString()}</p>
              <p><strong>Payment Method:</strong> {order.payment_method}</p>
              <p><strong>Status:</strong> {order.payment_status}</p>
              <p><strong>Shipping:</strong> {order.shipping_address}, {order.shipping_city}, {order.shipping_zip}, {order.shipping_country}</p>
              <h5 className="mt-4">Items</h5>
              <div className="table-responsive">
                <table className="table table-bordered table-hover mt-2">
                  <thead className="table-light">
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Color</th>
                      <th>Size</th>
                      <th>Qty</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.order_items.map(item => (
                      <tr key={item.id}>
                        <td style={{ width: "80px" }}>
                          <img
                            src={item.image}
                            alt={item.product_name}
                            className="img-fluid"
                          />
                        </td>
                        <td>{item.product_name}</td>
                        <td>{item.color || "-"}</td>
                        <td>{item.size || "-"}</td>
                        <td>{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default OrderHistory;
