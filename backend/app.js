import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import reservationRouter from "./routes/reservationRoute.js";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";

/* -------------------- ENV CONFIG -------------------- */
dotenv.config({ path: "./config/config.env" });

const app = express();

/* -------------------- MIDDLEWARES -------------------- */
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

/* -------------------- ROUTES -------------------- */
const API = "/api/v1";

app.use(`${API}/reservation`, reservationRouter);
app.use(`${API}/auth`, authRoutes);
app.use(`${API}/menu`, menuRoutes);
app.use(`${API}/order`, orderRoutes);

/* -------------------- HEALTH CHECK -------------------- */
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Restaurant Backend API is Running",
  });
});

/* -------------------- DATABASE -------------------- */
dbConnection();

/* -------------------- ERROR HANDLER -------------------- */
app.use(errorMiddleware);

export default app;
