import React from "react";
const Category = ({ categories, setSelected }) => {
  return (
    <div>
      {categories.map((cat) => (
        <button key={cat.name} onClick={() => setSelected(cat)}>
          {cat.name}
        </button>
      ))}
    </div>
  );
};

export default Category;
