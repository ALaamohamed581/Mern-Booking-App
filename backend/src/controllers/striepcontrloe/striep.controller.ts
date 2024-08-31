import { Request, Response, NextFunction } from "express";
import * as stripeRepo from "../../repostories/stripeRepo/stripeRepo";
import AppError from "../../helpers/AppError";
import { opertionAlObject } from "../../../types";
import { stripe } from "../../../config/stripe";
import { PaymentIntentResponse } from "../../shared/sharedTypes/paymentResponse";

export const paymentIntent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { hotelId } = req.params;
  const { numberOfNights } = req.body;
  const { userId } = req;
  if (!userId || !hotelId) {
    return next(new AppError("no user Id or hotel Id", 404));
  }
  const operationResultObjec =
    ((await stripeRepo.pay(hotelId, userId)) as opertionAlObject) || null;
  if (!operationResultObjec?.success) {
    return next(
      new AppError(operationResultObjec?.data[0]!, operationResultObjec?.code!)
    );
  }
  const totalCoast =
    operationResultObjec.data[0].pricePerNight * numberOfNights;
  console.log(totalCoast, "hotel");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: totalCoast * 100,
    currency: "usd",
    metadata: {
      hotelId,
      userId,
    },
  });
  if (!paymentIntent.client_secret) {
    return res.status(500).json({ mesage: "error creating payment intint" });
  }
  const response: PaymentIntentResponse = {
    paymentIntentId: paymentIntent.id,
    clientSecret: paymentIntent.client_secret.toString(),
    totalconst: totalCoast,
  };
  res.send(response);
  console.log(response, "here");
};
