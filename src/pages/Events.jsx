import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set } from '../store'

const filters = ['All', 'Refresher', 'Shoot', 'Content', 'Network', 'Studio']

const eventData = [
  { id: 'e1', type: 'Refresher', title: 'Posture & Presence Lab', date: 'Apr 12, 2026', daysAway: 5, totalSpots: 12, attendees: [P.t1, P.t2, P.t3], image: P.event },
  { id: 'e2', type: 'Shoot', title: 'Headshot Marathon', date: 'Apr 19, 2026', daysAway: 12, totalSpots: 8, attendees: [P.t4, P.t5], image: P.studio },
  { id: 'e3', type: 'Content', title: 'Reel Creation Workshop', date: 'Apr 26, 2026', daysAway: 19, totalSpots: 16, attendees: [P.t1, P.t3, P.t5, P.t2], image: P.training },
  { id: 'e4', type: 'Network', title: 'Alumni Mixer + Open Studio', date: 'May 3, 2026', daysAway: 26, totalSpots: 24, attendees: [P.t2, P.t4], image: P.crowd },
  { id: 'e5', type: 'Refresher', title: 'Confidence Reset', date: 'May 10, 2026', daysAway: 33, totalSpots: 14, attendees: [P.t3, P.t5, P.t1], image: P.portrait },
  { id: 'e6', type: 'Studio', title: 'Open Floor: Free Practice', date: 'May 17, 2026', daysAway: 40, totalSpots: 18, attendees: [P.t2], image: P.runway },
]

export default function Events() {
  const [filter, setFilter] = useState('All')
  const [rsvps, setRsvps] = useState(() => get('eventRsvps', {}))
  const [expandedId, setExpandedId] = useState(null)

  const toggleRsvp = (id) => {
    const next = { ...rsvps, [id]: !rsvps[id] }
    setRsvps(next)
    set('eventRsvps', next)
  }

  const filtered = filter === 'All' ? eventData : eventData.filter(e => e.type === filter)

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 240, overflow: 'hidden' }}>
        <img src={P.crowd} alt="Events" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
            Events
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 6 }}>
            Workshops, shoots, and studio time for alumni
          </div>
        </div>
      </div>

      {/* Filter Pills */}
      <div style={{ display: 'flex', gap: 8, padding: '16px 16px', overflowX: 'auto' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{
            padding: '8px 16px', borderRadius: radius.pill,
            border: `1px solid ${filter === f ? colors.text : colors.border}`,
            background: filter === f ? colors.text : 'transparent',
            color: filter === f ? colors.bg : colors.text2,
            fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase',
            cursor: 'pointer', whiteSpace: 'nowrap', flexShrink: 0, transition: 'all 0.2s',
          }}>
            {f}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      <div style={{ margin: '8px 0 0' }}>
        {filtered.map((evt, i) => {
          const isRsvpd = rsvps[evt.id]
          const spots = evt.totalSpots - evt.attendees.length - (isRsvpd ? 1 : 0)
          const expanded = expandedId === evt.id

          return (
            <motion.div
              key={evt.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ margin: '0 16px 16px', background: colors.surface, borderRadius: radius.card, overflow: 'hidden', cursor: 'pointer' }}
              onClick={() => setExpandedId(expanded ? null : evt.id)}
            >
              <div style={{ position: 'relative', height: 140 }}>
                <img src={evt.image} alt={evt.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 60%)' }} />
                <div style={{ position: 'absolute', top: 12, left: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                  <span style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text, letterSpacing: 1.5, textTransform: 'uppercase' }}>
                    {evt.type}
                  </span>
                </div>
                {isRsvpd && (
                  <div style={{
                    position: 'absolute', top: 12, right: 12, padding: '4px 10px', borderRadius: radius.pill,
                    background: 'rgba(255,255,255,0.2)', fontFamily: fonts.sans, fontSize: 10, fontWeight: 700,
                    color: '#FFFFFF', letterSpacing: 1, textTransform: 'uppercase',
                  }}>
                    Going
                  </div>
                )}
              </div>

              <div style={{ padding: '16px 16px 14px' }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 17, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.2, marginBottom: 6 }}>
                  {evt.title}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: colors.text2 }}>
                    {evt.date} · {evt.daysAway} days away
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {evt.attendees.slice(0, 3).map((a, ai) => (
                      <div key={ai} style={{
                        width: 28, height: 28, borderRadius: '50%', overflow: 'hidden',
                        border: `2px solid ${colors.surface}`, marginLeft: ai === 0 ? 0 : -8,
                        position: 'relative', zIndex: 3 - ai,
                      }}>
                        <img src={a} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
                      </div>
                    ))}
                    {isRsvpd && (
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                        border: `2px solid ${colors.surface}`, marginLeft: -8, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: fonts.sans, fontSize: 9, fontWeight: 700, color: colors.text,
                      }}>You</div>
                    )}
                  </div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                    {spots} spots left
                  </div>
                </div>

                {/* Expanded detail */}
                <AnimatePresence>
                  {expanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={{ borderTop: `1px solid ${colors.border}`, marginTop: 14, paddingTop: 14 }}>
                        <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, lineHeight: 1.6, marginBottom: 14 }}>
                          {evt.type === 'Refresher' && 'A focused 1-hour workshop to sharpen your technique. Bring comfortable shoes and an open mind.'}
                          {evt.type === 'Shoot' && 'Professional photography session. Wardrobe guide will be sent 3 days before. Photos delivered within 2 weeks.'}
                          {evt.type === 'Content' && 'Create professional social content with guidance. Bring your phone fully charged and 2-3 outfit changes.'}
                          {evt.type === 'Network' && 'Connect with industry professionals and fellow alumni. Smart casual dress code. Bring business cards if you have them.'}
                          {evt.type === 'Studio' && 'Open studio time for self-led practice. The space is yours — practice walks, poses, or film content.'}
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); toggleRsvp(evt.id) }}
                          style={{
                            width: '100%', padding: '12px 0', borderRadius: radius.card, border: 'none',
                            background: isRsvpd ? 'transparent' : '#FFFFFF',
                            color: isRsvpd ? colors.text2 : '#0D0D0D',
                            ...(isRsvpd ? { border: `1px solid ${colors.border}` } : {}),
                            fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, letterSpacing: 1,
                            textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
                          }}
                        >
                          {isRsvpd ? 'Cancel RSVP' : 'RSVP'}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
