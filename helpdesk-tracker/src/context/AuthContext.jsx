import React, { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

// Mock users. Once the Express + MySQL backend exists, replace `login`
// with a call to POST /api/auth/login and store the returned JWT.
const MOCK_USERS = [
  { id: 1, name: 'Ishara Perera', email: 'ishara@company.com', role: 'user', password: 'password' },
  { id: 2, name: 'Nadeesha Silva', email: 'admin@company.com', role: 'admin', password: 'password' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [error, setError] = useState('')

  const login = (email, password) => {
    const match = MOCK_USERS.find((u) => u.email === email && u.password === password)
    if (!match) {
      setError('Invalid email or password.')
      return false
    }
    setError('')
    setUser(match)
    return true
  }

  const quickLogin = (role) => {
    const match = MOCK_USERS.find((u) => u.role === role)
    setError('')
    setUser(match)
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout, quickLogin, error }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
