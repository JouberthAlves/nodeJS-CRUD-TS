import { Request, Response } from "express"
import z, { array } from "zod"
import { Storage } from "../../database/storage.js"

class TaskController {
  async index(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const task = await Storage.getTaskById(id)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    res.json(task)
  }

  async getByName(req: Request, res: Response) {
    const name = Array.isArray(req.params.name)
      ? req.params.name[0]
      : req.params.name
    const task = await Storage.getTaskByName(name)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    res.json(task)
  }

  async getByDescription(req: Request, res: Response) {
    const description = Array.isArray(req.params.description)
      ? req.params.description[0]
      : req.params.description
    const task = await Storage.getTaskByDescription(description)

    if (!task) {
      return res.status(404).json({ error: "Task not found" })
    }
    res.json(task)
  }

  async create(req: Request, res: Response) {
    const bodyScheme = z.object({
      title: z.string().trim().min(3),
      description: z
        .string()
        .trim()
        .optional()
        .default("No description provided"),
    })

    const { title, description } = bodyScheme.parse(req.body)

    const task = {
      task_id: req.task_id || "",
      title,
      description,
      createdAt: new Date().toISOString(),
    }

    await Storage.addTask(task)

    res.status(201).json(task)
  }

  async update(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

    const updateBodyScheme = z.object({
      title: z.string().trim().min(3).optional(),
      description: z.string().trim().optional(),
    })

    const { title, description } = updateBodyScheme.parse(req.body)

    const updatedTask = await Storage.updateTask(id, {
      title,
      description,
      updatedAt: req.updated_at?.toISOString(),
    })

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.json(updatedTask)
  }

  async delete(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const deleted = await Storage.deleteTask(id)

    if (!deleted) {
      return res.status(404).json({ error: "Task not found" })
    }

    res.status(204)
  }

  async patch(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id

    const patchBodyScheme = z
      .object({
        title: z.string().trim().min(3),
        description: z.string().trim().min(5),
      })
      .partial()

    const partialData = patchBodyScheme.parse(req.body)

    const updatedTask = await Storage.updateTask(id, {
      ...partialData,
      updatedAt: new Date().toISOString(),
    })

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" })
    }

    return res.json(updatedTask)
  }

  async complete(req: Request, res: Response) {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id
    const updatedTask = await Storage.updateTask(id, {
      completedAt: req.completed_at?.toISOString(),
    })

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" })
    }

    return res.json(updatedTask)
  }
}

export { TaskController }
