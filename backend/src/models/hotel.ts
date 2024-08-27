import mongoose from "mongoose";
import { HotelType } from "../shared/sharedTypes/HotelTypes";
import { string } from "joi";

const hotelSchma = new mongoose.Schema<HotelType>({
  userId: { type: String, required: true },
  // _id: String,
  name: { type: String, required: true },
  city: { type: String, required: true },
  country: { type: String, required: true },
  adultCount: { type: Number, required: true, default: 0 },
  childCount: { type: Number, required: true },
  description: { type: String, required: true },
  facilities: [{ type: String, required: true }],
  Images: [{ type: String, required: true }],
  type: { type: String, required: true },
  pricePerNight: { type: Number, required: true },
  starRating: { type: Number, required: true, min: 1, max: 5 },
  lastUpdated: { type: Date, default: new Date() },
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchma);
export default Hotel;
