import React from 'react'
import { Link } from 'react-router-dom'
import wave from '../assets/wave.svg'

export default function Landing() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <h1 className="hero-title">HNG Collaboration ticket villa — Manage work, effortlessly</h1>
          <p className="hero-sub">A simple ticket management demo built with React. Create, edit, and track tickets with ease.</p>
          <div className="hero-ctas">
            <Link to="/auth/login" className="btn btn-primary">Login</Link>
            <Link to="/auth/signup" className="btn btn-ghost">Get Started</Link>
          </div>
        </div>
        <div className="hero-decor">
          <div className="circle circle-1" aria-hidden></div>
          <div className="circle circle-2" aria-hidden></div>
        </div>
      </div>
      <img src={wave} alt="decorative wave" className="hero-wave" />
      <div className="container">
        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">+</div>
            <div>
              <div className="feature-title">Create & Track</div>
              <div className="feature-desc">Quickly create tickets, add details and track progress across stages.</div>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚙</div>
            <div>
              <div className="feature-title">Collaborate</div>
              <div className="feature-desc">Share tickets with teammates and keep updates centralized.</div>
            </div>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔔</div>
            <div>
              <div className="feature-title">Notifications</div>
              <div className="feature-desc">Receive toast feedback for actions and validation.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
