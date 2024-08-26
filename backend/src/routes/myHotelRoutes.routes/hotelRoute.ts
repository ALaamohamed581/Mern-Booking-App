import express from "express";

import {
  resizeImagesArray,
  uploadArray,
} from "../../middleware/multer/multer.array";
import {
  createHotel,
  listHotels,
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
app.get(
  "/list",

  listHotels
);
