import { useState } from 'react'
import { BackIcon } from './Icons.tsx'
import type { Settings } from '../types.ts'

interface RadioRowProps<T extends string> {
  group: string
  value: T
  label: string
  current: T
  onChange: (value: T) => void
}

function RadioRow<T extends string>({ group, value, label, current, onChange }: RadioRowProps<T>) {
  return (
    <label className="radio-row">
      <input
        type="radio"
        name={group}
        value={value}
        checked={current === value}
        onChange={() => onChange(value)}
      />
      <span>{label}</span>
    </label>
  )
}

interface SettingsViewProps {
  settings: Settings
  onSave: (settings: Settings) => void
  onBack: () => void
}

export default function SettingsView({ settings, onSave, onBack }: SettingsViewProps) {
  const [draft, setDraft] = useState<Settings>(settings)

  // Keyed by Settings field, so each setter only accepts that field's union.
  const update =
    <K extends keyof Settings>(key: K) =>
      (value: Settings[K]) =>
        setDraft((prev) => ({ ...prev, [key]: value }))

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSave(draft)
  }

  return (
    <>
      <header className="app-header">
        <button className="icon-button" type="button" aria-label="Back to task list" onClick={onBack}>
          <BackIcon />
        </button>
        <h1>Settings</h1>
      </header>

      <form onSubmit={handleSubmit}>
        <fieldset className="field-group">
          <legend>Filters</legend>
          <RadioRow group="filter" value="all" label="All" current={draft.filter} onChange={update('filter')} />
          <RadioRow group="filter" value="complete" label="Complete" current={draft.filter} onChange={update('filter')} />
          <RadioRow group="filter" value="incomplete" label="Incomplete" current={draft.filter} onChange={update('filter')} />
        </fieldset>

        <fieldset className="field-group">
          <legend>Sort By</legend>
          <RadioRow group="sortBy" value="due" label="Due" current={draft.sortBy} onChange={update('sortBy')} />
          <RadioRow group="sortBy" value="created" label="Created" current={draft.sortBy} onChange={update('sortBy')} />
        </fieldset>

        <fieldset className="field-group">
          <legend>Sort Date Direction</legend>
          <RadioRow group="direction" value="asc" label="Ascending" current={draft.direction} onChange={update('direction')} />
          <RadioRow group="direction" value="desc" label="Descending" current={draft.direction} onChange={update('direction')} />
        </fieldset>

        <button className="save-button" type="submit">Save</button>
      </form>
    </>
  )
}
