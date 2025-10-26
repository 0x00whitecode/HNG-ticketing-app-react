import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listTickets } from '../services/tickets'

function StatCard({ title, value, hint }) {
  return (
    <div className="card stat">
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div>
          <h3 style={{margin:'0 0 .35rem'}}>{title}</h3>
          <div className="stat-num">{value}</div>
        </div>
        <div className="muted" style={{fontSize:'.9rem'}}>{hint}</div>
      </div>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({ total: 0, open: 0, resolved: 0 })

  useEffect(() => {
    let mounted = true
    listTickets().then(list => {
      if (!mounted) return
      const total = list.length
      const open = list.filter(t => t.status === 'open').length
      const resolved = list.filter(t => t.status === 'closed').length
      setStats({ total, open, resolved })
    }).catch(() => {
      // could show toast
    })
    return () => { mounted = false }
  }, [])

  return (
    <section>
      <h2>Dashboard</h2>
      <div className="grid stats-grid">
        <StatCard title="Total tickets" value={stats.total} hint="All time" />
        <StatCard title="Open tickets" value={stats.open} hint="Needs attention" />
        <StatCard title="Resolved" value={stats.resolved} hint="Completed" />
      </div>
      <div className="mt-4">
        <Link to="/tickets" className="btn btn-primary">Manage tickets</Link>
      </div>
    </section>
  )
}
