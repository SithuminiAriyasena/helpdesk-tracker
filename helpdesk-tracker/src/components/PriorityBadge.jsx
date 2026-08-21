const STYLES = {
  High: 'text-rose-600 bg-rose-50',
  Medium: 'text-amber-600 bg-amber-50',
  Low: 'text-slate-500 bg-slate-100',
}

export default function PriorityBadge({ priority }) {
  return (
    <span className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${STYLES[priority] || 'text-slate-500 bg-slate-100'}`}>
      {priority}
    </span>
  )
}
