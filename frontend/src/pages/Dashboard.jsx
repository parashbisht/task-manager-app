import { useEffect, useMemo, useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import StatCard from '../components/StatCard'
import TaskCard from '../components/TaskCard'
import EmptyState from '../components/EmptyState'
import Button from '../components/Button'
import TaskFormModal from '../components/TaskFormModal'
import { getTasks, completeTask, deleteTask, createTask, updateTask } from '../services/taskService'
import { getCurrentUser } from '../services/authService'

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState(null)

  async function loadTasks() {
    setLoading(true)
    setError('')
    try {
      const data = await getTasks()
      setTasks(data)
    } catch {
      setError('Could not load your tasks. Please refresh the page.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadTasks()
    getCurrentUser().then(setUser).catch(() => {})
  }, [])

  async function handleToggleComplete(task) {
    // Optimistic update so the UI feels instant.
    setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, completed: true } : t)))
    try {
      await completeTask(task.id)
    } catch {
      loadTasks() // revert to real state on failure
    }
  }

  async function handleDelete(task) {
    const prevTasks = tasks
    setTasks((prev) => prev.filter((t) => t.id !== task.id))
    try {
      await deleteTask(task.id)
    } catch {
      setTasks(prevTasks)
    }
  }

  const filteredTasks = useMemo(() => {
    if (!search.trim()) return tasks
    const q = search.toLowerCase()
    return tasks.filter(
      (t) => t.title.toLowerCase().includes(q) || t.description?.toLowerCase().includes(q)
    )
  }, [tasks, search])

  const stats = useMemo(() => {
    const total = tasks.length
    const completed = tasks.filter((t) => t.completed).length
    return { total, completed, pending: total - completed }
  }, [tasks])

  function openCreateModal() {
    setEditingTask(null)
    setModalOpen(true)
  }

  function openEditModal(task) {
    setEditingTask(task)
    setModalOpen(true)
  }

  async function handleSaveTask(form) {
    if (editingTask) {
      const updated = await updateTask(editingTask.id, form)
      setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t)))
    } else {
      const created = await createTask({ title: form.title, description: form.description })
      setTasks((prev) => [created, ...prev])
    }
  }

  return (
    <DashboardLayout userEmail={user?.email}>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-semibold text-ink-900">Your tasks</h1>
          <p className="text-sm text-ink-500">Everything you need to get done, in one place.</p>
        </div>
        <Button onClick={openCreateModal}>+ New task</Button>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatCard label="Total" value={stats.total} />
        <StatCard label="Pending" value={stats.pending} accent="text-brand-600" />
        <StatCard label="Completed" value={stats.completed} accent="text-emerald-600" />
      </div>

      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tasks..."
          className="w-full max-w-xs rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/30"
        />
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
      )}

      {loading ? (
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-slate-100" />
          ))}
        </div>
      ) : filteredTasks.length === 0 ? (
        <EmptyState
          message={tasks.length === 0 ? 'No tasks yet. Create your first task.' : 'No tasks match your search.'}
          actionLabel={tasks.length === 0 ? 'New task' : undefined}
          onAction={openCreateModal}
        />
      ) : (
        <div className="space-y-2">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggleComplete={handleToggleComplete}
              onEdit={openEditModal}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}

      {modalOpen && (
  <TaskFormModal
    key={editingTask ? `edit-${editingTask.id}` : 'create'}
    onClose={() => setModalOpen(false)}
    onSubmit={handleSaveTask}
    initialTask={editingTask}
  />
)}
    </DashboardLayout>
  )
}
