import { Request, Response, NextFunction } from "express";

import AppError from "../../../helpers/AppError";

import { CustomFile, opertionAlObject } from "../../../../types";

import * as profileRepo from "../../../repostories/userRepo/userProfile.repo";
export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    const image = req.file as Express.Multer.File;
    const { userId } = req.params;
    const operationResultObjec = (await profileRepo.uploadImage(
      image,
      userId
    )) as opertionAlObject | null;

    if (!operationResultObjec?.success) {
      return next(
        new AppError(
          operationResultObjec?.message!,
          operationResultObjec?.code!
        )
      );
    }

    return res.status(operationResultObjec.code).json({
      message: operationResultObjec.message,
      data: operationResultObjec.data[0],
    });
  }
};
