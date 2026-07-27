import type { Settings, Task } from './types.ts'

// The API defaults to this address (see TinyHomeWebAPIFinal/Properties/launchSettings.json).
export const API_BASE = 'http://localhost:5190'

/** Every failure state in the API spec responds with this shape. */
interface ErrorResponse {
  message?: string
}

/** Narrows an unknown catch binding to a displayable message. */
export function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T | null> {
  let response: Response
  try {
    response = await fetch(API_BASE + path, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    })
  } catch {
    throw new Error(`Could not reach the API at ${API_BASE}. Is TinyHomeWebAPI running on port 5190?`)
  }

  if (!response.ok) {
    let message = `Request failed with status ${response.status}.`
    try {
      const body = (await response.json()) as ErrorResponse | null
      if (body?.message) message = body.message
    } catch {
      // Display error message, nothing else to do here
    }
    throw new Error(message)
  }

  if (response.status === 204 || response.headers.get('content-length') === '0') return null

  return (await response.json().catch(() => null)) as T | null
}

export function buildQuery({ filter, sortBy, direction }: Settings): string {
  const params = new URLSearchParams()
  if (filter === 'complete') params.set('completed', 'true')
  if (filter === 'incomplete') params.set('completed', 'false')
  // URLSearchParams encodes "+" as %2B, which the API reads as ascending.
  params.set('sort_by', (direction === 'desc' ? '-' : '+') + (sortBy === 'created' ? 'createdDate' : 'dueDate'))
  return `?${params}`
}

// GET /tasks
export async function getTasks(settings: Settings): Promise<Task[]> {
  return (await request<Task[]>('/tasks' + buildQuery(settings))) ?? []
}

// POST /tasks
export function createTask(taskDescription: string, dueDate: string): Promise<Task | null> {
  return request<Task>('/tasks', {
    method: 'POST',
    body: JSON.stringify({ taskDescription, dueDate, completed: false }),
  })
}

// PUT /tasks/{id}
export function updateTask(task: Task): Promise<Task | null> {
  return request<Task>(`/tasks/${task.id}`, {
    method: 'PUT',
    body: JSON.stringify({
      id: task.id,
      taskDescription: task.taskDescription,
      createdDate: task.createdDate,
      dueDate: task.dueDate,
      completed: task.completed,
    }),
  })
}

// DELETE /tasks/{id}
export function deleteTask(id: string): Promise<null> {
  return request<null>(`/tasks/${id}`, { method: 'DELETE' })
}
