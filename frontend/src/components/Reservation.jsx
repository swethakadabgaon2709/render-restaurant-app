import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Reservation = () => {
  const [customerName, setCustomerName] = useState("");

  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!customerName || cart.length === 0) {
      toast.error("Please enter name and select items");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:4000/api/v1/order/create",
        {
          customerName,
          items: cart.map(item => ({
            itemName: item.title,
            quantity: item.quantity,
            price: item.price,
          })),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (data.success) {
        toast.success("Order placed successfully!");
        localStorage.removeItem("cart");
        setCustomerName("");
      }
    } catch (error) {
      toast.error("Order failed");
      console.error(error);
    }
  };

  return (
    <section className="reservation">
      <div className="container">
        <div className="reservation_form_box">
          <h1>PLACE ORDER</h1>

          <form onSubmit={handleOrder}>
            <input
              type="text"
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />

            <h3>Selected Items</h3>

            {cart.length === 0 ? (
              <p>No items selected</p>
            ) : (
              <ul>
                {cart.map((item, index) => (
                  <li key={index}>
                    {item.title} × {item.quantity} = ₹
                    {item.price * item.quantity}
                  </li>
                ))}
              </ul>
            )}

            <h3>Total Bill: ₹ {totalAmount}</h3>

            <button type="submit">CONFIRM ORDER</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
