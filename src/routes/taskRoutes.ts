import { Router } from "express"
import { Request, Response } from "express"

import { TaskController } from "../controllers/tasksControllers/TasksController.js"
import { postMiddleware } from "../middlewares/[POST]-middleware.js"

const taskController = new TaskController()
const taskRoutes = Router()

taskRoutes.get("/:id", async (req: Request, res: Response) => {
  await taskController.index(req, res);
});

taskRoutes.post("/tasks", postMiddleware, async (req: Request, res: Response) => {
  await taskController.create(req, res);
});

export { taskRoutes }