import type { ReactNode } from 'react'
import TaskCard from './TaskCard.tsx'
import { GearIcon, PlusIcon } from './Icons.tsx'
import type { Task } from '../types.ts'

interface TaskListProps {
  tasks: Task[]
  error: string
  onOpenSettings: () => void
  onCreate: () => void
  onEdit: (id: string) => void
  onToggle: (task: Task) => void
  onDelete: (task: Task) => void
}

export default function TaskList({
  tasks,
  error,
  onOpenSettings,
  onCreate,
  onEdit,
  onToggle,
  onDelete,
}: TaskListProps) {
  let body: ReactNode

  if (tasks.length === 0) {
    body = (
      <p className="empty-state">
        {error ? 'No tasks to show.' : 'No tasks yet. Use + to add one.'}
      </p>
    )
  } else {
    body = (
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onEdit={() => onEdit(task.id)}
            onToggle={() => onToggle(task)}
            onDelete={() => onDelete(task)}
          />
        ))}
      </ul>
    )
  }

  return (
    <>
      <header className="app-header">
        <button className="icon-button" type="button" aria-label="Settings" onClick={onOpenSettings}>
          <GearIcon />
        </button>
        <h1>Task List</h1>
        <button className="icon-button add" type="button" aria-label="Create task" onClick={onCreate}>
          <PlusIcon />
        </button>
      </header>

      {error && <p className="banner" role="alert">{error}</p>}
      {body}
    </>
  )
}
