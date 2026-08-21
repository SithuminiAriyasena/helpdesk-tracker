import { useAuth } from '../context/AuthContext.jsx'

function initials(name = '') {
  return name
    .split(' ')
    .map((p) => p[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

export default function Topbar({ title, subtitle }) {
  const { user } = useAuth()

  return (
    <header className="flex items-center justify-between border-b border-line bg-surface px-6 py-4 md:px-8">
      <div>
        <h1 className="font-display text-xl font-bold text-ink">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-ink-light">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div className="text-right leading-tight">
          <p className="text-sm font-semibold text-ink">{user?.name}</p>
          <p className="text-xs capitalize text-ink-light">{user?.role}</p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 font-display text-sm font-bold text-brand-600">
          {initials(user?.name)}
        </div>
      </div>
    </header>
  )
}
