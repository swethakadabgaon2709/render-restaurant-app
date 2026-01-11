import React, { useEffect, useState } from "react";
import axios from "axios";

const OwnerDashboard = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await axios.get(
        "http://localhost:4000/api/v1/order/all"
      );
      setOrders(res.data.orders);
    } catch (err) {
      console.error(err);
    }
  };

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.totalAmount,
    0
  );

  return (
    <div className="owner-box">
      <h2>👑 Owner Dashboard</h2>

      <p><b>Total Orders:</b> {orders.length}</p>
      <p><b>Total Revenue:</b> ₹{totalRevenue}</p>

      <hr />

      <h3>📜 Orders</h3>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><b>Customer:</b> {order.customerName}</p>
          <p><b>Total:</b> ₹{order.totalAmount}</p>
          <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default OwnerDashboard;
