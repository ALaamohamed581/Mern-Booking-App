import express from "express";
import validator from "../../middleware/validatins/valdidatior";
import Userschemas from "../../middleware/validatins/user.validions";
import {
  register,
  login,
} from "../../controllers/userControllers/user.authController";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";
const app = express.Router();

app.post("/register", validator(Userschemas.registration), register);
app.post("/sign-in", validator(Userschemas.signIn) /* register*/, login);
app.get("/validate-token", verifyToken, (req, res) => {
  res.status(200).send({ userId: req.userId });
});
app.post("/sign-out", (req, res) => {
  res.cookie("authCookie", "", { expires: new Date(0) });
  res.send();
});
export default app;
