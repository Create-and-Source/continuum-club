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
    key: 'location',
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
    key: 'mindset',
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
  // Placeholder for dynamic completion — rendered conditionally below
  { type: 'complete' },
]

export default function Apply() {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [selected, setSelected] = useState(null)
  const [multiSelected, setMultiSelected] = useState([])
  const [fields, setFields] = useState({})
  const [locationAnswer, setLocationAnswer] = useState(null)
  const [mindsetAnswer, setMindsetAnswer] = useState(null)

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
      if (current.key === 'location') setLocationAnswer(selected)
      if (current.key === 'mindset') setMindsetAnswer(selected)
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
        location: locationAnswer,
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

  // Determine completion variant
  const isArizona = locationAnswer === 'Arizona'
  const isUndecided = mindsetAnswer === "I'm curious but still figuring things out"

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

          {/* Branching Completion */}
          {current.type === 'complete' && (
            <div style={{ padding: '0', minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
              <div className="cc-overlay-center" style={{ padding: '0 32px', textAlign: 'center', maxWidth: 540 }}>
                {isArizona ? (
                  <>
                    {/* Arizona — You're In! */}
                    <svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 24 }}>
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.2, marginBottom: 16 }}>
                      You're In!
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text2, lineHeight: 1.7, marginBottom: 24 }}>
                      Your application has been received. The next step is scheduling your in-person interview at our Scottsdale studio.
                    </div>
                    <button style={{
                      width: '100%', padding: '18px 0', borderRadius: radius.card, background: '#FFFFFF', border: 'none',
                      fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, color: '#0D0D0D', letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', marginBottom: 12,
                    }}>
                      Schedule Interview
                    </button>
                    <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase' }}>
                      Season 18 — Now Enrolling
                    </div>
                  </>
                ) : isUndecided ? (
                  <>
                    {/* Undecided — Keep Going */}
                    <svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 24 }}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 16v-4m0-4h.01" />
                    </svg>
                    <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.2, marginBottom: 16 }}>
                      Keep Going
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text2, lineHeight: 1.7, marginBottom: 24 }}>
                      Curiosity is the first step. We saved your info and will reach out to learn more about what you're looking for. No pressure — just a conversation.
                    </div>
                    <div style={{
                      padding: 20, background: colors.surface, borderRadius: radius.card, marginBottom: 16, textAlign: 'left',
                    }}>
                      <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>
                        In the meantime
                      </div>
                      <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text2, lineHeight: 1.6 }}>
                        Follow us on Instagram to see what our students are doing, watch their transformations, and feel what the community is like from the outside.
                      </div>
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase' }}>
                      Season 18 — Still Time to Join
                    </div>
                  </>
                ) : (
                  <>
                    {/* Out of State — AIT Program */}
                    <svg width={56} height={56} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 24 }}>
                      <circle cx="12" cy="12" r="10" />
                      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                    </svg>
                    <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.5, lineHeight: 1.2, marginBottom: 16 }}>
                      Advanced Individual Training
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text2, lineHeight: 1.7, marginBottom: 24 }}>
                      We see you! Our AIT program is designed for out-of-state students who want Corella & Co training on their own schedule. Personalized 1-on-1 coaching with our instructors, virtual sessions, and guided self-study.
                    </div>
                    <div style={{
                      padding: 20, background: colors.surface, borderRadius: radius.card, marginBottom: 16, textAlign: 'left',
                    }}>
                      <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 8 }}>
                        What's Included
                      </div>
                      {['1-on-1 virtual coaching sessions', 'Personalized training curriculum', 'Video feedback on posing & runway', 'Access to Continuum Club community'].map((item, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <div style={{ width: 4, height: 4, borderRadius: '50%', background: colors.text2, flexShrink: 0 }} />
                          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, lineHeight: 1.5 }}>{item}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase' }}>
                      We'll be in touch to discuss your training plan
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

        </motion.div>
      </AnimatePresence>
    </div>
  )
}
