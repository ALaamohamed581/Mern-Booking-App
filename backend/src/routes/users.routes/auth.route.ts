import express from "express";
import validator from "../../middleware/validatins/valdidatior";
import Userschemas from "../../middleware/validatins/user.validation";
import {
  register,
  login,
  logOut,
} from "../../controllers/userControllers/usercontrollers/user.authController";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";
const app = express.Router();

app.post("/register", validator(Userschemas.registration), register);
app.post("/sign-in", validator(Userschemas.signIn) /* register*/, login);
app.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).send({ userId: req.userId });
});

app.post("/sign-out", logOut);

export default app;
