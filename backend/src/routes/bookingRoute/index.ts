import express, { Request, Response } from "express";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";
import { creatBooking } from "../../controllers/bookingContrler/bookingCtroller";
import validition from "../../middleware/validatins/valdidatior";
import bookingSchema from "../../middleware/validatins/booking.validation";
import Hotel from "../../models/hotel";
import { HotelType } from "../../shared/sharedTypes/HotelTypes";
const app = express.Router();
app.post(
  "/:hotelId/book",
  verifyToken,
  validition(bookingSchema.create),
  creatBooking
);
app.get("/book", verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({
      "bookings.userId": req.userId,
    });

    const reslauts = hotels.map((hotel) => {
      const userBookings = hotel.bookings.filter(
        (b) => b.userId === req.userId
      );
      const hotelWithUserBookings: HotelType = {
        ...hotel.toObject(),
        bookings: userBookings,
      };
      return hotelWithUserBookings;
    });
    res.status(200).send(reslauts);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});
export default app;
