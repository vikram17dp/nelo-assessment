import { useState } from 'react'
import type { Task } from '../types'
import EditTaskModal from './EditTaskModal'

interface Props {
  tasks: Task[]
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
  onUpdate: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void
}

export default function TaskList({ tasks, onToggleComplete, onDelete, onUpdate }: Props) {
  const [editing, setEditing] = useState<Task | null>(null)

  const confirmDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this task?')) {
      onDelete(id)
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-dashed p-8 text-center text-gray-500">
        No tasks match your filters.
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tasks.map((t) => (
        <div key={t.id} className={`rounded-lg border bg-white p-4 shadow-sm ${t.completed ? 'opacity-80' : ''}`}>
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <h3 className={`font-semibold ${t.completed ? 'line-through text-gray-500' : 'text-gray-900'}`}>{t.title}</h3>
              {t.description && (
                <p className={`mt-1 text-sm ${t.completed ? 'line-through text-gray-400' : 'text-gray-700'}`}>{t.description}</p>
              )}
            </div>
            <span className={`badge ${
              t.priority === 'High' ? 'badge-high' : t.priority === 'Medium' ? 'badge-medium' : 'badge-low'
            }`}>{t.priority}</span>
          </div>

          <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
            <div>
              {t.dueDate ? (
                <span>Due: {new Date(t.dueDate).toLocaleDateString()}</span>
              ) : (
                <span>No due date</span>
              )}
            </div>
            <div>
              <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${t.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                {t.completed ? 'Completed' : 'Pending'}
              </span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              onClick={() => onToggleComplete(t.id)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium border ${t.completed ? 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50' : 'bg-green-600 text-white border-green-600 hover:bg-green-700'}`}
            >
              {t.completed ? 'Mark Pending' : 'Mark Complete'}
            </button>
            <button
              onClick={() => setEditing(t)}
              className="rounded-md px-3 py-2 text-sm font-medium border bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            >
              Edit
            </button>
            <button
              onClick={() => confirmDelete(t.id)}
              className="rounded-md px-3 py-2 text-sm font-medium border bg-white text-red-600 border-red-300 hover:bg-red-50"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {editing && (
        <EditTaskModal
          task={editing}
          onClose={() => setEditing(null)}
          onSave={(updates) => {
            onUpdate(editing.id, updates)
            setEditing(null)
          }}
        />
      )}
    </div>
  )
}
