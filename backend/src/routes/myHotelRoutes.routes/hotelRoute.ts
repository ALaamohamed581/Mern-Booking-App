import express, { Request, Response } from "express";

import {
  resizeImagesArray,
  uploadArray,
} from "../../middleware/multer/multer.array";
import {
  createHotel,
  getHotel,
  listHotels,
  updateHotel,
  searchHotel,
} from "../../controllers/hotelcontrollers/myHotesl.controllers";
import validition from "../../middleware/validatins/valdidatior";
import hotelSchemas from "../../middleware/validatins/hotel.validation";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";
import Hotel from "../../models/hotel";
const app = express.Router();

export default app;

app.post(
  "/create",

  uploadArray.array("Images", 6),
  validition(hotelSchemas.create),
  resizeImagesArray,
  createHotel
);
app.put(
  "/update/:hotelId",
  verifyToken,
  uploadArray.array("Images", 6),
  validition(hotelSchemas.update),
  resizeImagesArray,
  updateHotel
);
app.get("/list", /* verifyToken ,*/ listHotels);
app.get("/get/:hotelId", /*verifyToken,*/ getHotel);

app.get("/search", searchHotel);

app.get("/", async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find().sort("-lastUpdated");
    res.json(hotels);
  } catch (error) {
    res.status(500).json("error fetching hotel");
  }
});
