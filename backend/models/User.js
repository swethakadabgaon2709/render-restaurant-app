import mongoose from "mongoose";
import validator from "validator";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [validator.isEmail, "Enter a valid email"],
  },
  password: {
    type: String,
    required: true,
    minLength: 4,
  },
  role: {
    type: String,
    enum: ["owner", "customer"],
    required: true,
  },
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
