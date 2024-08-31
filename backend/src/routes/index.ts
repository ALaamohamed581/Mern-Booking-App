import express, { Request, Response } from "express";
const app = express.Router();
import userROutes from "./users.routes/index";
import myHotelRoutes from "./myHotelRoutes.routes/index";
import stripeRoutes from "./stripeRoutes/index";
import bookingRoute from "./bookingRoute/index";
app.use("/api/v1/user", userROutes);
app.use("/api/v1/my-hotel-routes", myHotelRoutes);
app.use("/api/v1/payments", stripeRoutes);
app.use("/api/v1/booking", bookingRoute);

export default app;
