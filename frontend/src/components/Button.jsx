export default function Button({ children, loading, variant = 'primary', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-60'
  const variants = {
    primary: 'bg-brand-600 text-white hover:bg-brand-700',
    ghost: 'border border-slate-200 text-ink-700 hover:bg-slate-50',
    danger: 'text-red-600 hover:bg-red-50',
  }

  return (
    <button className={`${base} ${variants[variant]} ${className}`} disabled={loading} {...props}>
      {loading && (
        <span className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {children}
    </button>
  )
}
