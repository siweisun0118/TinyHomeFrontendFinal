import { useCallback, useEffect, useState, type ReactNode } from 'react'
import * as api from './api.ts'
import { errorMessage } from './api.ts'
import { fromDateInputValue, toDateInputValue } from './dates.ts'
import TaskList from './components/TaskList.tsx'
import SettingsView from './components/SettingsView.tsx'
import TaskForm from './components/TaskForm.tsx'
import type { Settings, Task } from './types.ts'

type View = 'list' | 'settings' | 'create' | 'edit'

const SETTINGS_KEY = 'tinyhome.settings'

const DEFAULT_SETTINGS: Settings = {
  filter: 'all',
  sortBy: 'due',
  direction: 'asc',
}

function loadSettings(): Settings {
  try {
    const raw = localStorage.getItem(SETTINGS_KEY)
    const stored = raw ? (JSON.parse(raw) as Partial<Settings>) : null
    return stored ? { ...DEFAULT_SETTINGS, ...stored } : { ...DEFAULT_SETTINGS }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

function saveSettings(settings: Settings) {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
  } catch {
    // Storage can be unavailable (private mode, quota). The settings still apply this session.
  }
}

export default function App() {
  const [view, setView] = useState<View>('list')
  const [tasks, setTasks] = useState<Task[]>([])
  const [settings, setSettings] = useState<Settings>(loadSettings)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [busy, setBusy] = useState(false)
  const [reloadKey, setReloadKey] = useState(0)

  // Increment reloadKey to trigger the useEffect below
  const reload = useCallback(() => {
    setReloadKey((key) => key + 1)
  }, [])

  // Will trigger the useEffect below since it depends on settings
  const handleSaveSettings = (next: Settings) => {
    saveSettings(next)
    setSettings(next)
    goTo('list')
  }

  // Reloads the task list when changes are made
  useEffect(() => {
    async function load() {
      try {
        const next = await api.getTasks(settings)
        setTasks(next)
        setError('')
      } catch (err) {
        setTasks([])
        setError(errorMessage(err))
      }
    }
    load()
  }, [settings, reloadKey])

  // Go to a specific screen
  const goTo = (next: View, id: string | null = null) => {
    setView(next)
    setEditingId(id)
    setFormError('')
    setError('')
  }

  const handleToggle = async (task: Task) => {
    try {
      await api.updateTask({ ...task, completed: !task.completed })
    } catch (err) {
      setError(errorMessage(err))
      return
    }
    reload()
  }

  const handleDelete = async (task: Task) => {
    if (!window.confirm(`Delete "${task.taskDescription}"?`)) return
    try {
      await api.deleteTask(task.id)
    } catch (err) {
      setError(errorMessage(err))
      return
    }
    reload()
  }

  const handleSaveTask = async (description: string, dueDate: string) => {
    setBusy(true)
    setFormError('')
    try {
      if (view === 'create') {
        await api.createTask(description, fromDateInputValue(dueDate))
      } else {
        const task = tasks.find((t) => t.id === editingId)
        if (!task) throw new Error('That task no longer exists.')
        await api.updateTask({
          ...task,
          taskDescription: description,
          dueDate: fromDateInputValue(dueDate),
        })
      }
    } catch (err) {
      setBusy(false)
      setFormError(errorMessage(err))
      return
    }
    setBusy(false)
    goTo('list')
    reload()
  }

  let screen: ReactNode

  if (view === 'settings') {
    screen = (
      <SettingsView
        settings={settings}
        onSave={handleSaveSettings}
        onBack={() => goTo('list')}
      />
    )
  } else if (view === 'create') {
    screen = (
      <TaskForm
        key="create"
        title="Create"
        busy={busy}
        error={formError}
        onSubmit={handleSaveTask}
        onBack={() => goTo('list')}
      />
    )
  } else if (view === 'edit') {
    const task = tasks.find((t) => t.id === editingId)
    screen = task ? (
      <TaskForm
        key={task.id}
        title="Edit"
        initialDescription={task.taskDescription}
        initialDueDate={toDateInputValue(task.dueDate)}
        busy={busy}
        error={formError}
        onSubmit={handleSaveTask}
        onBack={() => goTo('list')}
      />
    ) : null
  }

  if (!screen) {
    screen = (
      <TaskList
        tasks={tasks}
        error={error}
        onOpenSettings={() => goTo('settings')}
        onCreate={() => goTo('create')}
        onEdit={(id) => goTo('edit', id)}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    )
  }

  return (
    <main className="app-shell" aria-live="polite">
      {screen}
    </main>
  )
}
