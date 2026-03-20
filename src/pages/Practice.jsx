import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set, increment } from '../store'

const categories = [
  {
    title: 'Runway & Posing', icon: '◆',
    sessions: [
      { id: 'rp1', title: 'Power Walk Fundamentals', duration: '8 min', level: 'Foundation' },
      { id: 'rp2', title: 'Editorial Posing Flow', duration: '12 min', level: 'Intermediate' },
      { id: 'rp3', title: 'Heel Confidence Drill', duration: '6 min', level: 'Foundation' },
      { id: 'rp4', title: 'Runway Presence Masterclass', duration: '15 min', level: 'Advanced' },
    ],
  },
  {
    title: 'Confidence', icon: '●',
    sessions: [
      { id: 'c1', title: 'Mirror Talk Practice', duration: '5 min', level: 'Foundation' },
      { id: 'c2', title: 'Room Entry Energy', duration: '10 min', level: 'Intermediate' },
      { id: 'c3', title: 'Vocal Projection Lab', duration: '8 min', level: 'Foundation' },
      { id: 'c4', title: 'Stage Fright Reset', duration: '12 min', level: 'Advanced' },
    ],
  },
  {
    title: 'Breathing', icon: '○',
    sessions: [
      { id: 'b1', title: 'Pre-Runway Calm', duration: '4 min', level: 'Foundation' },
      { id: 'b2', title: 'Grounding Breath', duration: '6 min', level: 'Foundation' },
      { id: 'b3', title: 'Box Breathing for Focus', duration: '5 min', level: 'Intermediate' },
      { id: 'b4', title: 'Performance Anxiety Release', duration: '10 min', level: 'Advanced' },
    ],
  },
  {
    title: 'Communication', icon: '▪',
    sessions: [
      { id: 'cm1', title: 'Elevator Pitch Practice', duration: '7 min', level: 'Foundation' },
      { id: 'cm2', title: 'Casting Call Confidence', duration: '10 min', level: 'Intermediate' },
      { id: 'cm3', title: 'Networking Conversation Flow', duration: '8 min', level: 'Foundation' },
      { id: 'cm4', title: 'Interview Presence', duration: '12 min', level: 'Advanced' },
    ],
  },
]

const playlists = [
  { title: 'Walk Music', subtitle: '24 tracks', image: P.runway },
  { title: 'Studio Energy', subtitle: '18 tracks', image: P.studio },
  { title: 'Cool Down', subtitle: '12 tracks', image: P.portrait },
  { title: 'Shoot Day', subtitle: '30 tracks', image: P.training },
]

const ritualSteps = [
  { title: 'Grounding', instruction: 'Feel both feet flat on the floor. Press down. You are here.', seconds: 10 },
  { title: 'Spine', instruction: 'Stack your spine. Crown of the head reaching up. Shoulders down and back.', seconds: 8 },
  { title: 'Breath', instruction: 'Inhale through the nose for 4 counts. Hold 4. Exhale 6.', seconds: 14 },
  { title: 'Eyes', instruction: 'Soften your gaze. Lift your chin slightly. Look forward, not down.', seconds: 8 },
  { title: 'Affirmation', instruction: 'Say it quietly or in your mind: "I walk like I belong everywhere I go."', seconds: 10 },
  { title: 'Walk', instruction: 'You are ready. Step forward with intention.', seconds: 6 },
]

function RitualOverlay({ onClose }) {
  const [step, setStep] = useState(0)
  const [countdown, setCountdown] = useState(ritualSteps[0].seconds)
  const advanceStep = useCallback(() => {
    if (step < ritualSteps.length - 1) { const n = step + 1; setStep(n); setCountdown(ritualSteps[n].seconds) } else { onClose() }
  }, [step, onClose])
  useEffect(() => {
    if (countdown <= 0) { advanceStep(); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, advanceStep])
  const current = ritualSteps[step]
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}
      onClick={advanceStep} style={{ position: 'fixed', inset: 0, zIndex: 9998, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
      <img src={P.runway} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) brightness(0.3)' }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
      <button onClick={(e) => { e.stopPropagation(); onClose() }} style={{
        position: 'absolute', top: 20, right: 20, zIndex: 2, width: 40, height: 40, borderRadius: '50%',
        background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <div style={{ position: 'relative', zIndex: 1, padding: '0 32px', maxWidth: 430, textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>Step {step + 1} of {ritualSteps.length}</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>{current.title}</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 32 }}>{current.instruction}</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 48, fontWeight: 900, color: '#FFFFFF', lineHeight: 1, marginBottom: 40 }}>{countdown}</div>
          </motion.div>
        </AnimatePresence>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {ritualSteps.map((_, i) => <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i <= step ? '#FFFFFF' : 'rgba(255,255,255,0.2)' }} />)}
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.25)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 32 }}>Tap to skip</div>
      </div>
    </motion.div>
  )
}

export default function Practice() {
  const [expanded, setExpanded] = useState(null)
  const [completed, setCompleted] = useState(() => get('completedSessions', {}))
  const [showRitual, setShowRitual] = useState(false)
  const [activeSession, setActiveSession] = useState(null)

  const markComplete = (id) => {
    const next = { ...completed, [id]: true }
    setCompleted(next)
    set('completedSessions', next)
    increment('sessionsCompleted', 0)
    setActiveSession(null)
  }

  const handleRitualComplete = () => {
    setShowRitual(false)
    increment('ritualsCompleted', 0)
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      <AnimatePresence>
        {showRitual && <RitualOverlay onClose={handleRitualComplete} />}
      </AnimatePresence>

      {/* Session Player Overlay */}
      <AnimatePresence>
        {activeSession && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9997, background: 'rgba(0,0,0,0.85)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ padding: '0 32px', maxWidth: 430, textAlign: 'center' }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
                Now Playing
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 24, fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', marginBottom: 8 }}>
                {activeSession.title}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text2, marginBottom: 32 }}>
                {activeSession.duration} · {activeSession.level}
              </div>
              <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
                <button onClick={() => setActiveSession(null)} style={{
                  padding: '12px 24px', borderRadius: radius.pill, border: `1px solid ${colors.border}`, background: 'transparent',
                  fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text2, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
                }}>Close</button>
                <button onClick={() => markComplete(activeSession.id)} style={{
                  padding: '12px 24px', borderRadius: radius.pill, background: '#FFFFFF', border: 'none',
                  fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: '#0D0D0D', letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
                }}>Complete</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero */}
      <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
        <img src={P.training} alt="Before I Walk" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
          <div style={{ display: 'inline-block', padding: '4px 12px', background: 'rgba(255,255,255,0.15)', borderRadius: radius.pill, fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 10 }}>Featured</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1, marginBottom: 6 }}>Before I Walk</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, lineHeight: 1.4 }}>Your daily pre-walk ritual. Posture, breath, intention.</div>
          <button onClick={() => setShowRitual(true)} style={{
            marginTop: 14, padding: '10px 28px', background: '#FFFFFF', color: '#0D0D0D', border: 'none', borderRadius: radius.pill,
            fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
          }}>Start</button>
        </div>
      </div>

      {/* Categories */}
      <div style={{ margin: '24px 0 0' }}>
        <div style={{ margin: '0 16px 16px', fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase' }}>
          Practice Sessions
        </div>
        {categories.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 2 }}>
            <button onClick={() => setExpanded(expanded === ci ? null : ci)} style={{
              width: '100%', padding: '16px 20px', background: expanded === ci ? colors.surface : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: `1px solid ${colors.border}`, border: 'none', borderBottomStyle: 'solid', borderBottomWidth: 1, borderBottomColor: colors.border,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontFamily: fonts.sans, fontSize: 14, color: colors.text2 }}>{cat.icon}</span>
                <span style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>{cat.title}</span>
              </div>
              <span style={{ fontFamily: fonts.sans, fontSize: 12, color: colors.text3, fontWeight: 500 }}>
                {cat.sessions.filter(s => completed[s.id]).length}/{cat.sessions.length} done
              </span>
            </button>
            <AnimatePresence>
              {expanded === ci && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} style={{ overflow: 'hidden' }}>
                  {cat.sessions.map((s, si) => (
                    <div key={si} onClick={() => !completed[s.id] && setActiveSession(s)} style={{
                      padding: '14px 20px 14px 46px', borderBottom: `1px solid ${colors.border}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: completed[s.id] ? 'default' : 'pointer',
                      opacity: completed[s.id] ? 0.5 : 1,
                    }}>
                      <div>
                        <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: colors.text, marginBottom: 3 }}>
                          {completed[s.id] ? '✓ ' : ''}{s.title}
                        </div>
                        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, color: colors.text3 }}>{s.duration} · {s.level}</div>
                      </div>
                      {!completed[s.id] && (
                        <div style={{ width: 32, height: 32, borderRadius: '50%', border: `1px solid ${colors.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <svg width={12} height={12} viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3" /></svg>
                        </div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Studio Playlists */}
      <div style={{ margin: '28px 0 0' }}>
        <div style={{ margin: '0 16px 14px', fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase' }}>
          Studio Playlists
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, margin: '0 16px' }}>
          {playlists.map((pl, i) => (
            <div key={i} style={{ position: 'relative', borderRadius: radius.card, overflow: 'hidden', height: 140 }}>
              <img src={pl.image} alt={pl.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 12, left: 12 }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.3 }}>{pl.title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: colors.text3, marginTop: 2 }}>{pl.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
