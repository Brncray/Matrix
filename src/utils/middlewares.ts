import { Request, Response, NextFunction } from "express";

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) =>
  req.user ? next() : res.sendStatus(403).send({ message: "Unauthorized" });
