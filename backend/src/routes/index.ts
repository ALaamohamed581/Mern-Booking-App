import express, { Request, Response } from "express";
const app = express.Router();
import userROutes from "./users.routes/index";
import myHotelRoutes from "./myHotelRoutes.routes/index";
import path from "path";

app.use("/api/v1/user", userROutes);
app.use("/api/v1/my-hotel-routes", myHotelRoutes);
app.use("*", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, ".../../../frontend/forntend/dist/index.html")
  );
});
export default app;
