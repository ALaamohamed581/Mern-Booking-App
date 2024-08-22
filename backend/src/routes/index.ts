import express from "express";
const app = express.Router();
import userROutes from "./users.routes/index";

app.use("/api/v1/user", userROutes);

export default app;
