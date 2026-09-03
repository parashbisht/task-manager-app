export default function TextField({ label, type = 'text', value, onChange, error, ...props }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink-700">{label}</span>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`w-full rounded-lg border px-3 py-2 text-sm text-ink-900 outline-none transition
          placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500/30
          ${error ? 'border-red-400 focus:border-red-500' : 'border-slate-300 focus:border-brand-500'}`}
        {...props}
      />
      {error && <span className="mt-1 block text-xs text-red-600">{error}</span>}
    </label>
  )
}
