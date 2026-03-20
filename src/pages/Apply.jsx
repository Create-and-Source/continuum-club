import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set } from '../store'

const steps = [
  {
    type: 'welcome',
    title: 'Your Modeling Era Starts Here',
    desc: 'Find out if our Model Development Program is the right fit for you. No experience needed — just a desire to grow!',
    button: "Let's Begin",
    image: P.portrait,
  },
  {
    type: 'choice',
    question: "What's inspiring you to explore modeling right now?",
    required: true,
    options: [
      'I want to build confidence and learn to love how I show up',
      "I've always been interested in modeling and want to take it seriously",
      'I want to improve my posing, runway, and skills for future opportunities',
      'I think it might be fun to try and see what happens',
      "Modeling sounds cool but I'm still figuring out if it's for me",
    ],
  },
  {
    type: 'statement',
    text: 'Our students come with all kinds of goals and backgrounds. There is no wrong answer!',
    image: P.event,
  },
  {
    type: 'choice',
    question: 'How old are you?',
    required: true,
    options: ['14-17', '18-24', '25-29', '30+'],
  },
  {
    type: 'statement',
    text: 'Our program is designed for individuals ages 14 and up who are ready to grow in confidence, skill, and presence.',
    image: P.training,
  },
  {
    type: 'choice',
    question: 'What is your modeling experience level?',
    required: true,
    options: ['No experience', 'Previous Training', 'Agency Development'],
  },
  {
    type: 'statement',
    text: 'Over 80% of our students start with zero experience!',
    image: P.runway,
  },
  {
    type: 'multi',
    question: 'What are you hoping to gain from a modeling program?',
    required: true,
    options: [
      'Confidence & self-esteem',
      'Runway skills & posing',
      'Photoshoot experience & camera presence',
      'Branding & business knowledge',
      'Community & support',
      'A fun experience',
    ],
  },
  {
    type: 'statement',
    text: "We don't just train models — we develop people.",
    image: P.community,
  },
  {
    type: 'choice',
    question: 'Where are you located?',
    required: true,
    options: ['Arizona', 'Out of state'],
  },
  {
    type: 'statement',
    text: 'Our in-person training takes place in Scottsdale, AZ. We also offer an advanced individualized training program for out-of-state models.',
    image: P.studio,
  },
  {
    type: 'multi',
    question: 'What qualities are you most looking to build in yourself?',
    required: true,
    options: [
      'Confidence',
      'Discipline',
      'Self-expression',
      'Communication skills',
      "I'm not really sure yet",
    ],
  },
  {
    type: 'statement',
    text: 'Modeling is the outcome. Personal growth is the foundation.',
    image: P.crowd,
  },
  {
    type: 'choice',
    question: 'Which best describes your current mindset?',
    required: true,
    options: [
      "I'm ready to be pushed outside my comfort zone",
      "I'm open to learning and growing, even if I'm nervous",
      "I'm curious but still figuring things out",
    ],
  },
  {
    type: 'info',
    question: "Almost done! Let's get your info.",
    fields: [
      { key: 'name', label: 'Full Name', placeholder: 'Your name' },
      { key: 'email', label: 'Email', placeholder: 'your@email.com' },
      { key: 'phone', label: 'Phone', placeholder: '(555) 000-0000' },
      { key: 'instagram', label: 'Instagram (optional)', placeholder: '@yourhandle' },
    ],
  },
  {
    type: 'complete',
    title: "You're In the Running!",
    desc: "Thanks for applying to Corella & Co's Model Development Program. We'll review your application and reach out to schedule your in-person interview.",
  },
]

export default function Apply() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)
  const [multiSelected, setMultiSelected] = useState([])
  const [fields, setFields] = useState({})

  const current = steps[step]
  const total = steps.length

  const canAdvance = () => {
    if (current.type === 'choice') return selected !== null
    if (current.type === 'multi') return multiSelected.length > 0
    if (current.type === 'info') return fields.name?.trim() && fields.email?.trim()
    return true
  }

  const advance = () => {
    if (!canAdvance()) return

    const newAnswers = { ...answers }
    if (current.type === 'choice') {
      newAnswers[step] = selected
      setSelected(null)
    } else if (current.type === 'multi') {
      newAnswers[step] = multiSelected
      setMultiSelected([])
    } else if (current.type === 'info') {
      newAnswers[step] = fields
      // Save application
      const apps = get('applications', [])
      apps.push({
        ...fields,
        answers: newAnswers,
        date: new Date().toISOString(),
        status: 'Pending',
      })
      set('applications', apps)
    }
    setAnswers(newAnswers)

    if (step < total - 1) setStep(step + 1)
  }

  const toggleMulti = (opt) => {
    setMultiSelected(prev =>
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    )
  }

  // Progress (skip welcome and complete)
  const progressPct = Math.min(((step) / (total - 1)) * 100, 100)

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120, position: 'relative' }}>
      {/* Progress bar */}
      {step > 0 && step < total - 1 && (
        <div style={{ position: 'sticky', top: 0, zIndex: 10, padding: '12px 16px 0', background: colors.bg }}>
          <div style={{ height: 3, borderRadius: 2, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
            <motion.div animate={{ width: `${progressPct}%` }} transition={{ duration: 0.3 }}
              style={{ height: '100%', background: '#FFFFFF', borderRadius: 2 }} />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div key={step} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }}>

          {/* Welcome */}
          {current.type === 'welcome' && (
            <div style={{ position: 'relative', minHeight: '100dvh', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
                <img src={current.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,1) 100%)' }} />
              </div>
              <div style={{ padding: '0 24px', marginTop: -40, position: 'relative', zIndex: 1 }}>
                <img src={P.logo} alt="Corella & Co" style={{ height: 32, marginBottom: 24, opacity: 0.7 }} />
                <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.2, marginBottom: 16 }}>
                  {current.title}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text2, lineHeight: 1.7, marginBottom: 40 }}>
                  {current.desc}
                </div>
                <button onClick={advance} style={{
                  width: '100%', padding: '18px 0', borderRadius: radius.card, background: '#FFFFFF', border: 'none',
                  fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, color: '#0D0D0D', letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  {current.button}
                </button>
              </div>
            </div>
          )}

          {/* Choice */}
          {current.type === 'choice' && (
            <div style={{ padding: '48px 20px 0' }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, fontWeight: 900, color: colors.text, lineHeight: 1.3, marginBottom: 28 }}>
                {current.question}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {current.options.map((opt, i) => (
                  <button key={i} onClick={() => setSelected(opt)} style={{
                    width: '100%', padding: '16px 18px', borderRadius: radius.card, textAlign: 'left',
                    border: `1px solid ${selected === opt ? '#FFFFFF' : colors.border}`,
                    background: selected === opt ? 'rgba(255,255,255,0.08)' : 'transparent',
                    fontFamily: fonts.sans, fontSize: 14, fontWeight: selected === opt ? 700 : 500,
                    color: selected === opt ? colors.text : colors.text2,
                    cursor: 'pointer', transition: 'all 0.2s', lineHeight: 1.5,
                  }}>
                    {opt}
                  </button>
                ))}
              </div>
              <button onClick={advance} disabled={!canAdvance()} style={{
                width: '100%', padding: '16px 0', borderRadius: radius.card, border: 'none', marginTop: 24,
                background: canAdvance() ? '#FFFFFF' : 'rgba(255,255,255,0.08)',
                color: canAdvance() ? '#0D0D0D' : colors.text3,
                fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase',
                cursor: canAdvance() ? 'pointer' : 'default',
              }}>
                Continue
              </button>
            </div>
          )}

          {/* Multi select */}
          {current.type === 'multi' && (
            <div style={{ padding: '48px 20px 0' }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, fontWeight: 900, color: colors.text, lineHeight: 1.3, marginBottom: 8 }}>
                {current.question}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3, marginBottom: 24 }}>
                Select all that apply
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {current.options.map((opt, i) => {
                  const isSel = multiSelected.includes(opt)
                  return (
                    <button key={i} onClick={() => toggleMulti(opt)} style={{
                      width: '100%', padding: '16px 18px', borderRadius: radius.card, textAlign: 'left',
                      border: `1px solid ${isSel ? '#FFFFFF' : colors.border}`,
                      background: isSel ? 'rgba(255,255,255,0.08)' : 'transparent',
                      fontFamily: fonts.sans, fontSize: 14, fontWeight: isSel ? 700 : 500,
                      color: isSel ? colors.text : colors.text2,
                      cursor: 'pointer', transition: 'all 0.2s', lineHeight: 1.5,
                      display: 'flex', alignItems: 'center', gap: 12,
                    }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: 4, border: `2px solid ${isSel ? '#FFFFFF' : colors.border}`,
                        background: isSel ? '#FFFFFF' : 'transparent', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        {isSel && <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
                      </div>
                      {opt}
                    </button>
                  )
                })}
              </div>
              <button onClick={advance} disabled={!canAdvance()} style={{
                width: '100%', padding: '16px 0', borderRadius: radius.card, border: 'none', marginTop: 24,
                background: canAdvance() ? '#FFFFFF' : 'rgba(255,255,255,0.08)',
                color: canAdvance() ? '#0D0D0D' : colors.text3,
                fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase',
                cursor: canAdvance() ? 'pointer' : 'default',
              }}>
                Continue
              </button>
            </div>
          )}

          {/* Statement */}
          {current.type === 'statement' && (
            <div style={{ position: 'relative', minHeight: '80dvh', display: 'flex', flexDirection: 'column' }}>
              {current.image && (
                <>
                  <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                    <img src={current.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%)' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(13,13,13,1) 100%)' }} />
                  </div>
                </>
              )}
              <div style={{ padding: '0 24px', marginTop: current.image ? -20 : 80, position: 'relative', zIndex: 1 }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 22, fontWeight: 900, color: colors.text, lineHeight: 1.4, marginBottom: 32 }}>
                  {current.text}
                </div>
                <button onClick={advance} style={{
                  width: '100%', padding: '16px 0', borderRadius: radius.card, border: `1px solid rgba(255,255,255,0.2)`, background: 'transparent',
                  fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  Continue
                </button>
              </div>
            </div>
          )}

          {/* Info fields */}
          {current.type === 'info' && (
            <div style={{ padding: '48px 20px 0' }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 22, fontWeight: 900, color: colors.text, lineHeight: 1.3, marginBottom: 28 }}>
                {current.question}
              </div>
              {current.fields.map((f, i) => (
                <div key={i} style={{ marginBottom: 16 }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>
                    {f.label}
                  </div>
                  <input
                    value={fields[f.key] || ''}
                    onChange={e => setFields({ ...fields, [f.key]: e.target.value })}
                    placeholder={f.placeholder}
                    style={{
                      width: '100%', padding: '14px 16px', background: colors.surface, border: `1px solid ${colors.border}`,
                      borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text, outline: 'none',
                    }}
                  />
                </div>
              ))}
              <button onClick={advance} disabled={!canAdvance()} style={{
                width: '100%', padding: '18px 0', borderRadius: radius.card, border: 'none', marginTop: 8,
                background: canAdvance() ? '#FFFFFF' : 'rgba(255,255,255,0.08)',
                color: canAdvance() ? '#0D0D0D' : colors.text3,
                fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
                cursor: canAdvance() ? 'pointer' : 'default',
              }}>
                Submit Application
              </button>
            </div>
          )}

          {/* Complete */}
          {current.type === 'complete' && (
            <div style={{ padding: '0', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ padding: '0 32px', textAlign: 'center' }}>
                <svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 24 }}>
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.2, marginBottom: 16 }}>
                  {current.title}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text2, lineHeight: 1.7 }}>
                  {current.desc}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text3, marginTop: 24, letterSpacing: 1, textTransform: 'uppercase' }}>
                  Season 18 — Now Enrolling
                </div>
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  )
}
