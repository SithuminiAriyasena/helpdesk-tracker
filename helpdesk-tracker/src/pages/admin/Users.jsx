import Layout from '../../components/Layout.jsx'
import { useTickets } from '../../context/TicketContext.jsx'

function initials(name = '') {
  return name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

export default function AdminUsers() {
  const { users, tickets } = useTickets()

  const ticketCount = (name) => tickets.filter((t) => t.requester === name).length

  return (
    <Layout title="Users" subtitle="Everyone with access to the helpdesk">
      <div className="overflow-hidden rounded-xl2 bg-surface shadow-card">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink-light">
              <th className="px-5 py-3.5">Name</th>
              <th className="px-5 py-3.5">Email</th>
              <th className="px-5 py-3.5">Role</th>
              <th className="px-5 py-3.5">Tickets Filed</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id} className="border-b border-line last:border-0 hover:bg-canvas/60">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-100 font-display text-xs font-bold text-brand-600">
                      {initials(u.name)}
                    </div>
                    <span className="font-medium text-ink">{u.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-ink-light">{u.email}</td>
                <td className="px-5 py-3.5">
                  <span
                    className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold capitalize ${
                      u.role === 'admin' ? 'bg-brand-50 text-brand-600' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {u.role}
                  </span>
                </td>
                <td className="px-5 py-3.5 font-mono text-ink-light">{ticketCount(u.name)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  )
}
