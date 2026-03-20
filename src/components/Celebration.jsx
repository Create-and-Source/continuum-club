import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { fonts } from '../theme'

// Full-screen celebration overlay — auto-dismisses after duration
export default function Celebration({ title, subtitle, icon, onDone, duration = 2500 }) {
  useEffect(() => {
    const t = setTimeout(onDone, duration)
    return () => clearTimeout(t)
  }, [onDone, duration])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      onClick={onDone}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999, background: '#0D0D0D',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {/* Sparkle dots */}
      {[...Array(12)].map((_, i) => {
        const angle = (i / 12) * Math.PI * 2
        const r = 100 + Math.random() * 40
        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [0, 1, 0.5], x: Math.cos(angle) * r, y: Math.sin(angle) * r }}
            transition={{ delay: 0.2 + i * 0.06, duration: 1.2 }}
            style={{ position: 'absolute', width: 4, height: 4, borderRadius: '50%', background: '#FFFFFF' }}
          />
        )
      })}

      {/* Icon */}
      {icon && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, type: 'spring' }}
          style={{ marginBottom: 24 }}
        >
          {icon}
        </motion.div>
      )}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: '#FFFFFF',
          textTransform: 'uppercase', letterSpacing: 1, textAlign: 'center', padding: '0 32px',
          lineHeight: 1.3,
        }}
      >
        {title}
      </motion.div>

      {/* Subtitle */}
      {subtitle && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          style={{
            fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: 'rgba(255,255,255,0.5)',
            marginTop: 12, letterSpacing: 1, textTransform: 'uppercase', textAlign: 'center', padding: '0 32px',
          }}
        >
          {subtitle}
        </motion.div>
      )}
    </motion.div>
  )
}
