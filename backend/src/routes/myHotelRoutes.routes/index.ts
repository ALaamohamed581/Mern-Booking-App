import express from "express";
const app = express.Router();
import hotelRoute from "./hotelRoute";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";
import validition from "../../middleware/validatins/valdidatior";
import hotelSchemas from "../../middleware/validatins/hotel.valdtions";

const allowedUsers = ["buyer"];
app.use(verifyToken, hotelRoute);

export default app;
