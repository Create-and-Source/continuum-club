import { useState } from 'react'
import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set } from '../store'

const defaultGoals = [
  { id: 'g1', title: 'Book 3 paid shoots by June', target: 3 },
  { id: 'g2', title: 'Complete Communication track', target: 4 },
  { id: 'g3', title: 'Attend 2 Network Nights', target: 2 },
  { id: 'g4', title: 'Build portfolio to 20 images', target: 20 },
]

const checkIns = [
  { id: 'ci1', date: 'Mar 22', time: '11:00 AM', type: '1-on-1', mentor: 'Corella', status: 'Upcoming' },
  { id: 'ci2', date: 'Mar 15', time: '11:00 AM', type: '1-on-1', mentor: 'Corella', status: 'Completed' },
  { id: 'ci3', date: 'Mar 8', time: '2:00 PM', type: 'Group', mentor: 'Corella', status: 'Completed' },
  { id: 'ci4', date: 'Mar 1', time: '11:00 AM', type: '1-on-1', mentor: 'Corella', status: 'Completed' },
]

const mentorNotes = [
  { date: 'Mar 15', note: 'Brianna is making incredible progress with her posture work. Her confidence in front of the camera has transformed. Next focus: vocal projection and interview prep.' },
  { date: 'Mar 8', note: 'Group session went well. Brianna helped two newer members with their walk — natural mentorship instincts showing up. Consider mentor badge.' },
  { date: 'Mar 1', note: 'Discussed long-term career goals. Brianna wants to transition into editorial modeling. Recommended building out her headshot portfolio and attending the next content creation day.' },
]

const defaultPrompts = [
  { id: 'p1', date: 'This Week', prompt: 'What is one thing you did this week that surprised even yourself?' },
  { id: 'p2', date: 'Last Week', prompt: 'Who in the community inspired you recently and why?' },
  { id: 'p3', date: '2 Weeks Ago', prompt: 'Describe a moment where you felt truly seen.' },
]

export default function Mentorship() {
  const [activeTab, setActiveTab] = useState('Goals')
  const [goalProgress, setGoalProgress] = useState(() => get('goalProgress', { g1: 1, g2: 3, g3: 1, g4: 11 }))
  const [promptResponses, setPromptResponses] = useState(() => get('promptResponses', { p2: true, p3: true }))
  const [respondingTo, setRespondingTo] = useState(null)
  const [responseText, setResponseText] = useState('')
  const [checkinStatus, setCheckinStatus] = useState(() => get('checkinStatus', {}))

  const tabs = ['Goals', 'Check-Ins', 'Notes', 'Prompts']

  const incrementGoal = (id, target) => {
    const current = goalProgress[id] || 0
    if (current >= target) return
    const next = { ...goalProgress, [id]: current + 1 }
    setGoalProgress(next)
    set('goalProgress', next)
  }

  const submitResponse = (promptId) => {
    if (!responseText.trim()) return
    const next = { ...promptResponses, [promptId]: true }
    setPromptResponses(next)
    set('promptResponses', next)
    // Also save to journal
    const entries = get('journalEntries', [])
    const prompt = defaultPrompts.find(p => p.id === promptId)
    entries.unshift({
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      mood: get('todayMood', 'Steady'),
      type: 'prompted',
      prompt: prompt?.prompt || '',
      text: responseText.trim(),
      preview: responseText.trim().slice(0, 120),
    })
    set('journalEntries', entries)
    setRespondingTo(null)
    setResponseText('')
  }

  const markCheckinDone = (id) => {
    const next = { ...checkinStatus, [id]: 'Completed' }
    setCheckinStatus(next)
    set('checkinStatus', next)
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <img src={P.community} alt="Mentorship" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>Mentorship</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 6 }}>Your private space with your mentor</div>
        </div>
      </div>

      {/* Mentor Card */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
        margin: '20px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 16, display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{ width: 52, height: 52, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
          <img src={P.t4} alt="Corella" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 800, color: colors.text, textTransform: 'uppercase' }}>Corella</div>
          <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3, marginTop: 2 }}>Your Mentor · Since Season 14</div>
        </div>
        <button onClick={() => setActiveTab('Check-Ins')} style={{
          padding: '8px 16px', borderRadius: radius.pill, border: `1px solid ${colors.border}`, background: 'transparent',
          fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text2, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
        }}>Schedule</button>
      </motion.div>

      <div style={{ display: 'flex', margin: '20px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            flex: 1, padding: '10px 0', borderRadius: 12,
            background: activeTab === t ? colors.text : 'transparent', color: activeTab === t ? colors.bg : colors.text3,
            fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>

      {activeTab === 'Goals' && (
        <div style={{ marginTop: 20 }}>
          {defaultGoals.map((g, i) => {
            const current = goalProgress[g.id] || 0
            const pct = Math.min((current / g.target) * 100, 100)
            const done = current >= g.target
            return (
              <motion.div key={g.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} style={{
                margin: '0 16px 12px', background: colors.surface, borderRadius: radius.card, padding: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text, lineHeight: 1.4, flex: 1 }}>{g.title}</div>
                  <span style={{ fontFamily: fonts.sans, fontSize: 18, fontWeight: 900, color: colors.text, marginLeft: 12 }}>{Math.round(pct)}%</span>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', marginBottom: 10 }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                    style={{ height: '100%', background: '#FFFFFF', borderRadius: 2 }} />
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: colors.text3 }}>{current} / {g.target}</span>
                  {!done && (
                    <button onClick={() => incrementGoal(g.id, g.target)} style={{
                      padding: '6px 14px', borderRadius: radius.pill, background: 'rgba(255,255,255,0.1)', border: 'none',
                      fontFamily: fonts.sans, fontSize: 10, fontWeight: 700, color: colors.text2, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
                    }}>+1 Progress</button>
                  )}
                  {done && <span style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text2, letterSpacing: 1, textTransform: 'uppercase' }}>Complete</span>}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {activeTab === 'Check-Ins' && (
        <div style={{ marginTop: 20 }}>
          {checkIns.map((c, i) => {
            const status = checkinStatus[c.id] || c.status
            return (
              <motion.div key={c.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} style={{
                margin: '0 16px 12px', background: colors.surface, borderRadius: radius.card, padding: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text }}>{c.date} · {c.time}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3, marginTop: 3 }}>{c.type} with {c.mentor}</div>
                </div>
                {status === 'Upcoming' ? (
                  <button onClick={() => markCheckinDone(c.id)} style={{
                    padding: '6px 14px', borderRadius: radius.pill, background: 'rgba(255,255,255,0.12)', border: 'none',
                    fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
                  }}>Check In</button>
                ) : (
                  <div style={{
                    padding: '4px 12px', borderRadius: radius.pill, background: 'rgba(255,255,255,0.05)',
                    fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase',
                  }}>{status}</div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}

      {activeTab === 'Notes' && (
        <div style={{ marginTop: 20 }}>
          {mentorNotes.map((n, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} style={{
              margin: '0 16px 12px', background: colors.surface, borderRadius: radius.card, padding: 16,
            }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>{n.date} — Mentor Note</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text2, lineHeight: 1.7 }}>{n.note}</div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'Prompts' && (
        <div style={{ marginTop: 20 }}>
          {defaultPrompts.map((p, i) => {
            const responded = promptResponses[p.id]
            const isResponding = respondingTo === p.id
            return (
              <motion.div key={p.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} style={{
                margin: '0 16px 12px', background: colors.surface, borderRadius: radius.card, padding: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                  <span style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase' }}>{p.date}</span>
                  <span style={{
                    padding: '2px 8px', borderRadius: radius.pill, background: responded ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
                    fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: responded ? colors.text3 : colors.text, letterSpacing: 0.5, textTransform: 'uppercase',
                  }}>{responded ? 'Responded' : 'New'}</span>
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 600, color: colors.text, lineHeight: 1.5 }}>{p.prompt}</div>
                {!responded && !isResponding && (
                  <button onClick={() => setRespondingTo(p.id)} style={{
                    marginTop: 12, padding: '8px 20px', borderRadius: radius.pill, background: '#FFFFFF', color: '#0D0D0D', border: 'none',
                    fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
                  }}>Respond</button>
                )}
                {isResponding && (
                  <div style={{ marginTop: 12 }}>
                    <textarea value={responseText} onChange={e => setResponseText(e.target.value)} placeholder="Write your response..."
                      style={{ width: '100%', minHeight: 100, background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`, borderRadius: radius.sm, padding: 12,
                        fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text, lineHeight: 1.6, resize: 'none', outline: 'none' }} />
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button onClick={() => { setRespondingTo(null); setResponseText('') }} style={{
                        padding: '8px 16px', borderRadius: radius.pill, border: `1px solid ${colors.border}`, background: 'transparent',
                        fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, cursor: 'pointer', textTransform: 'uppercase', letterSpacing: 0.5,
                      }}>Cancel</button>
                      <button onClick={() => submitResponse(p.id)} style={{
                        padding: '8px 20px', borderRadius: radius.pill, background: responseText.trim() ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
                        color: responseText.trim() ? '#0D0D0D' : colors.text3, border: 'none',
                        fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', cursor: responseText.trim() ? 'pointer' : 'default',
                      }}>Submit</button>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      )}
    </div>
  )
}
