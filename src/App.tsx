import { useEffect, useMemo, useState } from 'react'
import type { Task, TaskInput, Priority, StatusFilter } from './types'
import TaskForm from './components/TaskForm'
import FilterBar from './components/FilterBar'
import TaskList from './components/TaskList'

const LS_KEY = 'task_manager_tasks_v1'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')
  const [priorityFilter, setPriorityFilter] = useState<'all' | Priority>('all')

  // Load from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY)
      if (raw) setTasks(JSON.parse(raw))
    } catch {}
  }, [])

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (input: TaskInput) => {
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

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...updates } : t)))
  }

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id))
  }

  const toggleComplete = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)))
  }

  const filtered = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase())
      const matchesStatus =
        statusFilter === 'all' || (statusFilter === 'completed' ? t.completed : !t.completed)
      const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter
      return matchesSearch && matchesStatus && matchesPriority
    })
  }, [tasks, search, statusFilter, priorityFilter])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b">
        <div className="max-w-5xl mx-auto w-full px-4 py-4">
          <h1 className="text-2xl font-bold">Task Manager</h1>
        </div>
      </header>

      <main className="flex-1">
        <div className="max-w-5xl mx-auto w-full px-4 py-6 space-y-6">
          <TaskForm onAdd={addTask} />
          <FilterBar
            search={search}
            onSearch={setSearch}
            status={statusFilter}
            onStatusChange={setStatusFilter}
            priority={priorityFilter}
            onPriorityChange={setPriorityFilter}
            total={tasks.length}
            showing={filtered.length}
            onClearFilters={() => {
              setSearch('')
              setStatusFilter('all')
              setPriorityFilter('all')
            }}
          />

          <TaskList
            tasks={filtered}
            onToggleComplete={toggleComplete}
            onDelete={deleteTask}
            onUpdate={updateTask}
          />
        </div>
      </main>

      <footer className="border-t bg-white">
        <div className="max-w-5xl mx-auto w-full px-4 py-3 text-sm text-gray-500 flex justify-between">
          <span>Total: {tasks.length}</span>
          <span>Completed: {tasks.filter((t) => t.completed).length}</span>
        </div>
      </footer>
    </div>
  )
}

export default App
