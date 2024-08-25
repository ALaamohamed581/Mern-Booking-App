import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../helpers/AppError";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}
export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies["authCookie"];

  if (!token) {
    return res.status(401).json({ message: "unathorized" });
  }
  try {
    const decoaded = jwt.verify(token, process.env.JWT_SERCERT as string);
    req.userId = (decoaded as JwtPayload).userId;
    next();
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "bad requet" });
  }
};
