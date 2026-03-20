import { useState } from 'react'
import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set } from '../store'

const defaultMembers = [
  { name: 'Brianna Cole', season: 14, status: 'Active', streak: 12, sessions: 47, avatar: P.t1, mood: 'Strong' },
  { name: 'Jasmine Rivera', season: 14, status: 'Active', streak: 8, sessions: 38, avatar: P.t2, mood: 'On Fire' },
  { name: 'Destiny Mitchell', season: 12, status: 'Active', streak: 22, sessions: 64, avatar: P.t3, mood: 'Steady' },
  { name: 'Aaliyah King', season: 18, status: 'Active', streak: 5, sessions: 12, avatar: P.t4, mood: 'On Fire' },
  { name: 'Sofia Lopez', season: 9, status: 'Inactive', streak: 0, sessions: 89, avatar: P.t5, mood: 'Gentle' },
  { name: 'Nyla Thomas', season: 14, status: 'Active', streak: 15, sessions: 41, avatar: P.t1, mood: 'Strong' },
]

const defaultEvents = [
  { title: 'Posture & Presence Lab', date: 'Apr 12', type: 'Refresher', rsvps: 8, capacity: 12 },
  { title: 'Headshot Marathon', date: 'Apr 19', type: 'Shoot', rsvps: 4, capacity: 8 },
  { title: 'Reel Creation Workshop', date: 'Apr 26', type: 'Content', rsvps: 12, capacity: 16 },
  { title: 'Alumni Mixer', date: 'May 3', type: 'Network', rsvps: 6, capacity: 24 },
]

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const applications = get('applications', [])
  const referrals = get('referrals', [])
  const contactMessages = get('contactMessages', [])
  const [appStatuses, setAppStatuses] = useState(() => get('appStatuses', {}))

  const activeMembers = defaultMembers.filter(m => m.status === 'Active').length
  const totalSessions = defaultMembers.reduce((s, m) => s + m.sessions, 0)
  const avgStreak = Math.round(defaultMembers.filter(m => m.status === 'Active').reduce((s, m) => s + m.streak, 0) / activeMembers)

  const updateAppStatus = (idx, status) => {
    const next = { ...appStatuses, [idx]: status }
    setAppStatuses(next)
    set('appStatuses', next)
  }

  const tabs = ['Dashboard', 'Members', 'Events', 'Apps', 'Messages']

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Header */}
      <div style={{ padding: '56px 20px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
              Admin
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 6 }}>
              Continuum Club Management
            </div>
          </div>
          <img src={P.logo} alt="Corella" style={{ height: 28, opacity: 0.5 }} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 0, margin: '20px 16px 0', overflowX: 'auto' }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            padding: '10px 14px', borderRadius: 0, background: 'none', border: 'none',
            borderBottom: `2px solid ${activeTab === t ? '#FFFFFF' : 'transparent'}`,
            fontFamily: fonts.sans, fontSize: 11, fontWeight: activeTab === t ? 700 : 500,
            color: activeTab === t ? colors.text : colors.text3,
            letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0,
          }}>{t}</button>
        ))}
      </div>

      {/* Dashboard */}
      {activeTab === 'Dashboard' && (
        <div style={{ marginTop: 20 }}>
          {/* Key Metrics */}
          <div style={{ margin: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { value: String(activeMembers), label: 'Active Members', sub: `${defaultMembers.length} total` },
              { value: String(applications.length), label: 'Applications', sub: applications.length > 0 ? `${applications.filter((_, i) => !appStatuses[i]).length} pending` : 'None yet' },
              { value: String(avgStreak), label: 'Avg Streak', sub: 'days' },
              { value: String(totalSessions), label: 'Total Sessions', sub: 'all members' },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }} style={{
                background: colors.surface, borderRadius: radius.card, padding: 18,
              }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{stat.value}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text2, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 6 }}>{stat.label}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: colors.text3, marginTop: 2 }}>{stat.sub}</div>
              </motion.div>
            ))}
          </div>

          {/* Season Info */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{
            margin: '16px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 18,
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <div>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>Current Season</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 32, fontWeight: 900, color: colors.text, lineHeight: 1 }}>18</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>Enrollment</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 800, color: colors.text }}>Open</div>
            </div>
          </motion.div>

          {/* Recent Activity */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ margin: '20px 16px 0' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Member Moods Today</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {defaultMembers.filter(m => m.status === 'Active').map((m, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 8, background: colors.surface, borderRadius: radius.pill, padding: '6px 12px 6px 6px',
                }}>
                  <div style={{ width: 24, height: 24, borderRadius: '50%', overflow: 'hidden' }}>
                    <img src={m.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                  </div>
                  <span style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, color: colors.text2 }}>{m.name.split(' ')[0]}</span>
                  <span style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3 }}>{m.mood}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Upcoming Events */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ margin: '20px 16px 0' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Upcoming Events</div>
            {defaultEvents.slice(0, 2).map((e, i) => (
              <div key={i} style={{
                background: colors.surface, borderRadius: radius.card, padding: 14, marginBottom: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              }}>
                <div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text }}>{e.title}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: colors.text3, marginTop: 2 }}>{e.date} · {e.type}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, color: colors.text }}>{e.rsvps}/{e.capacity}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 400, color: colors.text3 }}>RSVPs</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      )}

      {/* Members */}
      {activeTab === 'Members' && (
        <div style={{ marginTop: 20 }}>
          {defaultMembers.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{
              margin: '0 16px 10px', background: colors.surface, borderRadius: radius.card, padding: 14,
              display: 'flex', alignItems: 'center', gap: 12,
            }}>
              <div style={{ width: 40, height: 40, borderRadius: '50%', overflow: 'hidden', flexShrink: 0 }}>
                <img src={m.avatar} alt={m.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text }}>{m.name}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: colors.text3 }}>
                  S{m.season} · {m.sessions} sessions · {m.streak} day streak
                </div>
              </div>
              <div style={{
                padding: '3px 10px', borderRadius: radius.pill,
                background: m.status === 'Active' ? 'rgba(255,255,255,0.1)' : 'rgba(255,255,255,0.04)',
                fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: m.status === 'Active' ? colors.text : colors.text3,
                letterSpacing: 0.5, textTransform: 'uppercase',
              }}>{m.status}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Events */}
      {activeTab === 'Events' && (
        <div style={{ marginTop: 20 }}>
          {defaultEvents.map((e, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{
              margin: '0 16px 10px', background: colors.surface, borderRadius: radius.card, padding: 16,
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.2 }}>{e.title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3, marginTop: 3 }}>{e.date} · {e.type}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 20, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{e.rsvps}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: colors.text3, textTransform: 'uppercase' }}>of {e.capacity}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Applications */}
      {activeTab === 'Apps' && (
        <div style={{ marginTop: 20 }}>
          {applications.length === 0 && referrals.length === 0 && (
            <div style={{ margin: '40px 16px', textAlign: 'center', fontFamily: fonts.sans, fontSize: 14, color: colors.text3 }}>
              No applications or referrals yet. Applications submitted through the Apply flow will appear here.
            </div>
          )}
          {applications.map((a, i) => {
            const status = appStatuses[i] || 'Pending'
            return (
              <motion.div key={`a${i}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{
                margin: '0 16px 10px', background: colors.surface, borderRadius: radius.card, padding: 16,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 700, color: colors.text }}>{a.name || 'Applicant'}</div>
                  <div style={{
                    padding: '3px 10px', borderRadius: radius.pill,
                    background: status === 'Approved' ? 'rgba(255,255,255,0.12)' : status === 'Rejected' ? 'rgba(255,255,255,0.04)' : 'rgba(255,255,255,0.08)',
                    fontFamily: fonts.sans, fontSize: 10, fontWeight: 600,
                    color: status === 'Approved' ? colors.text : status === 'Rejected' ? colors.text3 : colors.text2,
                    letterSpacing: 0.5, textTransform: 'uppercase',
                  }}>{status}</div>
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3, marginBottom: 4 }}>
                  {a.email} {a.phone ? `· ${a.phone}` : ''} {a.instagram ? `· ${a.instagram}` : ''}
                </div>
                {/* Show some answers */}
                {a.answers && Object.values(a.answers).filter(v => typeof v === 'string' && v.length > 5).slice(0, 2).map((ans, ai) => (
                  <div key={ai} style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3, marginTop: 2 }}>
                    {typeof ans === 'string' ? ans : ''}
                  </div>
                ))}
                {status === 'Pending' && (
                  <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
                    <button onClick={() => updateAppStatus(i, 'Approved')} style={{
                      flex: 1, padding: '10px 0', borderRadius: radius.pill, background: '#FFFFFF', border: 'none',
                      fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: '#0D0D0D', letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
                    }}>Approve</button>
                    <button onClick={() => updateAppStatus(i, 'Interview')} style={{
                      flex: 1, padding: '10px 0', borderRadius: radius.pill, border: `1px solid ${colors.border}`, background: 'transparent',
                      fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text2, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
                    }}>Interview</button>
                    <button onClick={() => updateAppStatus(i, 'Rejected')} style={{
                      padding: '10px 14px', borderRadius: radius.pill, border: `1px solid ${colors.border}`, background: 'transparent',
                      fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
                    }}>Decline</button>
                  </div>
                )}
              </motion.div>
            )
          })}
          {referrals.map((r, i) => (
            <motion.div key={`r${i}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{
              margin: '0 16px 10px', background: colors.surface, borderRadius: radius.card, padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text }}>{r.name}</div>
                <div style={{ padding: '3px 10px', borderRadius: radius.pill, background: 'rgba(255,255,255,0.06)', fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase' }}>Referral</div>
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3 }}>{r.email} · Referred by {r.referredBy}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Messages */}
      {activeTab === 'Messages' && (
        <div style={{ marginTop: 20 }}>
          {contactMessages.length === 0 && (
            <div style={{ margin: '40px 16px', textAlign: 'center', fontFamily: fonts.sans, fontSize: 14, color: colors.text3 }}>
              No messages yet. Messages from the Contact form will appear here.
            </div>
          )}
          {contactMessages.map((m, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{
              margin: '0 16px 10px', background: colors.surface, borderRadius: radius.card, padding: 16,
            }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text, marginBottom: 4 }}>{m.name}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3, marginBottom: 8 }}>{m.email}</div>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text2, lineHeight: 1.6 }}>{m.message}</div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
