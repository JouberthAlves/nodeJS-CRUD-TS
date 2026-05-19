import { Request, Response, NextFunction } from "express";

export function putMiddleware(req: Request, res: Response, next: NextFunction) {
  req.updated_at = new Date()
  next()
}