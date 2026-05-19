import { Request, Response, NextFunction } from "express"

export function completeMiddleware(req: Request, res: Response, next: NextFunction) {
  req.completed_at = new Date()
  next()
}