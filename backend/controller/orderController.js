import { Order } from "../models/Order.js";

/* ---------------- CREATE ORDER (CUSTOMER) ---------------- */
export const createOrder = async (req, res) => {
  try {
    const { customerName, items } = req.body;

    if (
      !customerName ||
      !items ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid order data",
      });
    }

    let totalAmount = 0;

    items.forEach((item) => {
      if (
        !item.itemName ||
        typeof item.quantity !== "number" ||
        typeof item.price !== "number"
      ) {
        throw new Error("Invalid item structure");
      }

      totalAmount += item.price * item.quantity;
    });

    const newOrder = await Order.create({
      customerName,
      items,
      totalAmount,
    });

    return res.status(201).json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });

  } catch (error) {
    console.error("ORDER ERROR:", error.message);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/* ---------------- OWNER: GET ALL ORDERS ---------------- */
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
