import StatusBadge from './StatusBadge.jsx'
import PriorityBadge from './PriorityBadge.jsx'

export default function TicketTable({ tickets, showRequester = false, onStatusChange }) {
  if (!tickets.length) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl2 bg-surface py-16 text-center shadow-card">
        <p className="font-display text-base font-semibold text-ink">No tickets to show</p>
        <p className="mt-1 text-sm text-ink-light">New tickets will show up here as they come in.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl2 bg-surface shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs font-semibold uppercase tracking-wide text-ink-light">
              <th className="px-5 py-3.5">Ticket</th>
              <th className="px-5 py-3.5">Subject</th>
              {showRequester && <th className="px-5 py-3.5">Requester</th>}
              <th className="px-5 py-3.5">Category</th>
              <th className="px-5 py-3.5">Priority</th>
              <th className="px-5 py-3.5">Status</th>
              <th className="px-5 py-3.5">Created</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((t) => (
              <tr key={t.id} className="border-b border-line last:border-0 hover:bg-canvas/60">
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-semibold text-brand-600">
                  {t.id}
                </td>
                <td className="max-w-xs px-5 py-3.5 font-medium text-ink">{t.subject}</td>
                {showRequester && <td className="px-5 py-3.5 text-ink-light">{t.requester}</td>}
                <td className="px-5 py-3.5 text-ink-light">{t.category}</td>
                <td className="px-5 py-3.5">
                  <PriorityBadge priority={t.priority} />
                </td>
                <td className="px-5 py-3.5">
                  {onStatusChange ? (
                    <select
                      value={t.status}
                      onChange={(e) => onStatusChange(t.id, e.target.value)}
                      className="rounded-md border border-line bg-canvas px-2 py-1 text-xs font-semibold text-ink focus:border-brand-500"
                    >
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </select>
                  ) : (
                    <StatusBadge status={t.status} />
                  )}
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-ink-light">{t.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
