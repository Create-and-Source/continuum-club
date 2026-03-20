import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set, clearAll } from '../store'
import Celebration from '../components/Celebration'

const milestones = [
  { id: 'first_walk', title: 'First Walk', check: () => get('ritualsCompleted', 0) >= 1 },
  { id: '7_streak', title: '7-Day Streak', check: () => get('streak', 12) >= 7 },
  { id: 'stage_ready', title: 'Stage Ready', check: () => get('completedSessions', {}).rp4 },
  { id: 'win_sharer', title: 'Win Sharer', check: () => get('userWins', []).length >= 1 },
  { id: 'journal_5', title: 'Journaler', check: () => get('journalEntries', []).length >= 3 },
  { id: '30_streak', title: '30-Day Streak', check: () => get('streak', 12) >= 30 },
]

export default function Profile() {
  const navigate = useNavigate()
  const [unlockedBadge, setUnlockedBadge] = useState(null)

  // Check for newly unlocked badges on mount
  useState(() => {
    const seen = get('seenBadges', [])
    for (const m of milestones) {
      if (m.check() && !seen.includes(m.id)) {
        setUnlockedBadge(m)
        set('seenBadges', [...seen, m.id])
        break
      }
    }
  })

  const [settings, setSettings] = useState(() => get('notifSettings', {
    sparkTime: '7:30 AM',
    eventReminders: '1 day before',
    communityNotifs: 'Wins only',
  }))

  const sparkOptions = ['6:00 AM', '7:00 AM', '7:30 AM', '8:00 AM', '9:00 AM']
  const eventOptions = ['1 hour before', '1 day before', '3 days before']
  const communityOptions = ['All', 'Wins only', 'Off']

  const cycleSetting = (key, options) => {
    const current = settings[key]
    const idx = options.indexOf(current)
    const next = options[(idx + 1) % options.length]
    const updated = { ...settings, [key]: next }
    setSettings(updated)
    set('notifSettings', updated)
  }

  const sessionsCompleted = get('sessionsCompleted', 0) + Object.keys(get('completedSessions', {})).length
  const streak = get('streak', 12)
  const shoots = Object.values(get('eventRsvps', {})).filter(Boolean).length
  const wins = get('userWins', []).length + 4

  const handleReset = () => {
    clearAll()
    window.location.reload()
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      <AnimatePresence>
        {unlockedBadge && (
          <Celebration
            title={unlockedBadge.title}
            subtitle="Badge unlocked"
            icon={
              <div style={{ width: 64, height: 64, borderRadius: '50%', border: '3px solid #FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width={28} height={28} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
            }
            onDone={() => setUnlockedBadge(null)}
            duration={3000}
          />
        )}
      </AnimatePresence>
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <img src={P.portrait} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(13,13,13,1) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
          <div style={{ width: 72, height: 72, borderRadius: '50%', overflow: 'hidden', border: '3px solid rgba(255,255,255,0.2)', flexShrink: 0 }}>
            <img src={P.t1} alt="Brianna" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
          </div>
          <div>
            <div style={{ fontFamily: fonts.sans, fontSize: 26, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>Brianna Cole</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase', marginTop: 4 }}>Season 14 Alumni · Scottsdale, AZ</div>
          </div>
        </div>
        <img src={P.logo} alt="Corella & Co" style={{ position: 'absolute', top: 16, right: 16, height: 28, opacity: 0.5 }} />
      </div>

      {/* Stats */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ margin: '20px 16px 0', display: 'flex', gap: 12 }}>
        {[
          { value: String(47 + sessionsCompleted), label: 'Sessions' },
          { value: String(streak), label: 'Day Streak' },
          { value: String(shoots), label: 'RSVPs' },
          { value: String(wins), label: 'Wins' },
        ].map((stat, i) => (
          <div key={i} style={{ flex: 1, background: colors.surface, borderRadius: radius.card, padding: '16px 8px', textAlign: 'center' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 22, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Membership */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ margin: '20px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 18 }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>Membership</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 800, color: colors.text, textTransform: 'uppercase' }}>Continuum Club</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3, marginTop: 3 }}>Active since Jan 2026</div>
          </div>
          <button onClick={() => navigate('/benefits')} style={{
            padding: '6px 14px', borderRadius: radius.pill, background: 'rgba(255,255,255,0.12)', border: 'none',
            fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
          }}>View Benefits</button>
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ margin: '20px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>Badges</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {milestones.map((b, i) => {
            const earned = b.check()
            return (
              <div key={i} style={{
                padding: '8px 14px', borderRadius: radius.pill,
                border: `1px solid ${earned ? 'rgba(255,255,255,0.25)' : colors.border}`,
                background: earned ? 'rgba(255,255,255,0.08)' : 'transparent',
                opacity: earned ? 1 : 0.4, display: 'flex', alignItems: 'center', gap: 6,
              }}>
                {earned && (
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
                <span style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: earned ? colors.text : colors.text3, letterSpacing: 0.5, textTransform: 'uppercase' }}>{b.title}</span>
              </div>
            )
          })}
        </div>
      </motion.div>

      {/* Quick Links */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>Quick Links</div>
        {[
          { label: 'Journal', path: '/journal' },
          { label: 'Portfolio', path: '/portfolio' },
          { label: 'Mentorship', path: '/mentorship' },
          { label: 'Journey', path: '/journey' },
          { label: 'About Corella & Co', path: '/about' },
          { label: 'Apply', path: '/apply' },
          { label: 'Contact', path: '/contact' },
        ].map((link, i) => (
          <button key={i} onClick={() => navigate(link.path)} style={{
            width: '100%', background: colors.surface,
            borderRadius: i === 0 ? `${radius.card}px ${radius.card}px 0 0` : i === 6 ? `0 0 ${radius.card}px ${radius.card}px` : 0,
            padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: i < 6 ? `1px solid ${colors.border}` : 'none', cursor: 'pointer', border: 'none',
            borderBottomStyle: i < 6 ? 'solid' : 'none', borderBottomWidth: i < 6 ? 1 : 0, borderBottomColor: colors.border,
          }}>
            <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 600, color: colors.text }}>{link.label}</span>
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.text3} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        ))}
      </motion.div>

      {/* Settings */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>Notifications</div>
        {[
          { label: 'Daily Spark', key: 'sparkTime', options: sparkOptions },
          { label: 'Event Reminders', key: 'eventReminders', options: eventOptions },
          { label: 'Community', key: 'communityNotifs', options: communityOptions },
        ].map((s, i) => (
          <button key={i} onClick={() => cycleSetting(s.key, s.options)} style={{
            width: '100%', background: colors.surface, border: 'none',
            borderRadius: i === 0 ? `${radius.card}px ${radius.card}px 0 0` : i === 2 ? `0 0 ${radius.card}px ${radius.card}px` : 0,
            padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            borderBottom: i < 2 ? `1px solid ${colors.border}` : 'none', cursor: 'pointer',
            borderBottomStyle: i < 2 ? 'solid' : 'none', borderBottomWidth: i < 2 ? 1 : 0, borderBottomColor: colors.border,
          }}>
            <span style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 500, color: colors.text }}>{s.label}</span>
            <span style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text3 }}>{settings[s.key]}</span>
          </button>
        ))}
      </motion.div>

      {/* Staff Access */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.33 }} style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>Staff</div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => navigate('/admin')} style={{
            flex: 1, padding: '16px 0', borderRadius: radius.card, background: colors.surface, border: 'none',
            fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
          }}>Admin</button>
          <button onClick={() => navigate('/mentor-portal')} style={{
            flex: 1, padding: '16px 0', borderRadius: radius.card, background: colors.surface, border: 'none',
            fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
          }}>Mentor Portal</button>
        </div>
      </motion.div>

      {/* Reset */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }} style={{ margin: '24px 16px 0' }}>
        <button onClick={handleReset} style={{
          width: '100%', padding: '14px 0', borderRadius: radius.card, border: `1px solid ${colors.border}`, background: 'transparent',
          fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
        }}>
          Reset Demo Data
        </button>
      </motion.div>
    </div>
  )
}
