import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export default function Navbar({ userEmail }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-sm font-bold text-white">
            T
          </div>
          <span className="text-sm font-semibold text-ink-900">Task Manager</span>
        </div>

        <div className="flex items-center gap-4">
          {userEmail && (
            <span className="hidden text-sm text-ink-500 sm:inline">{userEmail}</span>
          )}
          <button
            onClick={handleLogout}
            className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-ink-700 transition hover:border-slate-300 hover:bg-slate-50"
          >
            Log out
          </button>
        </div>
      </div>
    </header>
  )
}
