import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

// Reusable full-screen guided flow overlay
// steps: [{ title, instruction, seconds?, input?: bool }]
// onComplete: (responses) => void — called with array of input values
// bg: image url for background
export default function GuidedFlow({ steps, onComplete, onClose, bg, title }) {
  const [step, setStep] = useState(0)
  const [countdown, setCountdown] = useState(steps[0].seconds || 0)
  const [responses, setResponses] = useState([])
  const [inputVal, setInputVal] = useState('')

  const current = steps[step]
  const hasTimer = current.seconds && current.seconds > 0 && !current.input

  const advance = useCallback(() => {
    const newResponses = current.input ? [...responses, inputVal] : [...responses, null]
    setResponses(newResponses)
    setInputVal('')

    if (step < steps.length - 1) {
      const next = step + 1
      setStep(next)
      setCountdown(steps[next].seconds || 0)
    } else {
      onComplete(newResponses)
    }
  }, [step, steps, current, responses, inputVal, onComplete])

  useEffect(() => {
    if (!hasTimer) return
    if (countdown <= 0) { advance(); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, hasTimer, advance])

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{ position: 'fixed', inset: 0, zIndex: 9998, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
    >
      <img src={bg || P.runway} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) brightness(0.25)',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.55)' }} />

      {/* Exit button */}
      <button onClick={(e) => { e.stopPropagation(); onClose() }} style={{
        position: 'absolute', top: 20, right: 20, zIndex: 2, width: 40, height: 40, borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      <div style={{ position: 'relative', zIndex: 1, padding: '0 32px', maxWidth: 430, textAlign: 'center', width: '100%' }}>
        {/* Title */}
        {title && (
          <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.3)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 32 }}>
            {title}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
            {/* Step indicator */}
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>
              {step + 1} of {steps.length}
            </div>

            <div style={{ fontFamily: fonts.sans, fontSize: 26, fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 16 }}>
              {current.title}
            </div>

            <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 28 }}>
              {current.instruction}
            </div>

            {/* Timer */}
            {hasTimer && (
              <div style={{ fontFamily: fonts.sans, fontSize: 48, fontWeight: 900, color: '#FFFFFF', lineHeight: 1, marginBottom: 32 }}>
                {countdown}
              </div>
            )}

            {/* Input field */}
            {current.input && (
              <div style={{ marginBottom: 20 }}>
                <textarea
                  value={inputVal}
                  onChange={e => setInputVal(e.target.value)}
                  placeholder={current.placeholder || 'Write here...'}
                  style={{
                    width: '100%', minHeight: 80, background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: radius.sm, padding: 14, fontFamily: fonts.sans, fontSize: 14, fontWeight: 400,
                    color: '#FFFFFF', lineHeight: 1.6, resize: 'none', outline: 'none', textAlign: 'left',
                  }}
                />
              </div>
            )}

            {/* Continue button (for non-timer steps) */}
            {!hasTimer && (
              <button
                onClick={advance}
                style={{
                  padding: '12px 32px', borderRadius: radius.pill,
                  background: (current.input && !inputVal.trim()) ? 'rgba(255,255,255,0.15)' : '#FFFFFF',
                  color: (current.input && !inputVal.trim()) ? 'rgba(255,255,255,0.4)' : '#0D0D0D',
                  border: 'none', fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 1,
                  textTransform: 'uppercase', cursor: (current.input && !inputVal.trim()) ? 'default' : 'pointer',
                }}
              >
                {step === steps.length - 1 ? 'Finish' : 'Continue'}
              </button>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 32 }}>
          {steps.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i <= step ? '#FFFFFF' : 'rgba(255,255,255,0.2)', transition: 'background 0.3s' }} />
          ))}
        </div>
      </div>
    </motion.div>
  )
}
