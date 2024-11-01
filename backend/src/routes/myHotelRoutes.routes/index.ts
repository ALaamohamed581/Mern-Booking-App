import express from "express";
const app = express.Router();
import hotelRoute from "./hotelRoute";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";

const allowedUsers = ["buyer"];
app.use(hotelRoute);

export default app;
