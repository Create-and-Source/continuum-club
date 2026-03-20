import { useState, useRef, useCallback } from 'react'
import { colors, fonts } from '../theme'

export default function BeforeAfterSlider({ beforeSrc, afterSrc, height = 280, beforeLabel = 'Before', afterLabel = 'Now', beforeSub = 'Day 1', afterSub = 'Season 14' }) {
  const [pos, setPos] = useState(50)
  const containerRef = useRef(null)
  const dragging = useRef(false)

  const updatePos = useCallback((clientX) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = clientX - rect.left
    const pct = Math.max(5, Math.min(95, (x / rect.width) * 100))
    setPos(pct)
  }, [])

  const onPointerDown = (e) => {
    dragging.current = true
    e.currentTarget.setPointerCapture(e.pointerId)
    updatePos(e.clientX)
  }
  const onPointerMove = (e) => {
    if (dragging.current) updatePos(e.clientX)
  }
  const onPointerUp = () => { dragging.current = false }

  return (
    <div
      ref={containerRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      style={{
        position: 'relative',
        height,
        overflow: 'hidden',
        cursor: 'ew-resize',
        touchAction: 'none',
        userSelect: 'none',
      }}
    >
      {/* After (full width behind) */}
      <img src={afterSrc} alt={afterLabel} style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center 20%',
        filter: 'grayscale(100%) contrast(1.15) brightness(1.1)',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.8) 100%)' }} />

      {/* After label */}
      <div style={{ position: 'absolute', bottom: 16, right: 16, textAlign: 'right', zIndex: 1 }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>{afterSub}</div>
        <div style={{ fontFamily: fonts.sans, fontSize: 18, fontWeight: 900, color: colors.text, textTransform: 'uppercase' }}>{afterLabel}</div>
      </div>

      {/* Before (clipped) */}
      <div style={{
        position: 'absolute', inset: 0,
        clipPath: `inset(0 ${100 - pos}% 0 0)`,
      }}>
        <img src={beforeSrc} alt={beforeLabel} style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 40%',
          filter: 'grayscale(100%) contrast(0.85) brightness(0.9)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.8) 100%)' }} />

        {/* Before label */}
        <div style={{ position: 'absolute', bottom: 16, left: 16, zIndex: 1 }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 2 }}>{beforeSub}</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 18, fontWeight: 900, color: colors.text, textTransform: 'uppercase' }}>{beforeLabel}</div>
        </div>
      </div>

      {/* Slider line + handle */}
      <div style={{
        position: 'absolute', top: 0, bottom: 0, left: `${pos}%`,
        transform: 'translateX(-50%)', width: 2, background: 'rgba(255,255,255,0.6)', zIndex: 2,
      }}>
        {/* Handle */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.9)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 2px 8px rgba(0,0,0,0.4)',
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
            <polyline points="9 18 15 12 9 6" transform="translate(6,0)" />
          </svg>
        </div>
      </div>
    </div>
  )
}
