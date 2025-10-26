import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { signup } from '../../services/auth'
import { useToast } from '../../components/Toast'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { show } = useToast()

  async function submit(e) {
    e.preventDefault()
    const errs = {}
    if (!email) errs.email = 'Email is required'
    if (!password || password.length < 6) errs.password = 'Password must be 6+ chars'
    if (!name) errs.name = 'Name is required'
    setErrors(errs)
    if (Object.keys(errs).length) return
    try {
      await signup({ name, email, password })
      show('Account created', 'success')
      navigate('/dashboard')
    } catch (err) {
      show(err.message || 'Signup failed', 'error')
    }
  }

  return (
    <div className="auth-card">
      <h2>Create account</h2>
      <form onSubmit={submit} noValidate>
        <label>
          Full name
          <input value={name} onChange={e => setName(e.target.value)} required aria-invalid={errors.name ? 'true' : 'false'} aria-describedby={errors.name ? 'name-error' : undefined} />
          {errors.name && <div id="name-error" className="field-error">{errors.name}</div>}
        </label>
        <label>
          Email
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} required aria-invalid={errors.email ? 'true' : 'false'} aria-describedby={errors.email ? 'email-error' : undefined} />
          {errors.email && <div id="email-error" className="field-error">{errors.email}</div>}
        </label>
        <label>
          Password
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} required aria-invalid={errors.password ? 'true' : 'false'} aria-describedby={errors.password ? 'password-error' : undefined} />
          {errors.password && <div id="password-error" className="field-error">{errors.password}</div>}
        </label>
        <div className="auth-actions">
          <button className="btn btn-primary" type="submit">Sign up</button>
        </div>
      </form>
    </div>
  )
}
