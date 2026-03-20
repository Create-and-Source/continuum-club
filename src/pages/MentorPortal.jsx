import { useState } from 'react'
import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set } from '../store'

const mentees = [
  { name: 'Brianna Cole', season: 14, avatar: P.t1, streak: 12, mood: 'Strong', lastCheckin: 'Mar 15', goals: 4, goalsComplete: 1 },
  { name: 'Jasmine Rivera', season: 14, avatar: P.t2, streak: 8, mood: 'On Fire', lastCheckin: 'Mar 14', goals: 3, goalsComplete: 2 },
  { name: 'Aaliyah King', season: 18, avatar: P.t3, streak: 5, mood: 'Steady', lastCheckin: 'Mar 12', goals: 5, goalsComplete: 0 },
  { name: 'Nyla Thomas', season: 14, avatar: P.t5, streak: 15, mood: 'On Fire', lastCheckin: 'Mar 16', goals: 3, goalsComplete: 3 },
]

export default function MentorPortal() {
  const [selectedMentee, setSelectedMentee] = useState(null)
  const [noteText, setNoteText] = useState('')
  const [mentorNotes, setMentorNotes] = useState(() => get('mentorPortalNotes', {}))

  const addNote = (menteeName) => {
    if (!noteText.trim()) return
    const key = menteeName.replace(/\s/g, '_')
    const notes = mentorNotes[key] || []
    notes.unshift({ text: noteText.trim(), date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) })
    const next = { ...mentorNotes, [key]: notes }
    setMentorNotes(next)
    set('mentorPortalNotes', next)
    setNoteText('')
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Header */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img src={P.training} alt="Mentor Portal" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
            Mentor Portal
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 6 }}>
            Your mentees at a glance
          </div>
        </div>
      </div>

      {/* Overview Stats */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
        margin: '20px 16px 0', display: 'flex', gap: 10,
      }}>
        {[
          { value: String(mentees.length), label: 'Mentees' },
          { value: String(mentees.reduce((s, m) => s + m.goalsComplete, 0)), label: 'Goals Met' },
          { value: String(Math.round(mentees.reduce((s, m) => s + m.streak, 0) / mentees.length)), label: 'Avg Streak' },
        ].map((stat, i) => (
          <div key={i} style={{ flex: 1, background: colors.surface, borderRadius: radius.card, padding: '16px 8px', textAlign: 'center' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 24, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Mentee List */}
      <div style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          Your Mentees
        </div>

        {mentees.map((m, i) => {
          const isSelected = selectedMentee === m.name
          const key = m.name.replace(/\s/g, '_')
          const notes = mentorNotes[key] || []

          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.05 }}>
              {/* Mentee Card */}
              <div onClick={() => setSelectedMentee(isSelected ? null : m.name)} style={{
                background: colors.surface, borderRadius: isSelected ? `${radius.card}px ${radius.card}px 0 0` : radius.card,
                padding: 14, marginBottom: isSelected ? 0 : 10, cursor: 'pointer',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                  <img src={m.avatar} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 700, color: colors.text }}>{m.name}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: colors.text3 }}>
                    S{m.season} · {m.streak} day streak · Mood: {m.mood}
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 900, color: colors.text, lineHeight: 1 }}>
                    {m.goalsComplete}/{m.goals}
                  </div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 9, fontWeight: 500, color: colors.text3, textTransform: 'uppercase', letterSpacing: 0.5 }}>Goals</div>
                </div>
              </div>

              {/* Expanded Detail */}
              {isSelected && (
                <div style={{
                  background: colors.surface, borderRadius: `0 0 ${radius.card}px ${radius.card}px`,
                  borderTop: `1px solid ${colors.border}`, padding: 16, marginBottom: 10,
                }}>
                  {/* Quick Stats */}
                  <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                    {[
                      { label: 'Last Check-In', value: m.lastCheckin },
                      { label: 'Current Mood', value: m.mood },
                      { label: 'Streak', value: `${m.streak} days` },
                    ].map((s, si) => (
                      <div key={si} style={{ flex: 1, padding: '10px 6px', background: 'rgba(255,255,255,0.04)', borderRadius: radius.sm, textAlign: 'center' }}>
                        <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text }}>{s.value}</div>
                        <div style={{ fontFamily: fonts.sans, fontSize: 9, fontWeight: 500, color: colors.text3, textTransform: 'uppercase', letterSpacing: 0.5, marginTop: 2 }}>{s.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* Add Note */}
                  <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
                    Leave a Note
                  </div>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                    <input value={noteText} onChange={e => setNoteText(e.target.value)} placeholder="Note for this mentee..."
                      onKeyDown={e => e.key === 'Enter' && addNote(m.name)}
                      style={{
                        flex: 1, padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`,
                        borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 13, color: colors.text, outline: 'none',
                      }} />
                    <button onClick={() => addNote(m.name)} style={{
                      padding: '10px 16px', borderRadius: radius.sm, background: noteText.trim() ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
                      color: noteText.trim() ? '#0D0D0D' : colors.text3, border: 'none',
                      fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
                    }}>Add</button>
                  </div>

                  {/* Past Notes */}
                  {notes.length > 0 && (
                    <div>
                      {notes.map((n, ni) => (
                        <div key={ni} style={{ padding: '8px 0', borderTop: ni > 0 ? `1px solid ${colors.border}` : 'none' }}>
                          <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: colors.text3, marginBottom: 4 }}>{n.date}</div>
                          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, lineHeight: 1.5 }}>{n.text}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
