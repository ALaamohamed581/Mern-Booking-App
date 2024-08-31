import { NextFunction, Request, Response } from "express";

const validition = (schema: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    delete req.body.hotelId;
    console.log(req.body);

    try {
      const validationResult = schema.validate(req.body);
      const validationErrors: string[] = [];

      if (validationResult.error) {
        validationErrors.push(validationResult.error.details[0].message);
        console.log(validationResult.error.details[0].message);
      }

      if (validationErrors.length) {
        return res.status(400).json({
          success: false,
          error: validationErrors.join(", "),
          code: 400,
        });
      }

      return next();
    } catch (err: any) {
      console.log(`Error: ${err.message}`);
      return res.status(400).json({
        success: false,
        error: "Bad Request",
        code: 400,
      });
    }
  };
};

export default validition;
