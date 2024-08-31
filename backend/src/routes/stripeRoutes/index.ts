import express from "express";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";
import { paymentIntent } from "../../controllers/striepcontrloe/striep.controller";
const app = express.Router();

app.post("/:hotelId/bookings/paymnetIntent", verifyToken, paymentIntent);

export default app;
