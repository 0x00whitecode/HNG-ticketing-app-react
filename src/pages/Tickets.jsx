import React, { useEffect, useState } from 'react'
import { listTickets, createTicket, updateTicket, deleteTicket } from '../services/tickets'
import { useToast } from '../components/Toast'
import QRCode from '../components/QRCode'

const STATUS_COLORS = {
  open: 'status-open',
  in_progress: 'status-progress',
  closed: 'status-closed'
}

function TicketCard({ t, onEdit, onDelete }) {
  return (
    <div className="card ticket-card" data-status={t.status}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'.75rem'}}>
        <div style={{flex:1}}>
          <div className="ticket-head">
            <h4>{t.title}</h4>
            <span className={`badge ${STATUS_COLORS[t.status] || ''}`}>{t.status}</span>
          </div>
          <p className="muted">{t.description}</p>
          <div className="ticket-meta">
            <span>Priority: <strong style={{textTransform:'capitalize'}}>{t.priority || 'low'}</strong></span>
            <span>•</span>
            <span>{t.createdAt ? new Date(t.createdAt).toLocaleString() : ''}</span>
          </div>
        </div>
        <div style={{flex:'0 0 auto',display:'flex',flexDirection:'column',alignItems:'center',gap:'.5rem'}}>
          <QRCode value={`ticket:${t.id}`} size={84} className="qr-img" />
          <div style={{display:'flex',gap:'.5rem'}}>
            <button className="btn btn-ghost" onClick={() => onEdit(t)}>Edit</button>
            <button className="btn btn-danger" onClick={() => onDelete(t)}>Delete</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Tickets() {
  const [tickets, setTickets] = useState([])
  const [loading, setLoading] = useState(true)
  const [form, setForm] = useState({ title: '', status: 'open', description: '', priority: 'low' })
  const [editing, setEditing] = useState(null)
  const { show } = useToast()

  useEffect(() => {
    refresh()
  }, [])

  async function refresh() {
    setLoading(true)
    try {
      const list = await listTickets()
      setTickets(list)
    } catch (err) {
      show('Failed to load tickets. Please retry.', 'error')
    } finally {
      setLoading(false)
    }
  }

  async function submit(e) {
    e.preventDefault()
    // inline validation
    if (!form.title || form.title.trim().length < 3) {
      return show('Title is required and must be at least 3 characters', 'error')
    }
    if (!['open','in_progress','closed'].includes(form.status)) {
      return show('Invalid status selected', 'error')
    }
    if (!['low','medium','high'].includes(form.priority)) {
      return show('Invalid priority', 'error')
    }
    try {
      if (editing) {
        await updateTicket(editing.id, form)
        show('Ticket updated', 'success')
      } else {
        await createTicket(form)
        show('Ticket created', 'success')
      }
      setForm({ title: '', status: 'open', description: '' })
      setEditing(null)
      refresh()
    } catch (err) {
      show(err.message || 'Failed', 'error')
    }
  }

  function startEdit(t) {
    setEditing(t)
    setForm({ title: t.title, status: t.status, description: t.description || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function doDelete(t) {
    if (!confirm('Delete this ticket?')) return
    try {
      await deleteTicket(t.id)
      show('Ticket deleted', 'success')
      refresh()
    } catch (err) {
      show('Failed to delete ticket', 'error')
    }
  }

  return (
    <section>
      <h2>Tickets</h2>
      <div className="card form-card">
        <form onSubmit={submit}>
          <label>
            Title *
            <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} aria-required="true" aria-label="Ticket title" />
          </label>
          <div style={{display:'grid',gridTemplateColumns:'1fr 160px',gap:'.5rem'}}>
            <label>
              Status *
              <select required value={form.status} onChange={e => setForm({ ...form, status: e.target.value })} aria-required="true">
                <option value="open">open</option>
                <option value="in_progress">in_progress</option>
                <option value="closed">closed</option>
              </select>
            </label>
            <label>
              Priority
              <select value={form.priority} onChange={e => setForm({ ...form, priority: e.target.value })}>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </label>
          </div>
          <label>
            Description
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
          </label>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit">{editing ? 'Update' : 'Create'}</button>
            {editing && <button type="button" className="btn btn-ghost" onClick={() => { setEditing(null); setForm({ title: '', status: 'open', description: '' }) }}>Cancel</button>}
          </div>
        </form>
      </div>

      <div className="mt-4">
        {loading ? <p>Loading...</p> : (
          <div className="grid tickets-grid">
            {tickets.length === 0 && <p className="muted">No tickets yet. Create one above.</p>}
            {tickets.map(t => (
              <TicketCard key={t.id} t={t} onEdit={startEdit} onDelete={doDelete} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
