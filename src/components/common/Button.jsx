import React from 'react'

export default function Button({ children, onClick, variant = 'primary', ...props }) {
  const base = 'px-4 py-2 rounded-md font-medium focus:outline-none'
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    ghost: 'bg-transparent text-indigo-600 border border-indigo-200 hover:bg-indigo-50',
    danger: 'bg-red-600 text-white hover:bg-red-700'
  }
  return (
    <button className={`${base} ${variants[variant] || variants.primary}`} onClick={onClick} {...props}>
      {children}
    </button>
  )
}
