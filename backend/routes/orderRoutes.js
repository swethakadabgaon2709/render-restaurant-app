import express from "express";
import { createOrder, getAllOrders } from "../controller/orderController.js";

const router = express.Router();

/* CUSTOMER */
router.post("/create", createOrder);

/* OWNER */
router.get("/all", getAllOrders);

export default router;
