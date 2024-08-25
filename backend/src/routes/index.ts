import express from "express";
const app = express.Router();
import userROutes from "./users.routes/index";
import myHotelRoutes from "./myHotelRoutes.routes/index";

app.use("/api/v1/user", userROutes);
app.use("/api/v1/my-hotel-routes", myHotelRoutes);

export default app;
