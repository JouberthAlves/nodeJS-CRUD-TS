import fs from "fs/promises"
import path from "path"

interface Task {
  task_id: string
  title: string
  description: string
  createdAt: string
  updatedAt?: string
  completedAt?: string
}

interface ServerData {
  tasks?: Task[]
}

const DB_PATH = path.join(process.cwd(), "server.json")

export class Storage {
  static async read(): Promise<ServerData> {
    try {
      const data = await fs.readFile(DB_PATH, "utf-8")
      return JSON.parse(data)
    } catch {
      return {}
    }
  }

  static async write(data: ServerData): Promise<void> {
    await fs.writeFile(DB_PATH, JSON.stringify(data, null, 2), "utf-8")
  }

  static async addTask(task: Task): Promise<Task> {
    const data = await this.read()
    data.tasks = data.tasks || []
    data.tasks.push(task)
    await this.write(data)
    return task
  }

  static async getTasks(): Promise<Task[]> {
    const data = await this.read()
    return data.tasks || []
  }

  static async getTaskById(id: string): Promise<Task | null> {
    const tasks = await this.getTasks()
    return tasks.find((task) => task.task_id === id) || null
  }

  static async getTaskByName(name: string): Promise<Task | null> {
    const tasks = await this.getTasks()
    return tasks.find((task) => task.title === name) || null
  }

  static async getTaskByDescription(description: string): Promise<Task | null> {
    const tasks = await this.getTasks()
    return tasks.find((task) => task.description === description) || null
  }

  static async updateTask(
    id: string,
    updatedTask: Partial<Task>,
  ): Promise<Task | null> {
    const data = await this.read()
    if (!data.tasks) return null

    const taskIndex = data.tasks.findIndex((task) => task.task_id === id)
    if (taskIndex === -1) return null

    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updatedTask }
    await this.write(data)
    return data.tasks[taskIndex]
  }

  static async deleteTask(id: string): Promise<boolean> {
    const data = await this.read()
    if (!data.tasks) return false

    const originalLength = data.tasks.length

    data.tasks = data.tasks.filter((task) => task.task_id !== id)

    if (data.tasks.length === originalLength) return false

    await this.write(data)
    return true
  }

  static async patchTask(
    id: string,
    updatedFields: Partial<Task>,
  ): Promise<Task | null> {
    const data = await this.read()
    if (!data.tasks) return null

    const taskIndex = data.tasks.findIndex((task) => task.task_id === id)

    if (taskIndex === -1) return null

    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...updatedFields }
    await this.write(data)
    return data.tasks[taskIndex]
  }
}
