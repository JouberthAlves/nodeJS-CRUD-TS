import { Request, Response } from "express"
import z from "zod"

class TaskController {
  index(req: Request, res: Response) {
    const { id } = req.params
    res.send(`Task ID: ${id}`)
  }

  create(req: Request, res: Response) {
    const bodyScheme = z.object({
      title: z.string().trim().min(3),
      description: z
        .string()
        .trim()
        .optional()
        .default("No description provided"),
    })

    const { title, description } = bodyScheme.parse(req.body)
    res
      .status(201)
      .json({
        taskId: req.task_id,
        title,
        description,
        createdAt: req.created_at,
      })
  }
}

export { TaskController }
