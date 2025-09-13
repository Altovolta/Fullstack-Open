import { Request, Response, NextFunction } from "express";
import { newEntrySchema } from "../types";

export const newEntryParser = (req: Request, _res: Response, next: NextFunction) => {
  try {
    newEntrySchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

