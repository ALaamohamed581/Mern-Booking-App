import { Request, Response, NextFunction } from "express";
import { HotelType, opertionAlObject } from "../../../../types";
import AppError from "../../../helpers/AppError";
import * as hotelRepo from "../../../repostories/hotelRepo/hotelRepo";
export const createHotel = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const newHotel: HotelType = req.body;

  newHotel.lastUpdated = new Date();
  newHotel.userId = req.userId;

  const operationResultObjec =
    ((await hotelRepo.create(req.body)) as opertionAlObject) || null;

  if (!operationResultObjec?.success) {
    return next(
      new AppError(operationResultObjec?.message!, operationResultObjec?.code!)
    );
  }

  return res.status(operationResultObjec.code).json({
    message: operationResultObjec.message,
    data: operationResultObjec.data[0],
  });
};
