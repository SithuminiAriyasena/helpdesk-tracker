import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Ticket,
  PlusCircle,
  UserCircle,
  LogOut,
  Users,
  ListChecks,
  LifeBuoy,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'

const USER_NAV = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/my-tickets', label: 'My Tickets', icon: Ticket },
  { to: '/create-ticket', label: 'Create Ticket', icon: PlusCircle },
  { to: '/profile', label: 'Profile', icon: UserCircle },
]

const ADMIN_NAV = [
  { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/admin/tickets', label: 'All Tickets', icon: ListChecks },
  { to: '/admin/users', label: 'Users', icon: Users },
  { to: '/admin/profile', label: 'Profile', icon: UserCircle },
]

export default function Sidebar() {
  const { user, logout } = useAuth()
  const nav = user?.role === 'admin' ? ADMIN_NAV : USER_NAV

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-navy-800 text-slate-300 md:flex">
      <div className="flex items-center gap-2.5 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500">
          <LifeBuoy size={18} className="text-white" />
        </div>
        <div>
          <p className="font-display text-[15px] font-bold leading-tight text-white">HelpDesk</p>
          <p className="text-[11px] font-medium uppercase tracking-wider text-slate-500">Tracker</p>
        </div>
      </div>

      <nav className="mt-2 flex-1 space-y-1 px-3">
        {nav.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-brand-500 text-white shadow-card'
                  : 'text-slate-400 hover:bg-navy-700 hover:text-white'
              }`
            }
          >
            <Icon size={17} strokeWidth={2} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-navy-700 px-3 py-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-400 transition-colors hover:bg-navy-700 hover:text-white"
        >
          <LogOut size={17} strokeWidth={2} />
          Logout
        </button>
      </div>
    </aside>
  )
}
