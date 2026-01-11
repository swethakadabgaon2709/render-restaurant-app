import React, { useState } from "react";
import menuData from "../restApi.json";

const Menu = ({ cart, setCart }) => {
  const dishes = menuData.dishes;

  const categories = ["all", ...new Set(dishes.map(item => item.category))];
  const [selectedCategory, setSelectedCategory] = useState("all");

  const addItem = (item) => {
    const exists = cart.find(i => i.id === item.id);

    if (exists) {
      setCart(
        cart.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeItem = (item) => {
    const exists = cart.find(i => i.id === item.id);
    if (!exists) return;

    if (exists.quantity === 1) {
      setCart(cart.filter(i => i.id !== item.id));
    } else {
      setCart(
        cart.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity - 1 }
            : i
        )
      );
    }
  };

  const filteredDishes =
    selectedCategory === "all"
      ? dishes
      : dishes.filter(d => d.category === selectedCategory);

  return (
    <div>
      {/* CATEGORY BUTTONS */}
      <div className="categories">
        {categories.map(cat => (
          <button
            key={cat}
            className={selectedCategory === cat ? "active" : ""}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* MENU GRID */}
      <div className="menu-grid">
        {filteredDishes.map(item => {
          const cartItem = cart.find(i => i.id === item.id);

          return (
            <div className="card" key={item.id}>
              <img src={item.image} alt={item.title} />
              <h4>{item.title}</h4>
              <p>₹{item.price}</p>

              {!cartItem ? (
                <button onClick={() => addItem(item)}>Add</button>
              ) : (
                <div className="qty-controls">
                  <button onClick={() => removeItem(item)}>-</button>
                  <span>{cartItem.quantity}</span>
                  <button onClick={() => addItem(item)}>+</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Menu;
