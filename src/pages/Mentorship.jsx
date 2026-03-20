import { useState } from 'react'
import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

const goals = [
  { title: 'Book 3 paid shoots by June', progress: 33, status: 'In Progress' },
  { title: 'Complete Communication track', progress: 75, status: 'In Progress' },
  { title: 'Attend 2 Network Nights', progress: 50, status: 'In Progress' },
  { title: 'Build portfolio to 20 images', progress: 55, status: 'In Progress' },
]

const checkIns = [
  { date: 'Mar 22', time: '11:00 AM', type: '1-on-1', mentor: 'Corella', status: 'Upcoming' },
  { date: 'Mar 15', time: '11:00 AM', type: '1-on-1', mentor: 'Corella', status: 'Completed' },
  { date: 'Mar 8', time: '2:00 PM', type: 'Group', mentor: 'Corella', status: 'Completed' },
  { date: 'Mar 1', time: '11:00 AM', type: '1-on-1', mentor: 'Corella', status: 'Completed' },
]

const mentorNotes = [
  { date: 'Mar 15', note: 'Brianna is making incredible progress with her posture work. Her confidence in front of the camera has transformed. Next focus: vocal projection and interview prep.' },
  { date: 'Mar 8', note: 'Group session went well. Brianna helped two newer members with their walk — natural mentorship instincts showing up. Consider mentor badge.' },
  { date: 'Mar 1', note: 'Discussed long-term career goals. Brianna wants to transition into editorial modeling. Recommended building out her headshot portfolio and attending the next content creation day.' },
]

const prompts = [
  { date: 'This Week', prompt: 'What is one thing you did this week that surprised even yourself?', responded: false },
  { date: 'Last Week', prompt: 'Who in the community inspired you recently and why?', responded: true },
  { date: '2 Weeks Ago', prompt: 'Describe a moment where you felt truly seen.', responded: true },
]

export default function Mentorship() {
  const [activeTab, setActiveTab] = useState('Goals')
  const tabs = ['Goals', 'Check-Ins', 'Notes', 'Prompts']

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Header */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <img
          src={P.community}
          alt="Mentorship"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.95) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 24,
          left: 20,
          right: 20,
        }}>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 28,
            fontWeight: 900,
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: -0.5,
            lineHeight: 1.1,
          }}>
            Mentorship
          </div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            fontWeight: 400,
            color: colors.text2,
            marginTop: 6,
          }}>
            Your private space with your mentor
          </div>
        </div>
      </div>

      {/* Mentor Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          margin: '20px 16px 0',
          background: colors.surface,
          borderRadius: radius.card,
          padding: 16,
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        <div style={{
          width: 52,
          height: 52,
          borderRadius: '50%',
          overflow: 'hidden',
          flexShrink: 0,
        }}>
          <img src={P.t4} alt="Corella" style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%)',
          }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 16,
            fontWeight: 800,
            color: colors.text,
            textTransform: 'uppercase',
          }}>Corella</div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 400,
            color: colors.text3,
            marginTop: 2,
          }}>Your Mentor · Since Season 14</div>
        </div>
        <button style={{
          padding: '8px 16px',
          borderRadius: radius.pill,
          border: `1px solid ${colors.border}`,
          background: 'transparent',
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 600,
          color: colors.text2,
          letterSpacing: 0.5,
          textTransform: 'uppercase',
          cursor: 'pointer',
        }}>
          Schedule
        </button>
      </motion.div>

      {/* Tab Switcher */}
      <div style={{
        display: 'flex',
        margin: '20px 16px 0',
        background: colors.surface,
        borderRadius: radius.card,
        padding: 4,
      }}>
        {tabs.map(t => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            style={{
              flex: 1,
              padding: '10px 0',
              borderRadius: 12,
              background: activeTab === t ? colors.text : 'transparent',
              color: activeTab === t ? colors.bg : colors.text3,
              fontFamily: fonts.sans,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Goals Tab */}
      {activeTab === 'Goals' && (
        <div style={{ marginTop: 20 }}>
          {goals.map((g, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                margin: '0 16px 12px',
                background: colors.surface,
                borderRadius: radius.card,
                padding: 16,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 12,
              }}>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  fontWeight: 700,
                  color: colors.text,
                  lineHeight: 1.4,
                  flex: 1,
                }}>{g.title}</div>
                <span style={{
                  fontFamily: fonts.sans,
                  fontSize: 18,
                  fontWeight: 900,
                  color: colors.text,
                  marginLeft: 12,
                }}>{g.progress}%</span>
              </div>
              <div style={{
                height: 4,
                borderRadius: 2,
                background: 'rgba(255,255,255,0.1)',
                overflow: 'hidden',
              }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${g.progress}%` }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                  style={{
                    height: '100%',
                    background: '#FFFFFF',
                    borderRadius: 2,
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Check-Ins Tab */}
      {activeTab === 'Check-Ins' && (
        <div style={{ marginTop: 20 }}>
          {checkIns.map((c, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                margin: '0 16px 12px',
                background: colors.surface,
                borderRadius: radius.card,
                padding: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  fontWeight: 700,
                  color: colors.text,
                }}>{c.date} · {c.time}</div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: 12,
                  fontWeight: 400,
                  color: colors.text3,
                  marginTop: 3,
                }}>{c.type} with {c.mentor}</div>
              </div>
              <div style={{
                padding: '4px 12px',
                borderRadius: radius.pill,
                background: c.status === 'Upcoming' ? 'rgba(255,255,255,0.12)' : 'rgba(255,255,255,0.05)',
                fontFamily: fonts.sans,
                fontSize: 10,
                fontWeight: 600,
                color: c.status === 'Upcoming' ? colors.text : colors.text3,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}>{c.status}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === 'Notes' && (
        <div style={{ marginTop: 20 }}>
          {mentorNotes.map((n, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                margin: '0 16px 12px',
                background: colors.surface,
                borderRadius: radius.card,
                padding: 16,
              }}
            >
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 11,
                fontWeight: 600,
                color: colors.text3,
                letterSpacing: 1,
                textTransform: 'uppercase',
                marginBottom: 10,
              }}>{n.date} — Mentor Note</div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 400,
                color: colors.text2,
                lineHeight: 1.7,
              }}>{n.note}</div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Prompts Tab */}
      {activeTab === 'Prompts' && (
        <div style={{ marginTop: 20 }}>
          {prompts.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{
                margin: '0 16px 12px',
                background: colors.surface,
                borderRadius: radius.card,
                padding: 16,
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
                <span style={{
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  fontWeight: 600,
                  color: colors.text3,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>{p.date}</span>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: radius.pill,
                  background: p.responded ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.15)',
                  fontFamily: fonts.sans,
                  fontSize: 10,
                  fontWeight: 600,
                  color: p.responded ? colors.text3 : colors.text,
                  letterSpacing: 0.5,
                  textTransform: 'uppercase',
                }}>{p.responded ? 'Responded' : 'New'}</span>
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 15,
                fontWeight: 600,
                color: colors.text,
                lineHeight: 1.5,
              }}>{p.prompt}</div>
              {!p.responded && (
                <button style={{
                  marginTop: 12,
                  padding: '8px 20px',
                  borderRadius: radius.pill,
                  background: '#FFFFFF',
                  color: '#0D0D0D',
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  border: 'none',
                }}>
                  Respond
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}
