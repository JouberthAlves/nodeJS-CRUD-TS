import { Router } from "express"
import { Request, Response } from "express"

import { TaskController } from "../controllers/tasksControllers/TasksController.js"
import { postMiddleware } from "../middlewares/[POST]-middleware.js"
import { putMiddleware } from "../middlewares/[PUT]-middleware.js"
import { deleteMiddleware } from "../middlewares/[DELETE]-middleware.js"

const taskController = new TaskController()
const taskRoutes = Router()

taskRoutes.get("/:id", async (req: Request, res: Response) => {
  await taskController.index(req, res)
})

taskRoutes.get("/search/:name", async (req: Request, res: Response) => {
  await taskController.getByName(req, res)
})

taskRoutes.get(
  "/searchDesc/:description",
  async (req: Request, res: Response) => {
    await taskController.getByDescription(req, res)
  },
)

taskRoutes.post(
  "/tasks",
  postMiddleware,
  async (req: Request, res: Response) => {
    await taskController.create(req, res)
  },
)

taskRoutes.put(
  "/update/:id",
  putMiddleware,
  async (req: Request, res: Response) => {
    await taskController.update(req, res)
  },
)

taskRoutes.delete(
  "/delete/:id",
  deleteMiddleware,
  async (req: Request, res: Response) => {
    await taskController.delete(req, res)
  },
)

export { taskRoutes }
