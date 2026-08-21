import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LifeBuoy } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { login, quickLogin, error, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const ok = login(email, password)
    if (ok) goToDashboard()
  }

  const goToDashboard = () => {
    // slight delay so `user` from context has settled before redirect
    setTimeout(() => {
      navigate(email.includes('admin') ? '/admin/dashboard' : '/dashboard')
    }, 0)
  }

  const handleQuickLogin = (role) => {
    quickLogin(role)
    navigate(role === 'admin' ? '/admin/dashboard' : '/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy-800 px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-500 shadow-card">
            <LifeBuoy size={22} className="text-white" />
          </div>
          <h1 className="font-display text-2xl font-bold text-white">HelpDesk Tracker</h1>
          <p className="mt-1 text-sm text-slate-400">Sign in to manage IT support tickets</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-xl2 bg-surface p-6 shadow-card">
          <label className="mb-1.5 block text-sm font-medium text-ink">Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="mb-4 w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500"
          />
          <label className="mb-1.5 block text-sm font-medium text-ink">Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="mb-2 w-full rounded-lg border border-line px-3.5 py-2.5 text-sm text-ink outline-none focus:border-brand-500"
          />
          {error && <p className="mb-2 text-sm font-medium text-rose-600">{error}</p>}
          <button
            type="submit"
            className="mt-3 w-full rounded-lg bg-brand-500 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            Sign in
          </button>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="text-xs font-medium text-ink-light">or preview instantly</span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickLogin('user')}
              className="rounded-lg border border-line py-2 text-xs font-semibold text-ink transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              View as User
            </button>
            <button
              type="button"
              onClick={() => handleQuickLogin('admin')}
              className="rounded-lg border border-line py-2 text-xs font-semibold text-ink transition-colors hover:border-brand-500 hover:text-brand-600"
            >
              View as Admin
            </button>
          </div>
        </form>
        <p className="mt-5 text-center text-xs text-slate-500">
          Demo credentials — user: ishara@company.com · admin: admin@company.com (password: "password")
        </p>
      </div>
    </div>
  )
}
