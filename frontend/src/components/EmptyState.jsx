export default function EmptyState({ message, actionLabel, onAction }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-white px-6 py-14 text-center">
      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-ink-500">
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
          <path
            fillRule="evenodd"
            d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm4 9a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1H8a1 1 0 110-2h1v-1a1 1 0 011-1z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <p className="text-sm text-ink-500">{message}</p>
      {actionLabel && (
        <button
          onClick={onAction}
          className="mt-3 text-sm font-medium text-brand-600 hover:text-brand-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  )
}
