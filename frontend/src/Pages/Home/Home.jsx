import React, { useState } from "react";
import Menu from "../../components/Menu";

const Home = () => {
  const [cart, setCart] = useState([]);

  return (
    <div>
      <h1>Customer Home</h1>
      <Menu cart={cart} setCart={setCart} />
    </div>
  );
};

export default Home;
