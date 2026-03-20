import { useState } from 'react'
import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set } from '../store'

const defaultMembers = [
  { name: 'Brianna Cole', season: 14, status: 'Active', streak: 12, sessions: 47, avatar: P.t1 },
  { name: 'Jasmine Rivera', season: 14, status: 'Active', streak: 8, sessions: 38, avatar: P.t2 },
  { name: 'Destiny Mitchell', season: 12, status: 'Active', streak: 22, sessions: 64, avatar: P.t3 },
  { name: 'Aaliyah King', season: 18, status: 'Active', streak: 5, sessions: 12, avatar: P.t4 },
  { name: 'Sofia Lopez', season: 9, status: 'Inactive', streak: 0, sessions: 89, avatar: P.t5 },
  { name: 'Nyla Thomas', season: 14, status: 'Active', streak: 15, sessions: 41, avatar: P.t1 },
]

const defaultEvents = [
  { title: 'Posture & Presence Lab', date: 'Apr 12', type: 'Refresher', rsvps: 8 },
  { title: 'Headshot Marathon', date: 'Apr 19', type: 'Shoot', rsvps: 4 },
  { title: 'Reel Creation Workshop', date: 'Apr 26', type: 'Content', rsvps: 12 },
  { title: 'Alumni Mixer', date: 'May 3', type: 'Network', rsvps: 6 },
]

export default function Admin() {
  const [activeTab, setActiveTab] = useState('Members')
  const applications = get('applications', [])
  const referrals = get('referrals', [])
  const contactMessages = get('contactMessages', [])

  const tabs = ['Members', 'Events', 'Apps', 'Messages']

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
              Manage your Continuum Club
            </div>
          </div>
          <img src={P.logo} alt="Corella" style={{ height: 28, opacity: 0.5 }} />
        </div>
      </div>

      {/* Stats Row */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
        margin: '20px 16px 0', display: 'flex', gap: 10,
      }}>
        {[
          { value: String(defaultMembers.filter(m => m.status === 'Active').length), label: 'Active' },
          { value: String(applications.length), label: 'Apps' },
          { value: String(defaultEvents.length), label: 'Events' },
          { value: String(contactMessages.length), label: 'Messages' },
        ].map((stat, i) => (
          <div key={i} style={{ flex: 1, background: colors.surface, borderRadius: radius.card, padding: '14px 8px', textAlign: 'center' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 22, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{stat.value}</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 4 }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Tabs */}
      <div style={{ display: 'flex', margin: '20px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 4 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{
            flex: 1, padding: '10px 0', borderRadius: 12,
            background: activeTab === t ? colors.text : 'transparent', color: activeTab === t ? colors.bg : colors.text3,
            fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
          }}>{t}</button>
        ))}
      </div>

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
                <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 500, color: colors.text3, textTransform: 'uppercase' }}>RSVPs</div>
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
              No applications or referrals yet
            </div>
          )}
          {applications.map((a, i) => (
            <motion.div key={`a${i}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }} style={{
              margin: '0 16px 10px', background: colors.surface, borderRadius: radius.card, padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text }}>{a.name}</div>
                <div style={{
                  padding: '3px 10px', borderRadius: radius.pill, background: 'rgba(255,255,255,0.1)',
                  fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text, letterSpacing: 0.5, textTransform: 'uppercase',
                }}>Application</div>
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3 }}>{a.email}</div>
              {a.message && <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 8, lineHeight: 1.5 }}>{a.message}</div>}
            </motion.div>
          ))}
          {referrals.map((r, i) => (
            <motion.div key={`r${i}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{
              margin: '0 16px 10px', background: colors.surface, borderRadius: radius.card, padding: 16,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text }}>{r.name}</div>
                <div style={{
                  padding: '3px 10px', borderRadius: radius.pill, background: 'rgba(255,255,255,0.06)',
                  fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase',
                }}>Referral</div>
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
              No messages yet
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
