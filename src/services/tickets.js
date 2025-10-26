import { v4 as uuidv4 } from 'uuid'

const TICKETS_KEY = 'ticketapp_tickets'

function readTicketsRaw() {
  try {
    return JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]')
  } catch (e) {
    return []
  }
}

function writeTickets(list) {
  localStorage.setItem(TICKETS_KEY, JSON.stringify(list))
}

function delay(ms = 250) {
  return new Promise(r => setTimeout(r, ms))
}

export async function listTickets() {
  await delay(200)
  return readTicketsRaw()
}

export async function createTicket({ title, status, description = '', priority = 'low' }) {
  await delay(200)
  if (!title) throw new Error('Title is required')
  if (!['open', 'in_progress', 'closed'].includes(status)) throw new Error('Invalid status')
  if (!['low','medium','high'].includes(priority)) throw new Error('Invalid priority')
  if (description && description.length > 2000) throw new Error('Description is too long')
  const tickets = readTicketsRaw()
  const ticket = { id: uuidv4(), title, status, description, priority, createdAt: Date.now() }
  tickets.unshift(ticket)
  writeTickets(tickets)
  return ticket
}

export async function updateTicket(id, patch) {
  await delay(200)
  const tickets = readTicketsRaw()
  const idx = tickets.findIndex(t => t.id === id)
  if (idx === -1) throw new Error('Ticket not found')
  const updated = { ...tickets[idx], ...patch }
  if (!updated.title) throw new Error('Title is required')
  if (!['open', 'in_progress', 'closed'].includes(updated.status)) throw new Error('Invalid status')
  if (!['low','medium','high'].includes(updated.priority)) updated.priority = 'low'
  if (updated.description && updated.description.length > 2000) throw new Error('Description is too long')
  tickets[idx] = updated
  writeTickets(tickets)
  return updated
}

export async function deleteTicket(id) {
  await delay(150)
  const tickets = readTicketsRaw()
  const newList = tickets.filter(t => t.id !== id)
  writeTickets(newList)
  return true
}
