import mongoose from "mongoose";
import { HotelType } from "../../types/HotelTypes";

const hotelSchma = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  adultCount: { type: Number, required: true },
  childCount: { type: Number, required: true },
  description: { type: String, required: true },
  facilities: [{ type: String, required: true }],
  Images: [{ type: String, required: true }],
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchma);
export default Hotel;
