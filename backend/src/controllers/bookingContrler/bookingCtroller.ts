import { Request, Response, NextFunction } from "express";
import AppError from "../../helpers/AppError";
import * as bookingRepo from "../../repostories/bookingRepo/bookingRepo";
import { stripe } from "../../../config/stripe";
import { opertionAlObject } from "../../../types";
export const creatBooking = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const paymentIntentId = req.body.paymentIntentId;
    const paymentIntent = await stripe.paymentIntents.retrieve(
      paymentIntentId as string
    );
    if (!paymentIntent) {
      return res.status(400).json({ message: "paymet intent not found" });
    }
    if (
      paymentIntent.metadata.hotelId != req.params.hotelId ||
      paymentIntent.metadata.userId != req.userId
    ) {
      return res.status(400).json({ message: "paymet intent missmatched" });
    }
    if (paymentIntent.status !== "succeeded") {
      return res.status(400).json({
        message: `payment intent not scuceded status ${paymentIntent.status}`,
      });
    }
    console.log(paymentIntent);
    req.body.totalCoast = paymentIntent.amount / 100;

    const operationResultObjec =
      ((await bookingRepo.create(
        req.body,
        req.userId,
        req.params.hotelId
      )) as opertionAlObject) || null;
    if (!operationResultObjec?.success) {
      return next(
        new AppError(
          operationResultObjec?.data[0]!,
          operationResultObjec?.code!
        )
      );
    }
    return res.status(operationResultObjec.code).json({
      message: operationResultObjec.message,
      data: operationResultObjec.data[0],
    });
  } catch (err: any) {
    console.log(err.message);
  }
};
