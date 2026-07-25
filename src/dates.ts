const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

// Due dates are stored at UTC midnight, so read them back in UTC to keep the
// calendar day stable regardless of the viewer's timezone.
export function formatDueDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

// Created dates are real timestamps, so they render in the viewer's local time.
export function formatCreatedDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
}

/** ISO timestamp -> the YYYY-MM-DD value an <input type="date"> expects. */
export function toDateInputValue(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  return d.toISOString().slice(0, 10)
}

/** YYYY-MM-DD from the date input -> UTC-midnight ISO timestamp for the API. */
export function fromDateInputValue(value: string): string {
  return `${value}T00:00:00Z`
}

/**
 * Display date in the desired format (e.g. January 16, 2000)
 */
export const DATE_DISPLAY_FORMAT = 'MMMM d, yyyy'

/**
 * YYYY-MM-DD -> a Date at *local* midnight, which is what the picker expects.
 */
export function toPickerDate(value: string): Date | null {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (!match) return null
  return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
}

/** The picker's local Date -> the YYYY-MM-DD the form carries. */
export function fromPickerDate(date: Date | null): string {
  if (!date || Number.isNaN(date.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}
