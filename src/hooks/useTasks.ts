import { useState } from 'react'
import type { Task, TaskInput } from '../types'

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([])

  const add = (input: TaskInput) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: input.title.trim(),
      description: input.description?.trim() || '',
      priority: input.priority,
      dueDate: input.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    setTasks((prev) => [newTask, ...prev])
  }

  return { tasks, setTasks, add }
}
