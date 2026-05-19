import { Request, Response, NextFunction } from "express"

export function deleteMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log("DELETE middleware executed")
  next()
}