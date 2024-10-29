//function that returns a fucntion with req,res next
//thanks to closure we are able to use the seconde function
//this function is the replacemnt function for try/catch block
import { NextFunction, Request, Response } from "express";

const cactchAsync = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((err: Error) => next(err));
  };
};
export default cactchAsync;
