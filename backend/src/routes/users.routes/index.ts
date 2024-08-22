import express from "express";
const app = express.Router();
import AuthRoutes from "./auth.route";

app.use(AuthRoutes);

export default app;
