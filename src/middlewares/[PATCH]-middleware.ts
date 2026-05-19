import { Request, Response, NextFunction } from "express"

export function patchMiddleware(req: Request, res: Response, next: NextFunction) {
  const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
  console.log(`PATCH middleware executed for task ID: ${id}`)

  next()
}