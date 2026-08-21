import React, { createContext, useContext, useState } from 'react'
import { INITIAL_TICKETS, USERS } from '../data/mockData.js'

const TicketContext = createContext(null)

// This context is the seam where the MySQL-backed API plugs in later:
// - fetchTickets  -> GET /api/tickets  (or /api/tickets/mine)
// - createTicket  -> POST /api/tickets
// - updateStatus  -> PATCH /api/tickets/:id
export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState(INITIAL_TICKETS)

  const createTicket = (ticket) => {
    setTickets((prev) => [
      {
        id: `TCK-${String(prev.length + 1001)}`,
        status: 'Open',
        createdAt: new Date().toISOString().slice(0, 10),
        ...ticket,
      },
      ...prev,
    ])
  }

  const updateStatus = (id, status) => {
    setTickets((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)))
  }

  return (
    <TicketContext.Provider value={{ tickets, createTicket, updateStatus, users: USERS }}>
      {children}
    </TicketContext.Provider>
  )
}

export const useTickets = () => useContext(TicketContext)
