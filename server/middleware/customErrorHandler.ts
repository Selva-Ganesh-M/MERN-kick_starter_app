import { Request, Response, NextFunction } from "express";
import { NODE_ENV } from "../utils/config";
import { customError } from "../utils/customError";

export const customErrorHandler = (
  err: customError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(err.status || 500).json({
    message: err.message,
    stack: NODE_ENV === "production" ? null : err.stack,
  });
};
