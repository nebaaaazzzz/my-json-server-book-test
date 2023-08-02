import { Request, Response, NextFunction } from "express";
type RequestHandler = (req: Request, res: Response, next: NextFunction) => void;
export const asyncErrorHandler =
  (fn: RequestHandler) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
