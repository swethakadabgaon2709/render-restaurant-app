import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  itemName: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

export const Menu = mongoose.model("Menu", menuSchema);
