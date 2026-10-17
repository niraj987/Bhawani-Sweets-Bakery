import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('bhawani_token')
    const userData = localStorage.getItem('bhawani_user')
    if (token && userData) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(JSON.parse(userData))
    }
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    const res = await axios.post('/api/auth/login', { email, password })
    const { token, user: u } = res.data
    localStorage.setItem('bhawani_token', token)
    localStorage.setItem('bhawani_user', JSON.stringify(u))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(u)
    return u
  }

  const signup = async (data) => {
    const res = await axios.post('/api/auth/signup', data)
    const { token, user: u } = res.data
    localStorage.setItem('bhawani_token', token)
    localStorage.setItem('bhawani_user', JSON.stringify(u))
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    setUser(u)
    return u
  }

  const logout = () => {
    localStorage.removeItem('bhawani_token')
    localStorage.removeItem('bhawani_user')
    delete axios.defaults.headers.common['Authorization']
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
