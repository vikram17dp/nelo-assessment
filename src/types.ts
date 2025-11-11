export type Priority = 'Low' | 'Medium' | 'High'
export type StatusFilter = 'all' | 'completed' | 'pending'

export interface Task {
  id: string
  title: string
  description: string
  priority: Priority
  dueDate: string // ISO date string (yyyy-mm-dd)
  completed: boolean
  createdAt: string // ISO
}

export interface TaskInput {
  title: string
  description?: string
  priority: Priority
  dueDate: string
}
