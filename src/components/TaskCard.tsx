import { formatCreatedDate, formatDueDate } from '../dates.ts'
import type { Task } from '../types.ts'
import { BoxIcon, PencilIcon, TrashIcon } from './Icons.tsx'

interface TaskCardProps {
  task: Task
  onEdit: () => void
  onToggle: () => void
  onDelete: () => void
}

export default function TaskCard({ task, onEdit, onToggle, onDelete }: TaskCardProps) {
  const description = task.taskDescription

  return (
    <li className={`card ${task.completed ? 'is-complete' : ''}`}>
      <button className="card-action" type="button" aria-label={`Edit ${description}`} onClick={onEdit}>
        <PencilIcon />
      </button>

      <div className="card-text">
        <p className="card-title">{description}</p>
        <p className="card-meta">Due: {formatDueDate(task.dueDate)}</p>
        <p className="card-meta">Created: {formatCreatedDate(task.createdDate)}</p>
      </div>

      <button
        className="card-action checkbox"
        type="button"
        role="checkbox"
        aria-checked={task.completed}
        aria-label={`Mark ${description} ${task.completed ? 'incomplete' : 'complete'}`}
        onClick={onToggle}
      >
        <BoxIcon checked={task.completed} />
      </button>

      <button
        className="card-action trash"
        type="button"
        aria-label={`Delete ${description}`}
        onClick={onDelete}
      >
        <TrashIcon />
      </button>
    </li>
  )
}
