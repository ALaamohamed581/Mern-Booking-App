import { NextFunction, Response } from "express";
import { opertionAlObject } from "../../types";
import AppError from "./AppError";

export const perfromQuery = (
  responseObj: opertionAlObject,
  next: NextFunction,
  res: Response
) => {
  if (!responseObj?.success) {
    return next(new AppError(responseObj?.data[0]!, responseObj?.code!));
  }
  return res.status(responseObj.code).json(responseObj.data[0]);
};
