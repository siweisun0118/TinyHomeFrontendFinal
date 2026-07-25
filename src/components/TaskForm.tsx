import { useState } from 'react';
import DatePicker from 'react-datepicker';
import { BackIcon, CalendarIcon } from './Icons.tsx';
import { DATE_DISPLAY_FORMAT, fromPickerDate, toPickerDate } from '../dates.ts';

interface TaskFormProps {
  title: string
  initialDescription?: string
  initialDueDate?: string
  busy: boolean
  error: string
  onSubmit: (description: string, dueDate: string) => void
  onBack: () => void
}

export default function TaskForm({
  title,
  initialDescription = '',
  initialDueDate = '',
  busy,
  error,
  onSubmit,
  onBack,
}: TaskFormProps) {
  const [description, setDescription] = useState(initialDescription)
  const [dueDate, setDueDate] = useState<Date | null>(() => toPickerDate(initialDueDate))
  const [validationError, setValidationError] = useState('')

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (busy) return

    const trimmed = description.trim()
    if (!trimmed) {
      setValidationError('Please enter a to-do item description.')
      return
    }
    if (!dueDate) {
      setValidationError('Please select a due date.')
      return
    }

    setValidationError('')
    onSubmit(trimmed, fromPickerDate(dueDate))
  }

  const message = validationError || error

  return (
    <>
      <header className="app-header">
        <button className="icon-button" type="button" aria-label="Back to task list" onClick={onBack}>
          <BackIcon />
        </button>
        <h1>{title}</h1>
      </header>

      <form onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label className="field-label" htmlFor="task-name">To-Do Item Name</label>
          <input
            className="text-input"
            id="task-name"
            type="text"
            autoComplete="off"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>

        <div className="form-field date-field">
          <label className="field-label" htmlFor="task-due">Select Due Date</label>
          <DatePicker
            id="task-due"
            className="date-input"
            selected={dueDate}
            onChange={setDueDate}
            dateFormat={DATE_DISPLAY_FORMAT}
            placeholderText="Select a date"
            formatWeekDay={(day: string) => day.slice(0, 2)}
            minDate={new Date()} // Only allow future dates
            showPopperArrow={false}
            showIcon
            toggleCalendarOnIconClick
            icon={<CalendarIcon />}
          />
        </div>

        {message && <p className="field-error" role="alert">{message}</p>}

        <button className="save-button" type="submit" disabled={busy}>Save</button>
      </form>
    </>
  )
}
