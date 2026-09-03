import Navbar from '../components/Navbar'

export default function DashboardLayout({ children, userEmail }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar userEmail={userEmail} />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  )
}
