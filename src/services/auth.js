// Simple auth simulation using localStorage
const USERS_KEY = 'ticketapp_users'
const SESSION_KEY = 'ticketapp_session'

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
  } catch (e) {
    return []
  }
}

export function signup({ name, email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!email || !password) return reject(new Error('Email and password required'))
      const users = readUsers()
      if (users.find(u => u.email === email)) return reject(new Error('User already exists'))
      const user = { id: Date.now(), name, email, password }
      users.push(user)
      localStorage.setItem(USERS_KEY, JSON.stringify(users))
      // create session
      const token = `tok_${Date.now()}_${Math.random().toString(36).slice(2,8)}`
      localStorage.setItem(SESSION_KEY, JSON.stringify({ token, email }))
      resolve({ token, user })
    }, 300)
  })
}

export function login({ email, password }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const users = readUsers()
      const user = users.find(u => u.email === email && u.password === password)
      if (!user) return reject(new Error('Invalid credentials'))
      const token = `tok_${Date.now()}_${Math.random().toString(36).slice(2,8)}`
      localStorage.setItem(SESSION_KEY, JSON.stringify({ token, email }))
      resolve({ token, user })
    }, 300)
  })
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch (e) {
    return null
  }
}

export function isAuthenticated() {
  return !!getSession()
}
