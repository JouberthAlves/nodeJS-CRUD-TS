declare namespace Express {
  export interface Request {
    task_id?: string,
    created_at?: Date,
    updated_at?: Date
    completed_at?: Date
  }
}