import React, { useState, useEffect } from 'react'
import { toDataURL } from 'qrcode'

export default function QRCode({ value, size = 96, className = '' }) {
  const [src, setSrc] = useState(null)

  useEffect(() => {
    let mounted = true
    if (!value) {
      setSrc(null)
      return
    }
    toDataURL(value, { width: size, margin: 1 }).then(url => {
      if (mounted) setSrc(url)
    }).catch(() => {
      if (mounted) setSrc(null)
    })
    return () => { mounted = false }
  }, [value, size])

  if (!src) return <div className={`qr-placeholder ${className}`} aria-hidden />
  return <img src={src} alt="Ticket QR code" width={size} height={size} className={className} />
}
