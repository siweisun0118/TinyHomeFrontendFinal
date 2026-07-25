/** A to-do item as returned by TinyHomeWebAPI. Dates are ISO 8601 strings. */
export interface Task {
  id: string
  completed: boolean
  createdDate: string
  dueDate: string
  taskDescription: string
}

export type Filter = 'all' | 'complete' | 'incomplete'
export type SortBy = 'due' | 'created'
export type Direction = 'asc' | 'desc'

export interface Settings {
  filter: Filter
  sortBy: SortBy
  direction: Direction
}
