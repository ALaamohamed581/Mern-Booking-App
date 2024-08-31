import { Request, Response, NextFunction } from "express";

import { opertionAlObject } from "../../../../types";

import * as profileRepo from "../../../repostories/userRepo/userProfile.repo";
import { perfromQuery } from "../../../helpers/queryReponse";
import { filterObj } from "../../../helpers/filterobj";
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

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.userId);
  const operationResultObjec = (await profileRepo.get(
    req.userId
  )) as opertionAlObject;
  perfromQuery(operationResultObjec, next, res);
};
