import express from "express";
import { getMenu } from "../controller/menuController.js";

const router = express.Router();

router.get("/list", getMenu);

export default router;
