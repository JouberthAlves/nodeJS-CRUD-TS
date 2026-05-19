import { Request, Response } from "express";
import z from "zod";
import { Storage } from "../../database/storage.js";

class TaskController {
  async index(req: Request, res: Response) {
    const { id } = req.params;
    const task = await Storage.getTaskById(id);
    
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
  }

  async create(req: Request, res: Response) {
    const bodyScheme = z.object({
      title: z.string().trim().min(3),
      description: z
        .string()
        .trim()
        .optional()
        .default("No description provided"),
    });

    const { title, description } = bodyScheme.parse(req.body);

    const task = {
      task_id: req.task_id,
      title,
      description,
      createdAt: req.created_at,
    };

    await Storage.addTask(task);

    res.status(201).json(task);
  }
}

export { TaskController };