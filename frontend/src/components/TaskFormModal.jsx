import { useState } from 'react'
import Modal from './Modal'
import TextField from './TextField'
import TextArea from './TextArea'
import Button from './Button'

export default function TaskFormModal({ onClose, onSubmit, initialTask }) {
  const isEditing = Boolean(initialTask)

  const [form, setForm] = useState(() =>
    initialTask
      ? {
          title: initialTask.title,
          description: initialTask.description || '',
          completed: initialTask.completed,
        }
      : { title: '', description: '', completed: false }
  )
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('Title is required.')
      return
    }
    setError('')
    setLoading(true)
    try {
      await onSubmit(form)
      onClose()
    } catch {
      setError('Could not save the task. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Modal open onClose={onClose} title={isEditing ? 'Edit task' : 'New task'}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Title"
          value={form.title}
          onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
          placeholder="e.g. Write project report"
          autoFocus
        />
        <TextArea
          label="Description (optional)"
          value={form.description}
          onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
          placeholder="Add more detail..."
        />

        {isEditing && (
          <label className="flex items-center gap-2 text-sm text-ink-700">
            <input
              type="checkbox"
              checked={form.completed}
              onChange={(e) => setForm((f) => ({ ...f, completed: e.target.checked }))}
              className="h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            Mark as completed
          </label>
        )}

        {error && (
          <div className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</div>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <Button type="button" variant="ghost" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" loading={loading}>
            {isEditing ? 'Save changes' : 'Create task'}
          </Button>
        </div>
      </form>
    </Modal>
  )
}