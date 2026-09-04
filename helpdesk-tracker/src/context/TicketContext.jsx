import React, { createContext, useContext, useState, useEffect } from 'react'
import { USERS } from '../data/mockData.js'

const TicketContext = createContext(null)

const API_URL = 'http://localhost:5000/api/tickets'

// Mapper to transform MySQL ticket format to frontend format
const mapTicketToFrontend = (t) => ({
  id: `TCK-${t.id}`,
  subject: t.title,
  requester: t.requestedBy,
  category: t.category,
  priority: t.priority,
  status: t.status,
  createdAt: t.date,
  dbId: t.id // Keep the numeric ID for API calls
})

export function TicketProvider({ children }) {
  const [tickets, setTickets] = useState([])
  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem('helpdesk_users')
    return saved ? JSON.parse(saved) : USERS
  })
  const [trashUsers, setTrashUsers] = useState(() => {
    const saved = localStorage.getItem('helpdesk_trash_users')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('helpdesk_users', JSON.stringify(users))
  }, [users])

  useEffect(() => {
    localStorage.setItem('helpdesk_trash_users', JSON.stringify(trashUsers))
  }, [trashUsers])

  const fetchTickets = async () => {
    try {
      const res = await fetch(API_URL)
      if (res.ok) {
        const data = await res.json()
        setTickets(data.map(mapTicketToFrontend))
      }
    } catch (err) {
      console.error('Failed to fetch tickets:', err)
    }
  }

  useEffect(() => {
    fetchTickets()
  }, [])

  const createTicket = async (ticket) => {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: ticket.subject,
          description: ticket.subject, // Assuming description same as subject for now
          priority: ticket.priority || 'Normal',
          category: ticket.category || 'General',
          requestedBy: ticket.requester || 'User'
        })
      })
      if (res.ok) {
        fetchTickets() // refresh the list
      }
    } catch (err) {
      console.error('Failed to create ticket:', err)
    }
  }

  const updateStatus = async (frontendId, status) => {
    // optimistic UI
    setTickets((prev) => prev.map((t) => (t.id === frontendId ? { ...t, status } : t)))
    
    const dbId = frontendId.replace('TCK-', '')
    try {
      await fetch(`${API_URL}/${dbId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      })
    } catch (err) {
      console.error('Failed to update status:', err)
      fetchTickets() // Revert on failure
    }
  }

  const updatePriority = async (frontendId, priority) => {
    // optimistic UI
    setTickets((prev) => prev.map((t) => (t.id === frontendId ? { ...t, priority } : t)))
    
    const dbId = frontendId.replace('TCK-', '')
    try {
      await fetch(`${API_URL}/${dbId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ priority })
      })
    } catch (err) {
      console.error('Failed to update priority:', err)
      fetchTickets() // Revert on failure
    }
  }

  const deleteTicket = async (frontendId) => {
    // optimistic UI
    setTickets((prev) => prev.filter((t) => t.id !== frontendId))

    const dbId = frontendId.replace('TCK-', '')
    try {
      await fetch(`${API_URL}/${dbId}`, {
        method: 'DELETE'
      })
    } catch (err) {
      console.error('Failed to delete ticket:', err)
      fetchTickets() // Revert on failure
    }
  }

  const deleteUser = (userId) => {
    const target = users.find((u) => u.id === userId)
    if (!target) return
    setUsers((prev) => prev.filter((u) => u.id !== userId))
    setTrashUsers((prev) => [
      {
        ...target,
        deletedAt: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
      },
      ...prev.filter((u) => u.id !== userId),
    ])
  }

  const restoreUser = (userId) => {
    const target = trashUsers.find((u) => u.id === userId)
    if (!target) return
    const { deletedAt, ...userToRestore } = target
    setTrashUsers((prev) => prev.filter((u) => u.id !== userId))
    setUsers((prev) => [...prev, userToRestore])
  }

  const permanentlyDeleteUser = (userId) => {
    setTrashUsers((prev) => prev.filter((u) => u.id !== userId))
  }

  const emptyTrash = () => {
    setTrashUsers([])
  }

  return (
    <TicketContext.Provider
      value={{
        tickets,
        createTicket,
        updateStatus,
        updatePriority,
        deleteTicket,
        users,
        trashUsers,
        deleteUser,
        restoreUser,
        permanentlyDeleteUser,
        emptyTrash,
      }}
    >
      {children}
    </TicketContext.Provider>
  )
}

export const useTickets = () => useContext(TicketContext)
