import { Request, Response, NextFunction } from "express";
import cactchAsync from "../../../utuls/catchAsync";
import AppError from "../../../helpers/AppError";
import {
  createUser,
  signIn,
  signOut,
} from "../../../repostories/userRepo/userAuthRepo";
import { opertionAlObject } from "../../../../types";

export const register = cactchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const operationResultObjec = (await createUser(
      req.body
    )) as opertionAlObject | null;

    if (!operationResultObjec?.success) {
      return next(
        new AppError(
          operationResultObjec?.message!,
          operationResultObjec?.code!
        )
      );
    }
    return res
      .cookie("authCookie", operationResultObjec.data[1], {
        httpOnly: true,
        secure: false /* TODO  */,
        maxAge: 8640000000,
      })

      .status(operationResultObjec.code)
      .json({
        message: operationResultObjec.message,
        data: operationResultObjec.data[0],
      });
  }
);

export const login = cactchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const operationResultObjec = (await signIn(
      email,
      password
    )) as opertionAlObject | null;

    if (!operationResultObjec?.success) {
      return next(
        new AppError(
          operationResultObjec?.message!,
          operationResultObjec?.code!
        )
      );
    }

    return res
      .cookie("authCookie", operationResultObjec.data[1], {
        httpOnly: true,
        secure: false /* TODO*/,
        maxAge: 8640000000,
      })
      .status(operationResultObjec.code)
      .json({
        message: operationResultObjec.message,
        data: operationResultObjec.data[0],
      });
  }
);

export const logOut = cactchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const operationResultObjec = (await signOut()) as opertionAlObject;
    if (!operationResultObjec?.success) {
      return next(
        new AppError(
          operationResultObjec?.message!,
          operationResultObjec?.code!
        )
      );
    }
    res.cookie("authCookie", operationResultObjec.data[1], {
      expires: new Date(0),
    });

    res.send();
  }
);
