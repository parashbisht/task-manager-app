export default function TaskCard({ task, onToggleComplete, onEdit, onDelete }) {
  return (
    <div className="group flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-4 transition hover:border-slate-300">
      <button
        onClick={() => onToggleComplete(task)}
        disabled={task.completed}
        title={task.completed ? 'Already completed' : 'Mark as complete'}
        className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition
          ${task.completed
            ? 'border-brand-600 bg-brand-600 text-white'
            : 'border-slate-300 hover:border-brand-500'}`}
      >
        {task.completed && (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
            <path
              fillRule="evenodd"
              d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0l-3.5-3.5a1 1 0 111.4-1.4l2.8 2.8 6.8-6.8a1 1 0 011.4 0z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <div className="min-w-0 flex-1">
        <p className={`text-sm font-medium ${task.completed ? 'text-ink-500 line-through' : 'text-ink-900'}`}>
          {task.title}
        </p>
        {task.description && (
          <p className="mt-0.5 truncate text-sm text-ink-500">{task.description}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-1 opacity-60 transition group-hover:opacity-100 sm:opacity-0 sm:group-hover:opacity-100">
        <button
          onClick={() => onEdit(task)}
          className="rounded-md p-1.5 text-ink-500 hover:bg-slate-100 hover:text-ink-900"
          title="Edit"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M13.586 3.586a2 2 0 112.828 2.828l-8.5 8.5a2 2 0 01-.878.507l-3 1a1 1 0 01-1.264-1.264l1-3a2 2 0 01.507-.878l8.5-8.5z" />
          </svg>
        </button>
        <button
          onClick={() => onDelete(task)}
          className="rounded-md p-1.5 text-ink-500 hover:bg-red-50 hover:text-red-600"
          title="Delete"
        >
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path
              fillRule="evenodd"
              d="M8 2a1 1 0 00-1 1v1H4a1 1 0 000 2h12a1 1 0 100-2h-3V3a1 1 0 00-1-1H8zM4 7a1 1 0 011 1v9a2 2 0 002 2h6a2 2 0 002-2V8a1 1 0 112 0v9a4 4 0 01-4 4H7a4 4 0 01-4-4V8a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  )
}
