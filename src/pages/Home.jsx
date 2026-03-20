import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set, increment } from '../store'
import GuidedFlow from '../components/GuidedFlow'
import useDesktop from '../hooks/useDesktop'

const moods = ['On Fire', 'Strong', 'Steady', 'Working On It', 'Gentle']

const allSparks = [
  { affirmation: '"This school got me through the darkest period of my life and gave me something to dream about."', source: '— Brianna Pettit, S9' },
  { affirmation: '"This program not only gives you the tools and skills necessary to succeed in the industry, but you are constantly surrounded by mentors who care about you."', source: '— Chris Lopez, S9' },
  { affirmation: '"Corella & Co was a game-changer for me. Their professional and structured program goes beyond just modeling."', source: '— Esmeralda Sierra, S10' },
  { affirmation: '"From building my posing confidence to having a family dedicated towards my growth; I cannot begin to thank them for their unconditional support."', source: '— Janny Nguyen, S8' },
  { affirmation: '"Defining the future of the arts by uplifting our youth and fueling their passions with values, vision and character."', source: '— Corella & Co Mission' },
]

const communityWins = [
  { name: 'Brianna Pettit', season: 'S9', avatar: P.t1, text: 'This school got me through the darkest period of my life and gave me something to dream about.' },
  { name: 'Chris Lopez', season: 'S9', avatar: P.t2, text: 'This program not only gives you the tools and skills necessary to succeed in the industry, but you are constantly surrounded by mentors who care about you.' },
]

const ritualSteps = [
  { title: 'Grounding', instruction: 'Feel both feet flat on the floor. Press down. You are here.', seconds: 10 },
  { title: 'Spine', instruction: 'Stack your spine. Crown of the head reaching up. Shoulders down and back.', seconds: 8 },
  { title: 'Breath', instruction: 'Inhale through the nose for 4 counts. Hold 4. Exhale 6.', seconds: 14 },
  { title: 'Eyes', instruction: 'Soften your gaze. Lift your chin slightly. Look forward, not down.', seconds: 8 },
  { title: 'Affirmation', instruction: 'Say it quietly or in your mind: "I walk like I belong everywhere I go."', seconds: 10 },
  { title: 'Walk', instruction: 'You are ready. Step forward with intention.', seconds: 6 },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

function RitualOverlay({ onClose }) {
  const [step, setStep] = useState(0)
  const [countdown, setCountdown] = useState(ritualSteps[0].seconds)

  const advanceStep = useCallback(() => {
    if (step < ritualSteps.length - 1) {
      const next = step + 1
      setStep(next)
      setCountdown(ritualSteps[next].seconds)
    } else {
      onClose()
    }
  }, [step, onClose])

  useEffect(() => {
    if (countdown <= 0) { advanceStep(); return }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, advanceStep])

  const current = ritualSteps[step]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={advanceStep}
      style={{
        position: 'fixed', inset: 0, zIndex: 9998,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      <img src={P.runway} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) brightness(0.3)',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />
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
      <div style={{ position: 'relative', zIndex: 1, padding: '0 32px', maxWidth: 430, textAlign: 'center' }}>
        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.4 }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, textTransform: 'uppercase', marginBottom: 16 }}>
              Step {step + 1} of {ritualSteps.length}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 20 }}>
              {current.title}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 32 }}>
              {current.instruction}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 48, fontWeight: 900, color: '#FFFFFF', lineHeight: 1, marginBottom: 40 }}>
              {countdown}
            </div>
          </motion.div>
        </AnimatePresence>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {ritualSteps.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i <= step ? '#FFFFFF' : 'rgba(255,255,255,0.2)', transition: 'background 0.3s' }} />
          ))}
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: 'rgba(255,255,255,0.25)', letterSpacing: 2, textTransform: 'uppercase', marginTop: 32 }}>
          Tap to skip
        </div>
      </div>
    </motion.div>
  )
}

const quickLinks = [
  { label: 'Journal', path: '/journal', icon: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm2 3h8m-8 3h6' },
  { label: 'Portfolio', path: '/portfolio', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { label: 'Benefits', path: '/benefits', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
  { label: 'Journey', path: '/journey', icon: 'M22 12l-4-4v3H3v2h15v3l4-4z' },
  { label: 'Mentorship', path: '/mentorship', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197' },
]

const weeklyStats = [
  { label: 'Sparks', valueKey: 'sparks' },
  { label: 'Refreshers', valueKey: 'refreshers' },
  { label: 'Shoots', valueKey: 'shoots' },
  { label: 'Wins Shared', valueKey: 'wins' },
]

export default function Home() {
  const navigate = useNavigate()
  const desktop = useDesktop()
  const [mood, setMood] = useState(() => get('todayMood', null))
  const [moodSaved, setMoodSaved] = useState(false)
  const [showRitual, setShowRitual] = useState(false)
  const [showSparkFlow, setShowSparkFlow] = useState(false)
  const [showWeeklyCheckin, setShowWeeklyCheckin] = useState(false)
  const [sparkDone, setSparkDone] = useState(() => get('sparkDone', false))
  const [spark] = useState(() => {
    const idx = get('sparkIdx', null)
    if (idx !== null) return allSparks[idx]
    const i = Math.floor(Math.random() * allSparks.length)
    set('sparkIdx', i)
    return allSparks[i]
  })
  const [streak] = useState(() => get('streak', 12))
  const [winsShared] = useState(() => get('winsShared', 4))

  const handleMood = (m) => {
    setMood(m)
    set('todayMood', m)
    // Save to mood history
    const history = get('moodHistory', [])
    const today = new Date().toLocaleDateString()
    const exists = history.find(h => h.date === today)
    if (!exists) {
      history.push({ date: today, mood: m, day: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][new Date().getDay()] })
      set('moodHistory', history)
    } else {
      const updated = history.map(h => h.date === today ? { ...h, mood: m } : h)
      set('moodHistory', updated)
    }
    setMoodSaved(true)
    setTimeout(() => setMoodSaved(false), 2000)
  }

  const handleSparkDone = (responses) => {
    setShowSparkFlow(false)
    setSparkDone(true)
    set('sparkDone', true)
    increment('sparksCompleted', 0)
    // Save reflection to journal if provided
    const reflection = responses && responses[2]
    if (reflection) {
      const entries = get('journalEntries', [])
      entries.unshift({
        id: Date.now(), date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mood: get('todayMood', 'Steady'), type: 'prompted', prompt: spark.affirmation,
        text: reflection, preview: reflection.slice(0, 120),
      })
      set('journalEntries', entries)
    }
  }

  const handleWeeklyCheckin = (responses) => {
    setShowWeeklyCheckin(false)
    const entries = get('journalEntries', [])
    const text = responses.filter(Boolean).join('\n\n')
    if (text) {
      entries.unshift({
        id: Date.now(), date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        mood: get('todayMood', 'Steady'), type: 'prompted', prompt: 'Weekly Check-In',
        text, preview: text.slice(0, 120),
      })
      set('journalEntries', entries)
    }
  }

  const handleRitualComplete = () => {
    setShowRitual(false)
    increment('ritualsCompleted', 0)
    // Update streak
    const newStreak = get('streak', 12) + 1
    set('streak', newStreak)
  }

  // ─── Overlays (shared between mobile and desktop) ───
  const overlays = (
    <AnimatePresence>
      {showRitual && <RitualOverlay onClose={handleRitualComplete} />}
      {showSparkFlow && (
        <GuidedFlow
          title="Morning Spark"
          bg={P.portrait}
          onClose={() => setShowSparkFlow(false)}
          onComplete={handleSparkDone}
          steps={[
            { title: 'Read Aloud', instruction: spark.affirmation.replace(/"/g, ''), seconds: 12 },
            { title: 'Sit With It', instruction: `Let those words land. ${spark.source}`, seconds: 10 },
            { title: 'Reflect', instruction: 'What does this spark mean to you right now?', input: true, placeholder: 'One line is enough...' },
          ]}
        />
      )}
      {showWeeklyCheckin && (
        <GuidedFlow
          title="Weekly Check-In"
          bg={P.studio}
          onClose={() => setShowWeeklyCheckin(false)}
          onComplete={handleWeeklyCheckin}
          steps={[
            { title: 'Highlight', instruction: 'What was your proudest moment this week?', input: true, placeholder: 'The moment that mattered most...' },
            { title: 'Growth', instruction: 'Where did you surprise yourself?', input: true, placeholder: 'Something you did differently...' },
            { title: 'Release', instruction: 'What are you letting go of before next week?', input: true, placeholder: 'Let it go...' },
            { title: 'Intention', instruction: 'Set one intention for the week ahead.', input: true, placeholder: 'Next week I will...' },
          ]}
        />
      )}
    </AnimatePresence>
  )

  // ─── DESKTOP LAYOUT ───
  if (desktop) {
    return (
      <div style={{ minHeight: '100vh' }}>
        {overlays}

        {/* Cover Banner */}
        <div style={{ position: 'relative', height: 200, overflow: 'hidden', width: '100%' }}>
          <img src={P.hero} alt="Corella" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%', filter: 'grayscale(100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.85) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 24, left: 40, right: 40, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 500, color: colors.text2, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
                {getGreeting()}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 36, fontWeight: 900, color: colors.text, letterSpacing: -0.5, textTransform: 'uppercase', lineHeight: 1.1 }}>
                Brianna
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 500, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 6 }}>
                Stay Sharp. Stay Balanced. Stay Ahead.
              </div>
            </div>
            <img src={P.logo} alt="Corella & Co" style={{ height: 36, opacity: 0.7 }} />
          </div>
        </div>

        {/* 3-Column Grid */}
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr 300px', gap: 32, paddingTop: 28, paddingBottom: 60 }}>

            {/* ─── LEFT COLUMN ─── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Streak Counter */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
                background: colors.surface, borderRadius: radius.card, padding: 24,
              }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 8 }}>
                  Current Streak
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
                  <span style={{ fontFamily: fonts.sans, fontSize: 48, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{streak}</span>
                  <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: colors.text2, textTransform: 'uppercase', letterSpacing: 1 }}>Days</span>
                </div>
                <div style={{ display: 'flex', gap: 4, justifyContent: 'center' }}>
                  {[...Array(7)].map((_, i) => (
                    <div key={i} style={{
                      width: 10, height: 36 + (i < 5 ? i * 5 : (6 - i) * 5), borderRadius: 5,
                      background: i < 5 ? colors.text : 'rgba(255,255,255,0.15)',
                    }} />
                  ))}
                </div>
              </motion.div>

              {/* Mood Check-in */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{
                background: colors.surface, borderRadius: radius.card, padding: 24,
              }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
                  How are you showing up today?
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {moods.map(m => (
                    <button key={m} onClick={() => handleMood(m)} style={{
                      padding: '10px 16px', borderRadius: radius.pill, textAlign: 'left',
                      border: `1px solid ${mood === m ? colors.text : colors.border}`,
                      background: mood === m ? colors.text : 'transparent',
                      color: mood === m ? colors.bg : colors.text2,
                      fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
                    }}>
                      {m}
                    </button>
                  ))}
                </div>
                <AnimatePresence>
                  {moodSaved && mood && (
                    <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{
                      marginTop: 12, padding: '10px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: radius.card,
                      fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text2, textAlign: 'center',
                    }}>
                      Logged: feeling {mood.toLowerCase()} today
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Weekly Stats */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{
                background: colors.surface, borderRadius: radius.card, padding: 24,
              }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 20 }}>
                  This Week
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  {[
                    { label: 'Sparks', value: String(get('sparksCompleted', 0) + 12) },
                    { label: 'Refreshers', value: '3' },
                    { label: 'Shoots', value: '1' },
                    { label: 'Wins Shared', value: String(winsShared) },
                  ].map((stat, i) => (
                    <div key={i} style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{stat.value}</div>
                      <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 6 }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* ─── CENTER COLUMN ─── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Before I Walk Button — prominent */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <button onClick={() => setShowRitual(true)} style={{
                  width: '100%', padding: '22px 32px', background: '#FFFFFF', color: '#0D0D0D', border: 'none',
                  borderRadius: radius.card, fontFamily: fonts.sans, fontSize: 17, fontWeight: 800, letterSpacing: 3,
                  textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  Before I Walk
                </button>
              </motion.div>

              {/* Daily Spark — wider card */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{
                borderRadius: radius.card, overflow: 'hidden', position: 'relative', height: 260,
              }}>
                <img src={P.portrait} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)' }} />
                <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 32 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase' }}>
                      Daily Spark
                    </div>
                    {sparkDone && (
                      <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase' }}>
                        Completed
                      </div>
                    )}
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 22, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.4, marginBottom: 10 }}>
                      {spark.affirmation}
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4, marginBottom: sparkDone ? 0 : 16 }}>
                      {spark.source}
                    </div>
                    {!sparkDone && (
                      <button onClick={() => setShowSparkFlow(true)} style={{
                        padding: '10px 28px', borderRadius: radius.pill, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
                        fontFamily: fonts.sans, fontSize: 12, fontWeight: 700, color: '#FFFFFF', letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
                      }}>
                        Begin Spark
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Community Wins Feed */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
                  Community Wins
                </div>
                {communityWins.map((win, i) => (
                  <div key={i} style={{ background: colors.surface, borderRadius: radius.card, padding: 24, marginBottom: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                      <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={win.avatar} alt={win.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                      </div>
                      <div>
                        <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 700, color: colors.text }}>{win.name}</div>
                        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase' }}>
                          Season {win.season.replace('S', '')} Alumni
                        </div>
                      </div>
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text2, lineHeight: 1.7 }}>{win.text}</div>
                  </div>
                ))}
              </motion.div>

              {/* Weekly Check-In Button */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <button onClick={() => setShowWeeklyCheckin(true)} style={{
                  width: '100%', padding: '18px 24px', background: colors.surface, border: `1px solid ${colors.border}`,
                  borderRadius: radius.card, fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, letterSpacing: 1.5,
                  textTransform: 'uppercase', color: colors.text2, cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  Weekly Check-In
                </button>
              </motion.div>
            </div>

            {/* ─── RIGHT COLUMN ─── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

              {/* Quick Links — single column */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
                  Your Space
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {quickLinks.map((link, i) => (
                    <button key={i} onClick={() => navigate(link.path)} style={{
                      background: colors.surface, borderRadius: radius.card, padding: '14px 16px',
                      display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
                    }}>
                      <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={colors.text2} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <path d={link.icon} />
                      </svg>
                      <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                        {link.label}
                      </span>
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Coming Up Event */}
              <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
                  Coming Up
                </div>
                <div onClick={() => navigate('/events')} style={{ position: 'relative', borderRadius: radius.card, overflow: 'hidden', height: 220, cursor: 'pointer' }}>
                  <img src={P.event} alt="Next Event" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }} />
                  <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                    <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(255,255,255,0.15)', borderRadius: radius.pill, fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
                      Refresher Workshop
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.3 }}>
                      Posture & Presence Lab
                    </div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, color: colors.text2, marginTop: 4 }}>
                      Apr 12 — 5 days away — 8 spots left
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ─── MOBILE LAYOUT (unchanged) ───
  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {overlays}

      {/* Hero */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img src={P.hero} alt="Corella" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 500, color: colors.text2, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
            {getGreeting()}
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 32, fontWeight: 900, color: colors.text, letterSpacing: -0.5, textTransform: 'uppercase', lineHeight: 1.1 }}>
            Brianna
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginTop: 8 }}>
            Stay Sharp. Stay Balanced. Stay Ahead.
          </div>
        </div>
        <img src={P.logo} alt="Corella & Co" style={{ position: 'absolute', top: 16, right: 16, height: 32, opacity: 0.7 }} />
      </div>

      {/* Streak Counter */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
        margin: '20px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 4 }}>
            Current Streak
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{ fontFamily: fonts.sans, fontSize: 40, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{streak}</span>
            <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: colors.text2, textTransform: 'uppercase', letterSpacing: 1 }}>Days</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{
              width: 8, height: 32 + (i < 5 ? i * 4 : (6 - i) * 4), borderRadius: 4,
              background: i < 5 ? colors.text : 'rgba(255,255,255,0.15)',
            }} />
          ))}
        </div>
      </motion.div>

      {/* Daily Spark — Photo-backed hero card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{
        margin: '16px 16px 0', borderRadius: radius.card, overflow: 'hidden', position: 'relative', height: 220,
      }}>
        <img src={P.portrait} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: 24 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase' }}>
              Daily Spark
            </div>
            {sparkDone && (
              <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: 1, textTransform: 'uppercase' }}>
                Completed
              </div>
            )}
          </div>
          <div>
            <div style={{ fontFamily: fonts.sans, fontSize: 20, fontWeight: 700, color: '#FFFFFF', lineHeight: 1.4, marginBottom: 8 }}>
              {spark.affirmation}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.4)', lineHeight: 1.4, marginBottom: sparkDone ? 0 : 12 }}>
              {spark.source}
            </div>
            {!sparkDone && (
              <button onClick={() => setShowSparkFlow(true)} style={{
                padding: '8px 20px', borderRadius: radius.pill, background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.3)',
                fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: '#FFFFFF', letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
              }}>
                Begin Spark
              </button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Before I Walk Button */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ margin: '16px 16px 0' }}>
        <button onClick={() => setShowRitual(true)} style={{
          width: '100%', padding: '18px 24px', background: '#FFFFFF', color: '#0D0D0D', border: 'none',
          borderRadius: radius.card, fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, letterSpacing: 2,
          textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
        }}>
          Before I Walk
        </button>
      </motion.div>

      {/* Mood Check-in */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{
        margin: '24px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 20,
      }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          How are you showing up today?
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {moods.map(m => (
            <button key={m} onClick={() => handleMood(m)} style={{
              padding: '8px 16px', borderRadius: radius.pill,
              border: `1px solid ${mood === m ? colors.text : colors.border}`,
              background: mood === m ? colors.text : 'transparent',
              color: mood === m ? colors.bg : colors.text2,
              fontFamily: fonts.sans, fontSize: 13, fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s',
            }}>
              {m}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mood Saved Confirmation */}
      <AnimatePresence>
        {moodSaved && mood && (
          <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} style={{
            margin: '8px 16px 0', padding: '10px 16px', background: 'rgba(255,255,255,0.06)', borderRadius: radius.card,
            fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text2, textAlign: 'center',
          }}>
            Logged: feeling {mood.toLowerCase()} today
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Links */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }} style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          Your Space
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {quickLinks.map((link, i) => (
            <button key={i} onClick={() => navigate(link.path)} style={{
              background: colors.surface, borderRadius: radius.card, padding: '16px 14px',
              display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', border: 'none', transition: 'all 0.2s',
            }}>
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={colors.text2} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d={link.icon} />
              </svg>
              <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.5 }}>
                {link.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Next Event */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          Coming Up
        </div>
        <div onClick={() => navigate('/events')} style={{ position: 'relative', borderRadius: radius.card, overflow: 'hidden', height: 180, cursor: 'pointer' }}>
          <img src={P.event} alt="Next Event" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)' }} />
          <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
            <div style={{ display: 'inline-block', padding: '4px 10px', background: 'rgba(255,255,255,0.15)', borderRadius: radius.pill, fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
              Refresher Workshop
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 18, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.3 }}>
              Posture & Presence Lab
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text2, marginTop: 4 }}>
              Apr 12 — 5 days away — 8 spots left
            </div>
          </div>
        </div>
      </motion.div>

      {/* Community Wins */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ margin: '28px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
          Community Wins
        </div>
        {communityWins.map((win, i) => (
          <div key={i} style={{ background: colors.surface, borderRadius: radius.card, padding: 16, marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={win.avatar} alt={win.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
              </div>
              <div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text }}>{win.name}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase' }}>
                  Season {win.season.replace('S', '')} Alumni
                </div>
              </div>
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text2, lineHeight: 1.6 }}>{win.text}</div>
          </div>
        ))}
      </motion.div>

      {/* Weekly Recap */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} style={{
        margin: '16px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 20,
      }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
          This Week
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[
            { label: 'Sparks', value: String(get('sparksCompleted', 0) + 12) },
            { label: 'Refreshers', value: '3' },
            { label: 'Shoots', value: '1' },
            { label: 'Wins Shared', value: String(winsShared) },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 24, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{stat.value}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Weekly Check-In */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{ margin: '16px 16px 0' }}>
        <button onClick={() => setShowWeeklyCheckin(true)} style={{
          width: '100%', padding: '16px 24px', background: colors.surface, border: `1px solid ${colors.border}`,
          borderRadius: radius.card, fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 1.5,
          textTransform: 'uppercase', color: colors.text2, cursor: 'pointer', transition: 'all 0.2s',
        }}>
          Weekly Check-In
        </button>
      </motion.div>
    </div>
  )
}
