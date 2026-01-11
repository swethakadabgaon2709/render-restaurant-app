import React from "react";
import axios from "axios";

const PlaceOrder = ({ cart, user }) => {

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = Math.round(subtotal * 0.05); // 5% tax
  const total = subtotal + tax;

  const confirmOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    try {
      const orderData = {
        customerName: user.name,
        items: cart.map(item => ({
          itemName: item.title,
          quantity: item.quantity,
          price: item.price,
        })),
      };

      const res = await axios.post(
        "http://localhost:4000/api/v1/order/create",
        orderData
      );

      alert(
        `ORDER CONFIRMED ✅\n\nOrder ID: ${res.data.order._id}\nTotal: ₹${res.data.order.totalAmount}`
      );

      window.location.reload();
    } catch (err) {
      alert("Order failed");
      console.error(err);
    }
  };

  return (
    <div className="invoice-box">
      <h2 className="invoice-title">🍽️ Restaurant Bill</h2>

      <div className="invoice-meta">
        <p><b>Customer:</b> {user.name}</p>
        <p><b>Date:</b> {new Date().toLocaleDateString()}</p>
      </div>

      <hr className="dashed" />

      <table className="invoice-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Amount</th>
          </tr>
        </thead>

        <tbody>
          {cart.map(item => (
            <tr key={item.id}>
              <td>{item.title}</td>
              <td>{item.quantity}</td>
              <td>₹{item.price * item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <hr className="dashed" />

      <div className="invoice-total">
        <p>Subtotal: <span>₹{subtotal}</span></p>
        <p>Tax (5%): <span>₹{tax}</span></p>
        <h3>Total: <span>₹{total}</span></h3>
      </div>

      <button className="confirm-btn" onClick={confirmOrder}>
        Confirm & Print Bill
      </button>
    </div>
  );
};

export default PlaceOrder;
