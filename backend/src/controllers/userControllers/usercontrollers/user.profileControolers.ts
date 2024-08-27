import { Request, Response, NextFunction } from "express";

import AppError from "../../../helpers/AppError";

import { CustomFile, opertionAlObject } from "../../../../types";

import * as profileRepo from "../../../repostories/userRepo/userProfile.repo";
import { perfromQuery } from "../../../helpers/queryReponse";
export const uploadImage = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.file) {
    const { image } = req.body;
    const { userId } = req.params;
    const operationResultObjec = (await profileRepo.uploadImage(
      image,
      userId
    )) as opertionAlObject;

    perfromQuery(operationResultObjec, next, res);
  }
};
