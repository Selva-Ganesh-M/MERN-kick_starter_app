import { Request, Response, NextFunction } from "express";
import { NODE_ENV } from "../utils/config";
import { customError } from "../utils/customError";

export const customErrorHandler = (
  err: customError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const sCode = res.statusCode !== 200 ? err.status || res.statusCode : 500;
  const msg = err.error
    ? {
        message: err.message,
        details: err.error,
        stack: NODE_ENV === "production" ? null : err.stack,
      }
    : {
        message: err.message,
        stack: NODE_ENV === "production" ? null : err.stack,
      };
  res.status(sCode).json(msg);
};
