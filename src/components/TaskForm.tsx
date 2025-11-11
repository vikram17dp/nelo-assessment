import { useState } from 'react'
import type { Priority, TaskInput } from '../types'

interface Props {
  onAdd: (task: TaskInput) => void
}

const defaultForm: TaskInput = {
  title: '',
  description: '',
  priority: 'Low',
  dueDate: ''
}

export default function TaskForm({ onAdd }: Props) {
  const [form, setForm] = useState<TaskInput>(defaultForm)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Title is required')
      return
    }
    onAdd(form)
    setForm(defaultForm)
    setError(null)
  }

  return (
    <div className="bg-white shadow rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-3">Add Task</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Title <span className="text-red-500">*</span></label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Task title"
          />
          {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Priority</label>
          <select
            value={form.priority}
            onChange={(e) => setForm({ ...form, priority: e.target.value as Priority })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {(['Low','Medium','High'] as Priority[]).map(p => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Optional details"
          />
        </div>

        <div className="md:col-span-1">
          <label className="block text-sm font-medium mb-1">Due Date</label>
          <input
            type="date"
            value={form.dueDate}
            onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="md:col-span-1 flex items-end">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-4 py-2 font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full md:w-auto"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  )
}
