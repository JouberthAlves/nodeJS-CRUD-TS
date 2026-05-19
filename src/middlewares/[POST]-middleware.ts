import { randomUUID } from "node:crypto";
import { Request, Response, NextFunction } from "express";

export function postMiddleware(req: Request, res: Response, next: NextFunction) {
  req.task_id = randomUUID()
  next()
}