import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set, increment } from '../store'
import Celebration from '../components/Celebration'

const tabs = ['Wins', 'Seasons', 'News']

const defaultWins = [
  { id: 'w1', name: 'Jasmine R.', season: 14, avatar: P.t1, text: 'Booked my first paid editorial shoot this week. Corella gave me the confidence to pitch myself.', supports: 24, replies: 6, time: '2h ago' },
  { id: 'w2', name: 'Destiny M.', season: 12, avatar: P.t2, text: 'Walked into my interview with runway posture and spoke like I meant it. Got the offer on the spot.', supports: 31, replies: 8, time: '5h ago' },
  { id: 'w3', name: 'Aaliyah K.', season: 18, avatar: P.t3, text: 'Performed my first spoken word piece in front of 200 people. Hands were shaking but my voice was not.', supports: 45, replies: 12, time: '8h ago' },
  { id: 'w4', name: 'Sofia L.', season: 9, avatar: P.t4, text: 'Three years post-Corella and I still do my Before I Walk every single morning. It changed everything.', supports: 58, replies: 14, time: '1d ago' },
  { id: 'w5', name: 'Nyla T.', season: 14, avatar: P.t5, text: "Started teaching confidence workshops at my daughter's school. Full circle moment.", supports: 39, replies: 9, time: '1d ago' },
]

const seasons = [
  { number: 18, title: 'Current Season', members: 12, image: P.crowd, status: 'Active' },
  { number: 14, title: 'Spring 2025', members: 15, image: P.runway, status: 'Alumni' },
  { number: 12, title: 'Fall 2024', members: 14, image: P.training, status: 'Alumni' },
  { number: 9, title: 'Spring 2024', members: 16, image: P.event, status: 'Alumni' },
]

const announcements = [
  { title: 'Season 19 Applications Open', text: 'Know someone who needs this? Referral slots open for alumni. DM us for the link.', time: '1d ago', type: 'Opportunity' },
  { title: 'Studio Hours Extended', text: 'Open studio now available Saturdays 10am-4pm for all alumni members.', time: '3d ago', type: 'Update' },
  { title: 'Photographer Partnership', text: 'Discounted headshots with Alex Rivera Photography — exclusive for Continuum members.', time: '5d ago', type: 'Opportunity' },
  { title: 'Community Guidelines Refresh', text: 'We updated our win-sharing guidelines. Wins over likes. Always.', time: '1w ago', type: 'Update' },
]

export default function Community() {
  const [activeTab, setActiveTab] = useState('Wins')
  const [winText, setWinText] = useState('')
  const [userWins, setUserWins] = useState(() => get('userWins', []))
  const [supported, setSupported] = useState(() => get('supportedWins', {}))
  const [showCelebration, setShowCelebration] = useState(false)
  const [celebrationText, setCelebrationText] = useState('')

  const handlePostWin = () => {
    if (!winText.trim()) return
    const newWin = {
      id: 'u' + Date.now(),
      name: 'Brianna C.',
      season: 14,
      avatar: P.t1,
      text: winText.trim(),
      supports: 0,
      replies: 0,
      time: 'Just now',
    }
    const next = [newWin, ...userWins]
    setUserWins(next)
    set('userWins', next)
    increment('winsShared', 4)
    setCelebrationText(winText.trim())
    setShowCelebration(true)
    setWinText('')
  }

  const toggleSupport = (id) => {
    const next = { ...supported, [id]: !supported[id] }
    setSupported(next)
    set('supportedWins', next)
  }

  const allWins = [...userWins, ...defaultWins]

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      <AnimatePresence>
        {showCelebration && (
          <Celebration
            title={`"${celebrationText}"`}
            subtitle="Win shared with the community"
            icon={
              <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            }
            onDone={() => setShowCelebration(false)}
          />
        )}
      </AnimatePresence>
      <div style={{ padding: '56px 20px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
          Community
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 6 }}>
          Wins over likes. Support over competition.
        </div>
      </div>

      {/* Tab Switcher */}
      <div style={{ display: 'flex', margin: '20px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            flex: 1, padding: '10px 0', borderRadius: 12,
            background: activeTab === t ? colors.text : 'transparent',
            color: activeTab === t ? colors.bg : colors.text3,
            fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase',
            cursor: 'pointer', transition: 'all 0.2s',
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* Wins */}
      {activeTab === 'Wins' && (
        <div style={{ marginTop: 20 }}>
          {/* Share a Win */}
          <div style={{ margin: '0 16px 16px', background: colors.surface, borderRadius: radius.card, padding: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
              }}>
                <img src={P.t1} alt="You" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
              </div>
              <input
                value={winText}
                onChange={e => setWinText(e.target.value)}
                placeholder="Share a win..."
                onKeyDown={e => e.key === 'Enter' && handlePostWin()}
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: radius.pill, border: `1px solid ${colors.border}`,
                  background: 'transparent', fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text,
                  outline: 'none',
                }}
              />
              {winText.trim() && (
                <button onClick={handlePostWin} style={{
                  padding: '8px 14px', borderRadius: radius.pill, background: '#FFFFFF', color: '#0D0D0D', border: 'none',
                  fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  Post
                </button>
              )}
            </div>
          </div>

          {/* Win Cards */}
          {allWins.map((win, i) => {
            const isSup = supported[win.id]
            return (
              <motion.div key={win.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} style={{
                margin: '0 16px 12px', background: colors.surface, borderRadius: radius.card, padding: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                    <img src={win.avatar} alt={win.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text }}>{win.name}</div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, color: colors.text3, letterSpacing: 0.5 }}>
                      Season {win.season} · {win.time}
                    </div>
                  </div>
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text2, lineHeight: 1.6, marginBottom: 14 }}>
                  {win.text}
                </div>
                <div style={{ display: 'flex', gap: 16, borderTop: `1px solid ${colors.border}`, paddingTop: 12 }}>
                  <button onClick={() => toggleSupport(win.id)} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill={isSup ? '#FFFFFF' : 'none'} stroke={isSup ? '#FFFFFF' : colors.text3} strokeWidth={1.8}>
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                    <span style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: isSup ? colors.text : colors.text3 }}>
                      Support · {win.supports + (isSup ? 1 : 0)}
                    </span>
                  </button>
                  <button onClick={() => { /* Reply coming soon */ }} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
                    <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke={colors.text3} strokeWidth={1.8}>
                      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                    </svg>
                    <span style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: colors.text3 }}>
                      Reply · {win.replies}
                    </span>
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Seasons */}
      {activeTab === 'Seasons' && (
        <div style={{ marginTop: 20 }}>
          {seasons.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} style={{
              margin: '0 16px 16px', borderRadius: radius.card, overflow: 'hidden', position: 'relative', height: 160,
            }}>
              <img src={s.image} alt={s.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 100%)' }} />
              <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 36, fontWeight: 900, color: colors.text, lineHeight: 1 }}>S{s.number}</div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text2, marginTop: 2 }}>
                      {s.title} · {s.members} members
                    </div>
                  </div>
                  <div style={{
                    padding: '4px 12px', borderRadius: radius.pill,
                    background: s.status === 'Active' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
                    fontFamily: fonts.sans, fontSize: 10, fontWeight: 600,
                    color: s.status === 'Active' ? colors.text : colors.text3,
                    letterSpacing: 1, textTransform: 'uppercase',
                  }}>{s.status}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Announcements */}
      {activeTab === 'News' && (
        <div style={{ marginTop: 20 }}>
          {announcements.map((a, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} style={{
              margin: '0 16px 12px', background: colors.surface, borderRadius: radius.card, padding: 18,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
                <div style={{
                  padding: '3px 10px', borderRadius: radius.pill,
                  background: a.type === 'Opportunity' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.06)',
                  fontFamily: fonts.sans, fontSize: 10, fontWeight: 600,
                  color: a.type === 'Opportunity' ? colors.text : colors.text3,
                  letterSpacing: 1, textTransform: 'uppercase',
                }}>{a.type}</div>
                <span style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: colors.text3 }}>{a.time}</span>
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.2, marginBottom: 6 }}>{a.title}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, lineHeight: 1.5 }}>{a.text}</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
