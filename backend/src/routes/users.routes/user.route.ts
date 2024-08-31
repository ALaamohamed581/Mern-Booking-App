import validator from "../../middleware/validatins/valdidatior";
import Userschemas from "../../middleware/validatins/user.validation";
import express from "express";
import * as userProfileControllers from "../../controllers/userControllers/usercontrollers/user.profileControolers";

import { resizeUserPhoto, upload } from "../../middleware/multer/multer.single";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";
const app = express.Router();

app.put(
  "/image/:userId",
  upload.single("image"),
  validator(Userschemas.imageUpload),
  resizeUserPhoto,
  userProfileControllers.uploadImage
);
app.get("/me", userProfileControllers.getUser);

export default app;
