import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login } from '../../services/auth'
import { useToast } from '../../components/Toast'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()
  const { show } = useToast()

  async function submit(e) {
    e.preventDefault()
    const errs = {}
    if (!email) errs.email = 'Email is required'
    if (!password) errs.password = 'Password is required'
    setErrors(errs)
    if (Object.keys(errs).length) return
    try {
      await login({ email, password })
      show('Logged in successfully', 'success')
      navigate('/dashboard')
    } catch (err) {
      show(err.message || 'Login failed', 'error')
    }
  }

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={submit} noValidate>
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
          <button className="btn btn-primary" type="submit">Login</button>
          <Link to="/auth/signup" className="btn btn-ghost">Create account</Link>
        </div>
      </form>
    </div>
  )
}
