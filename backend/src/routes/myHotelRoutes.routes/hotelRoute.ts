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
  searchHotel,
} from "../../controllers/userControllers/hotelcontrollers/myHotesl.controllers";
import validition from "../../middleware/validatins/valdidatior";
import hotelSchemas from "../../middleware/validatins/hotel.valdtions";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";
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
app.get("/get/:hotelId", verifyToken, getHotel);

app.get("/search", searchHotel);
