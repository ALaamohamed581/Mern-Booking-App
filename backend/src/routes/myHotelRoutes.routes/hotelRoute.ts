import express from "express";

import {
  resizeImagesArray,
  uploadArray,
} from "../../middleware/multer/multer.array";
import {
  createHotel,
  getHotel,
  listHotels,
  updateHotel,
} from "../../controllers/userControllers/hotelcontrollers/myHotesl.controllers";
import validition from "../../middleware/validatins/valdidatior";
import hotelSchemas from "../../middleware/validatins/hotel.valdtions";
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
  uploadArray.array("Images", 6),
  validition(hotelSchemas.update),
  resizeImagesArray,
  updateHotel
);
app.get("/list", listHotels);
app.get("/get/:hotelId", getHotel);
