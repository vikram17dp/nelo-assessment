import { useMemo } from 'react'
import type { Priority, StatusFilter } from '../types'

interface Props {
  search: string
  onSearch: (v: string) => void
  status: StatusFilter
  onStatusChange: (s: StatusFilter) => void
  priority: 'all' | Priority
  onPriorityChange: (p: 'all' | Priority) => void
  total: number
  showing: number
  onClearFilters: () => void
}

export default function FilterBar(props: Props) {
  const { search, onSearch, status, onStatusChange, priority, onPriorityChange, total, showing, onClearFilters } = props

  const statusOptions: { key: StatusFilter; label: string }[] = useMemo(() => ([
    { key: 'all', label: 'All' },
    { key: 'pending', label: 'Pending' },
    { key: 'completed', label: 'Completed' },
  ]), [])

  return (
    <div className="bg-white shadow rounded-lg p-4 space-y-3">
      <div className="flex flex-col md:flex-row gap-3 md:items-center">
        <div className="flex-1">
          <input
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search by title..."
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center gap-2">
          {statusOptions.map(s => (
            <button
              key={s.key}
              onClick={() => onStatusChange(s.key)}
              className={`px-3 py-2 rounded-md text-sm border ${status === s.key ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'}`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <div>
          <select
            value={priority}
            onChange={(e) => onPriorityChange(e.target.value as any)}
            className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Priorities</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div>
          <button onClick={onClearFilters} className="px-3 py-2 rounded-md text-sm border bg-white text-gray-700 border-gray-300 hover:bg-gray-50">Clear</button>
        </div>
      </div>
      <div className="text-sm text-gray-600">Showing {showing} of {total} task(s)</div>
    </div>
  )
}
