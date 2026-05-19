import { Request, Response, NextFunction } from "express"

export function getMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("GET middleware executed")
  next()
}
