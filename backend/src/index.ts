import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import path from "path";
import dataBaseConnnedtion from "../config/database";
import userRoute from "./routes/index";
import errorHandler from "./middleware/errorrs/error";
import cookieParser from "cookie-parser";
const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// app.set("view engine", "ejs");
// app.set("views", "views");
// app.set("views", path.join(__dirname, "views"));
// //root route
// app.get("/api/test", async (req: Request, res: Response) => {
//   res.render("index");
// });
app.use(
  express.static(path.join(__dirname, "../../../frontend/frontend/dist"))
);
app.use(userRoute);
app.use(errorHandler);

dataBaseConnnedtion();
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`server working on ${port}`);
});
