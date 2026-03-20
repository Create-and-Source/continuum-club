import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set } from '../store'

const defaultMembers = [
  { id: 'm1', name: 'Brianna Cole', season: 18, status: 'Active', streak: 12, sessions: 47, avatar: P.t1, mood: 'Strong', mentor: 'Corella' },
  { id: 'm2', name: 'Esmeralda Sierra', season: 10, status: 'Active', streak: 8, sessions: 38, avatar: P.t2, mood: 'On Fire', mentor: 'Corella' },
  { id: 'm3', name: 'Chris Lopez', season: 9, status: 'Active', streak: 22, sessions: 64, avatar: P.t3, mood: 'Steady', mentor: null },
  { id: 'm4', name: 'Cole Johnson', season: 7, status: 'Active', streak: 5, sessions: 12, avatar: P.t4, mood: 'On Fire', mentor: null },
  { id: 'm5', name: 'Janny Nguyen', season: 8, status: 'Inactive', streak: 0, sessions: 89, avatar: P.t5, mood: 'Gentle', mentor: null },
  { id: 'm6', name: 'Vanessa Flores', season: 8, status: 'Active', streak: 15, sessions: 41, avatar: P.t1, mood: 'Strong', mentor: 'Corella' },
]

const defaultEvents = [
  { id: 'de1', title: 'Posture & Presence Lab', date: 'Apr 12', type: 'Refresher', rsvps: 8, capacity: 12, visible: true },
  { id: 'de2', title: 'Headshot Marathon', date: 'Apr 19', type: 'Shoot', rsvps: 4, capacity: 8, visible: true },
  { id: 'de3', title: 'Reel Creation Workshop', date: 'Apr 26', type: 'Content', rsvps: 12, capacity: 16, visible: true },
  { id: 'de4', title: 'Alumni Mixer', date: 'May 3', type: 'Network', rsvps: 6, capacity: 24, visible: true },
]

const eventTypes = ['Refresher', 'Shoot', 'Content', 'Network', 'Studio']
const mentorOptions = ['Corella', 'Alex Rivera', 'None']

const defaultSparks = [
  '"This school got me through the darkest period of my life and gave me something to dream about." — Brianna Pettit, S9',
  '"Corella & Co was a game-changer for me. Their professional and structured program goes beyond just modeling." — Esmeralda Sierra, S10',
  '"From building my posing confidence to having a family dedicated towards my growth; I cannot begin to thank them." — Janny Nguyen, S8',
]

const defaultAnnouncements = [
  { text: 'Season 19 Applications Open — Referral slots available for alumni.', active: true },
  { text: 'Studio Hours Extended — Open studio now Saturdays 10am-4pm.', active: true },
]

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Dashboard')
  const applications = get('applications', [])
  const referrals = get('referrals', [])
  const contactMessages = get('contactMessages', [])
  const [appStatuses, setAppStatuses] = useState(() => get('appStatuses', {}))

  // Members with stored overrides
  const [memberOverrides, setMemberOverrides] = useState(() => get('memberOverrides', {}))
  const [expandedMember, setExpandedMember] = useState(null)

  // Events
  const [customEvents, setCustomEvents] = useState(() => get('customEvents', []))
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const [newEvent, setNewEvent] = useState({ title: '', date: '', type: 'Refresher', capacity: 12 })

  // Content
  const [sparks, setSparks] = useState(() => get('adminSparks', defaultSparks))
  const [announcements, setAnnouncements] = useState(() => get('adminAnnouncements', defaultAnnouncements))
  const [newSpark, setNewSpark] = useState('')
  const [newAnnouncement, setNewAnnouncement] = useState('')

  const getMembers = () => defaultMembers.map(m => ({
    ...m,
    status: memberOverrides[m.id]?.status || m.status,
    mentor: memberOverrides[m.id]?.mentor !== undefined ? memberOverrides[m.id].mentor : m.mentor,
  }))

  const members = getMembers()
  const activeMembers = members.filter(m => m.status === 'Active').length
  const totalSessions = members.reduce((s, m) => s + m.sessions, 0)
  const avgStreak = Math.round(members.filter(m => m.status === 'Active').reduce((s, m) => s + m.streak, 0) / (activeMembers || 1))

  const allEvents = [...defaultEvents, ...customEvents]

  const updateAppStatus = (idx, status) => {
    const next = { ...appStatuses, [idx]: status }
    setAppStatuses(next)
    set('appStatuses', next)
  }

  const updateMemberOverride = (id, key, value) => {
    const next = { ...memberOverrides, [id]: { ...memberOverrides[id], [key]: value } }
    setMemberOverrides(next)
    set('memberOverrides', next)
  }

  const createEvent = () => {
    if (!newEvent.title.trim() || !newEvent.date.trim()) return
    const evt = {
      id: 'ce_' + Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      type: newEvent.type,
      rsvps: 0,
      capacity: parseInt(newEvent.capacity) || 12,
      visible: true,
      totalSpots: parseInt(newEvent.capacity) || 12,
      attendees: [],
      image: P.event,
    }
    const next = [...customEvents, evt]
    setCustomEvents(next)
    set('customEvents', next)
    setNewEvent({ title: '', date: '', type: 'Refresher', capacity: 12 })
    setShowCreateEvent(false)
  }

  const toggleEventVisibility = (idx, isCustom) => {
    if (isCustom) {
      const next = customEvents.map((e, i) => i === idx ? { ...e, visible: !e.visible } : e)
      setCustomEvents(next)
      set('customEvents', next)
    }
  }

  const addSpark = () => {
    if (!newSpark.trim()) return
    const next = [...sparks, newSpark.trim()]
    setSparks(next)
    set('adminSparks', next)
    setNewSpark('')
  }

  const removeSpark = (idx) => {
    const next = sparks.filter((_, i) => i !== idx)
    setSparks(next)
    set('adminSparks', next)
  }

  const addAnnouncement = () => {
    if (!newAnnouncement.trim()) return
    const next = [...announcements, { text: newAnnouncement.trim(), active: true }]
    setAnnouncements(next)
    set('adminAnnouncements', next)
    setNewAnnouncement('')
  }

  const toggleAnnouncement = (idx) => {
    const next = announcements.map((a, i) => i === idx ? { ...a, active: !a.active } : a)
    setAnnouncements(next)
    set('adminAnnouncements', next)
  }

  const tabs = ['Dashboard', 'Members', 'Events', 'Content', 'Apps', 'Messages']

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
          <div className="cc-admin-metrics" style={{ margin: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { value: String(activeMembers), label: 'Active Members', sub: `${members.length} total` },
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

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} style={{ margin: '20px 16px 0' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Member Moods Today</div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {members.filter(m => m.status === 'Active').map((m, i) => (
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

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{ margin: '20px 16px 0' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>Upcoming Events</div>
            {allEvents.slice(0, 2).map((e, i) => (
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

      {/* Members — with expandable detail panel */}
      {activeTab === 'Members' && (
        <div style={{ marginTop: 20 }}>
          {members.map((m, i) => {
            const isExpanded = expandedMember === m.id
            const moodHistory = get('moodHistory', [])
            const journalCount = get('journalEntries', []).length

            return (
              <motion.div key={m.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{
                margin: '0 16px 10px', background: colors.surface, borderRadius: radius.card, overflow: 'hidden',
              }}>
                <div
                  onClick={() => setExpandedMember(isExpanded ? null : m.id)}
                  style={{
                    padding: 14, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer',
                  }}
                >
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
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ padding: '0 14px 16px', borderTop: `1px solid ${colors.border}`, paddingTop: 14 }}>
                        {/* Stats */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, marginBottom: 14 }}>
                          {[
                            { label: 'Sessions', value: m.sessions },
                            { label: 'Streak', value: `${m.streak}d` },
                            { label: 'Journals', value: journalCount },
                          ].map((s, si) => (
                            <div key={si} style={{ textAlign: 'center', padding: '8px 4px', background: 'rgba(255,255,255,0.04)', borderRadius: radius.sm }}>
                              <div style={{ fontFamily: fonts.sans, fontSize: 18, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{s.value}</div>
                              <div style={{ fontFamily: fonts.sans, fontSize: 9, fontWeight: 500, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 4 }}>{s.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Mood history */}
                        <div style={{ marginBottom: 14 }}>
                          <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Current Mood</div>
                          <div style={{
                            padding: '6px 12px', borderRadius: radius.pill, background: 'rgba(255,255,255,0.06)', display: 'inline-block',
                            fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: colors.text2,
                          }}>{m.mood}</div>
                        </div>

                        {/* Status toggle */}
                        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                          <button
                            onClick={() => updateMemberOverride(m.id, 'status', m.status === 'Active' ? 'Inactive' : 'Active')}
                            style={{
                              flex: 1, padding: '10px 0', borderRadius: radius.pill,
                              background: m.status === 'Active' ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
                              border: m.status === 'Active' ? `1px solid ${colors.border}` : 'none',
                              color: m.status === 'Active' ? colors.text3 : '#0D0D0D',
                              fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
                            }}
                          >
                            {m.status === 'Active' ? 'Set Inactive' : 'Set Active'}
                          </button>
                        </div>

                        {/* Mentor assignment */}
                        <div>
                          <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Assign Mentor</div>
                          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                            {mentorOptions.map(mentor => {
                              const currentMentor = m.mentor || 'None'
                              const isSelected = (mentor === 'None' && !m.mentor) || mentor === m.mentor
                              return (
                                <button
                                  key={mentor}
                                  onClick={() => updateMemberOverride(m.id, 'mentor', mentor === 'None' ? null : mentor)}
                                  style={{
                                    padding: '6px 14px', borderRadius: radius.pill,
                                    border: `1px solid ${isSelected ? colors.text : colors.border}`,
                                    background: isSelected ? 'rgba(255,255,255,0.1)' : 'transparent',
                                    fontFamily: fonts.sans, fontSize: 11, fontWeight: isSelected ? 700 : 500,
                                    color: isSelected ? colors.text : colors.text3,
                                    cursor: 'pointer', transition: 'all 0.15s',
                                  }}
                                >{mentor}</button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Events — with create */}
      {activeTab === 'Events' && (
        <div style={{ marginTop: 20 }}>
          <div style={{ margin: '0 16px 16px' }}>
            <button onClick={() => setShowCreateEvent(!showCreateEvent)} style={{
              width: '100%', padding: '14px 0', borderRadius: radius.card,
              background: showCreateEvent ? 'rgba(255,255,255,0.06)' : '#FFFFFF',
              border: showCreateEvent ? `1px solid ${colors.border}` : 'none',
              color: showCreateEvent ? colors.text2 : '#0D0D0D',
              fontFamily: fonts.sans, fontSize: 13, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
            }}>
              {showCreateEvent ? 'Cancel' : 'Create Event'}
            </button>
          </div>

          <AnimatePresence>
            {showCreateEvent && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden' }}>
                <div style={{ margin: '0 16px 16px', background: colors.surface, borderRadius: radius.card, padding: 18 }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>New Event</div>
                  {/* Title */}
                  <input value={newEvent.title} onChange={e => setNewEvent({ ...newEvent, title: e.target.value })} placeholder="Event title"
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}`, borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 14, fontWeight: 500, color: colors.text, marginBottom: 10 }} />
                  {/* Date */}
                  <input value={newEvent.date} onChange={e => setNewEvent({ ...newEvent, date: e.target.value })} placeholder="Date (e.g. Jun 7, 2026)"
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}`, borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 14, fontWeight: 500, color: colors.text, marginBottom: 10 }} />
                  {/* Type */}
                  <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 6 }}>Type</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 10 }}>
                    {eventTypes.map(t => (
                      <button key={t} onClick={() => setNewEvent({ ...newEvent, type: t })} style={{
                        padding: '6px 14px', borderRadius: radius.pill,
                        border: `1px solid ${newEvent.type === t ? colors.text : colors.border}`,
                        background: newEvent.type === t ? 'rgba(255,255,255,0.1)' : 'transparent',
                        fontFamily: fonts.sans, fontSize: 11, fontWeight: newEvent.type === t ? 700 : 500,
                        color: newEvent.type === t ? colors.text : colors.text3, cursor: 'pointer',
                      }}>{t}</button>
                    ))}
                  </div>
                  {/* Capacity */}
                  <input type="number" value={newEvent.capacity} onChange={e => setNewEvent({ ...newEvent, capacity: e.target.value })} placeholder="Capacity"
                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: `1px solid ${colors.border}`, borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 14, fontWeight: 500, color: colors.text, marginBottom: 14 }} />
                  <button onClick={createEvent} style={{
                    width: '100%', padding: '14px 0', borderRadius: radius.card, background: '#FFFFFF', border: 'none',
                    fontFamily: fonts.sans, fontSize: 13, fontWeight: 800, color: '#0D0D0D', letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
                  }}>Save Event</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {allEvents.map((e, i) => {
            const isCustom = e.id.startsWith('ce_')
            const customIdx = isCustom ? customEvents.findIndex(ce => ce.id === e.id) : -1
            return (
              <motion.div key={e.id || i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{
                margin: '0 16px 10px', background: colors.surface, borderRadius: radius.card, padding: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                opacity: e.visible === false ? 0.5 : 1,
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.2 }}>{e.title}</div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3, marginTop: 3 }}>
                    {e.date} · {e.type}
                    {e.visible === false && ' · Draft'}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontFamily: fonts.sans, fontSize: 20, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{e.rsvps}</div>
                    <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: colors.text3, textTransform: 'uppercase' }}>of {e.capacity}</div>
                  </div>
                  {isCustom && (
                    <button onClick={() => toggleEventVisibility(customIdx, true)} style={{
                      padding: '4px 10px', borderRadius: radius.pill, border: `1px solid ${colors.border}`,
                      background: 'transparent', fontFamily: fonts.sans, fontSize: 9, fontWeight: 600,
                      color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
                    }}>
                      {e.visible === false ? 'Show' : 'Hide'}
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {/* Content Management */}
      {activeTab === 'Content' && (
        <div style={{ marginTop: 20 }}>
          {/* Sparks / Affirmations */}
          <div style={{ margin: '0 16px 20px' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
              Daily Spark Affirmations
            </div>
            {sparks.map((s, i) => (
              <div key={i} style={{
                background: colors.surface, borderRadius: radius.card, padding: 14, marginBottom: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
              }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, lineHeight: 1.5, flex: 1 }}>{s}</div>
                <button onClick={() => removeSpark(i)} style={{
                  width: 28, height: 28, borderRadius: '50%', border: `1px solid ${colors.border}`, background: 'transparent',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flexShrink: 0,
                }}>
                  <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke={colors.text3} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input value={newSpark} onChange={e => setNewSpark(e.target.value)} placeholder="Add new affirmation..." onKeyDown={e => e.key === 'Enter' && addSpark()}
                style={{ flex: 1, padding: '10px 14px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text }} />
              <button onClick={addSpark} style={{
                padding: '10px 16px', borderRadius: radius.sm, background: '#FFFFFF', border: 'none',
                fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: '#0D0D0D', letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
              }}>Add</button>
            </div>
          </div>

          {/* Announcements */}
          <div style={{ margin: '0 16px 20px' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 12 }}>
              Announcements
            </div>
            {announcements.map((a, i) => (
              <div key={i} style={{
                background: colors.surface, borderRadius: radius.card, padding: 14, marginBottom: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
                opacity: a.active ? 1 : 0.5,
              }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, lineHeight: 1.5, flex: 1 }}>{a.text}</div>
                <button onClick={() => toggleAnnouncement(i)} style={{
                  padding: '4px 10px', borderRadius: radius.pill, border: `1px solid ${colors.border}`, background: 'transparent',
                  fontFamily: fonts.sans, fontSize: 9, fontWeight: 600, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer', flexShrink: 0,
                }}>
                  {a.active ? 'Archive' : 'Restore'}
                </button>
              </div>
            ))}
            <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
              <input value={newAnnouncement} onChange={e => setNewAnnouncement(e.target.value)} placeholder="New announcement..." onKeyDown={e => e.key === 'Enter' && addAnnouncement()}
                style={{ flex: 1, padding: '10px 14px', background: colors.surface, border: `1px solid ${colors.border}`, borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text }} />
              <button onClick={addAnnouncement} style={{
                padding: '10px 16px', borderRadius: radius.sm, background: '#FFFFFF', border: 'none',
                fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: '#0D0D0D', letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer',
              }}>Add</button>
            </div>
          </div>
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
                {a.location && (
                  <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, color: colors.text3, marginTop: 2 }}>
                    Location: {a.location}
                  </div>
                )}
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
