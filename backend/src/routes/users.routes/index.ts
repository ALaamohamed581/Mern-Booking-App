import express from "express";
const app = express.Router();
import AuthRoutes from "./auth.route";
import UserRoutes from "./user.route";
import { verifyToken } from "../../middleware/verifyToken/token.validate.ts";

app.use(AuthRoutes);

app.use(UserRoutes, verifyToken);
export default app;
