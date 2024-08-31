import express from "express";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";
import { creatBooking } from "../../controllers/bookingContrler/bookingCtroller";
import validition from "../../middleware/validatins/valdidatior";
import bookingSchema from "../../middleware/validatins/booking.validation";
const app = express.Router();
app.post(
  "/:hotelId/book",
  verifyToken,
  validition(bookingSchema.create),
  creatBooking
);
export default app;
