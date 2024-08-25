import validator from "../../middleware/validatins/valdidatior";
import Userschemas from "../../middleware/validatins/user.validions";
import express from "express";
import * as userProfileControllers from "../../controllers/userControllers/usercontrollers/user.profileControolers";

import { resizeUserPhoto, upload } from "../../middleware/multer/multer.single";
const app = express.Router();

app.put(
  "/image/:userId",
  upload.single("image"),
  resizeUserPhoto,
  validator(Userschemas.imageUpload),
  userProfileControllers.uploadImage
);

export default app;
