import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ToastProvider, { useToast } from './Toast'
import { logout, getSession } from '../services/auth'

function Header() {
  const navigate = useNavigate()
  const session = getSession()
  const [open, setOpen] = useState(false)

  function doLogout() {
    logout()
    navigate('/')
    setOpen(false)
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">HCTV</Link>

        <button
          className="mobile-toggle"
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen(v => !v)}
        >
          <span className="hamburger" aria-hidden />
        </button>

        <nav className={`nav ${open ? 'open' : ''}`} aria-hidden={!open && typeof window !== 'undefined' && window.innerWidth < 769}>
          <Link to="/" onClick={() => setOpen(false)}>Home</Link>
          {session ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}>Dashboard</Link>
              <Link to="/tickets" onClick={() => setOpen(false)}>Tickets</Link>
              <button className="link-ghost" onClick={doLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link to="/auth/login" onClick={() => setOpen(false)}>Login</Link>
              <Link to="/auth/signup" onClick={() => setOpen(false)}>Get Started</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default function Layout({ children }) {
  return (
    <ToastProvider>
      <div className="app-root">
        <Header />
        <main className="container main-content">{children}</main>
        <footer className="site-footer">
          <div className="container footer-inner">
            <p>© TicketApp — a demo project. Accessible and responsive.</p>
            <p>Session key: <code>ticketapp_session</code></p>
          </div>
        </footer>
      </div>
    </ToastProvider>
  )
}
