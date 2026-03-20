import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

const categories = [
  {
    title: 'Runway & Posing',
    icon: '◆',
    sessions: [
      { title: 'Power Walk Fundamentals', duration: '8 min', level: 'Foundation' },
      { title: 'Editorial Posing Flow', duration: '12 min', level: 'Intermediate' },
      { title: 'Heel Confidence Drill', duration: '6 min', level: 'Foundation' },
      { title: 'Runway Presence Masterclass', duration: '15 min', level: 'Advanced' },
    ],
  },
  {
    title: 'Confidence',
    icon: '●',
    sessions: [
      { title: 'Mirror Talk Practice', duration: '5 min', level: 'Foundation' },
      { title: 'Room Entry Energy', duration: '10 min', level: 'Intermediate' },
      { title: 'Vocal Projection Lab', duration: '8 min', level: 'Foundation' },
      { title: 'Stage Fright Reset', duration: '12 min', level: 'Advanced' },
    ],
  },
  {
    title: 'Breathing',
    icon: '○',
    sessions: [
      { title: 'Pre-Runway Calm', duration: '4 min', level: 'Foundation' },
      { title: 'Grounding Breath', duration: '6 min', level: 'Foundation' },
      { title: 'Box Breathing for Focus', duration: '5 min', level: 'Intermediate' },
      { title: 'Performance Anxiety Release', duration: '10 min', level: 'Advanced' },
    ],
  },
  {
    title: 'Communication',
    icon: '▪',
    sessions: [
      { title: 'Elevator Pitch Practice', duration: '7 min', level: 'Foundation' },
      { title: 'Casting Call Confidence', duration: '10 min', level: 'Intermediate' },
      { title: 'Networking Conversation Flow', duration: '8 min', level: 'Foundation' },
      { title: 'Interview Presence', duration: '12 min', level: 'Advanced' },
    ],
  },
]

const playlists = [
  { title: 'Walk Music', subtitle: '24 tracks', image: P.runway },
  { title: 'Studio Energy', subtitle: '18 tracks', image: P.studio },
  { title: 'Cool Down', subtitle: '12 tracks', image: P.portrait },
  { title: 'Shoot Day', subtitle: '30 tracks', image: P.training },
]

export default function Practice() {
  const [expanded, setExpanded] = useState(null)

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Before I Walk Hero */}
      <div style={{
        position: 'relative',
        height: 260,
        overflow: 'hidden',
      }}>
        <img
          src={P.training}
          alt="Before I Walk"
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
            display: 'inline-block',
            padding: '4px 12px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: radius.pill,
            fontFamily: fonts.sans,
            fontSize: 10,
            fontWeight: 600,
            color: colors.text,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            Featured
          </div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 28,
            fontWeight: 900,
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: -0.5,
            lineHeight: 1.1,
            marginBottom: 6,
          }}>
            Before I Walk
          </div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            fontWeight: 400,
            color: colors.text2,
            lineHeight: 1.4,
          }}>
            Your daily pre-walk ritual. Posture, breath, intention.
          </div>
          <button style={{
            marginTop: 14,
            padding: '10px 28px',
            background: '#FFFFFF',
            color: '#0D0D0D',
            borderRadius: radius.pill,
            fontFamily: fonts.sans,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: 1,
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}>
            Start
          </button>
        </div>
      </div>

      {/* Categories */}
      <div style={{ margin: '24px 0 0' }}>
        <div style={{
          margin: '0 16px 16px',
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>
          Practice Sessions
        </div>

        {categories.map((cat, ci) => (
          <div key={ci} style={{ marginBottom: 2 }}>
            <button
              onClick={() => setExpanded(expanded === ci ? null : ci)}
              style={{
                width: '100%',
                margin: '0 0 0',
                padding: '16px 20px',
                background: expanded === ci ? colors.surface : 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                borderBottom: `1px solid ${colors.border}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  color: colors.text2,
                }}>
                  {cat.icon}
                </span>
                <span style={{
                  fontFamily: fonts.sans,
                  fontSize: 16,
                  fontWeight: 800,
                  color: colors.text,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  {cat.title}
                </span>
              </div>
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 12,
                color: colors.text3,
                fontWeight: 500,
              }}>
                {cat.sessions.length} sessions
              </span>
            </button>
            <AnimatePresence>
              {expanded === ci && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{ overflow: 'hidden' }}
                >
                  {cat.sessions.map((s, si) => (
                    <div
                      key={si}
                      style={{
                        padding: '14px 20px 14px 46px',
                        borderBottom: `1px solid ${colors.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                      }}
                    >
                      <div>
                        <div style={{
                          fontFamily: fonts.sans,
                          fontSize: 14,
                          fontWeight: 600,
                          color: colors.text,
                          marginBottom: 3,
                        }}>
                          {s.title}
                        </div>
                        <div style={{
                          fontFamily: fonts.sans,
                          fontSize: 11,
                          fontWeight: 500,
                          color: colors.text3,
                        }}>
                          {s.duration} · {s.level}
                        </div>
                      </div>
                      <div style={{
                        width: 32,
                        height: 32,
                        borderRadius: '50%',
                        border: `1px solid ${colors.border}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}>
                        <svg width={12} height={12} viewBox="0 0 24 24" fill="white">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* Studio Playlists */}
      <div style={{ margin: '28px 0 0' }}>
        <div style={{
          margin: '0 16px 14px',
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>
          Studio Playlists
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
          margin: '0 16px',
        }}>
          {playlists.map((pl, i) => (
            <div key={i} style={{
              position: 'relative',
              borderRadius: radius.card,
              overflow: 'hidden',
              height: 140,
              cursor: 'pointer',
            }}>
              <img src={pl.image} alt={pl.title} style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                filter: 'grayscale(100%)',
              }} />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 100%)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: 12,
                left: 12,
              }}>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  fontWeight: 800,
                  color: colors.text,
                  textTransform: 'uppercase',
                  letterSpacing: 0.3,
                }}>
                  {pl.title}
                </div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  fontWeight: 400,
                  color: colors.text3,
                  marginTop: 2,
                }}>
                  {pl.subtitle}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
