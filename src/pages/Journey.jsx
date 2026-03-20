import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

const confidenceData = [
  { month: 'Oct', value: 30 },
  { month: 'Nov', value: 42 },
  { month: 'Dec', value: 55 },
  { month: 'Jan', value: 48 },
  { month: 'Feb', value: 68 },
  { month: 'Mar', value: 78 },
  { month: 'Apr', value: 85 },
]

const badges = [
  { title: 'First Walk', desc: 'Completed your first session', earned: true },
  { title: '7-Day Streak', desc: 'Practiced 7 days straight', earned: true },
  { title: 'Stage Ready', desc: 'Finished Runway Masterclass', earned: true },
  { title: 'Win Sharer', desc: 'Shared 5 community wins', earned: true },
  { title: 'Mentor', desc: 'Guided a new member', earned: false },
  { title: '30-Day Streak', desc: 'Practiced 30 days straight', earned: false },
  { title: 'Shoot Star', desc: 'Attended 10 photo shoots', earned: false },
  { title: 'Voice Found', desc: 'Finished Communication track', earned: false },
]

export default function Journey() {
  const maxValue = Math.max(...confidenceData.map(d => d.value))

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Header */}
      <div style={{ padding: '56px 20px 0' }}>
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 28,
          fontWeight: 900,
          color: colors.text,
          textTransform: 'uppercase',
          letterSpacing: -0.5,
          lineHeight: 1.1,
        }}>
          Your Journey
        </div>
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 13,
          fontWeight: 400,
          color: colors.text2,
          marginTop: 6,
        }}>
          Track your growth. See how far you've come.
        </div>
      </div>

      {/* Stats Row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          margin: '24px 16px 0',
          display: 'flex',
          gap: 12,
        }}
      >
        {[
          { value: '47', label: 'Sessions' },
          { value: '8', label: 'Shoots' },
          { value: '12', label: 'Day Streak' },
          { value: 'S14', label: 'Season' },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1,
            background: colors.surface,
            borderRadius: radius.card,
            padding: '18px 8px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 24,
              fontWeight: 900,
              color: colors.text,
              lineHeight: 1,
            }}>
              {stat.value}
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 10,
              fontWeight: 500,
              color: colors.text3,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              marginTop: 6,
            }}>
              {stat.label}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Glow-Up Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{ margin: '24px 16px 0' }}
      >
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 14,
        }}>
          Glow-Up Timeline
        </div>
        <div style={{
          display: 'flex',
          gap: 12,
        }}>
          <div style={{
            flex: 1,
            borderRadius: radius.card,
            overflow: 'hidden',
            position: 'relative',
            height: 220,
          }}>
            <img src={P.t3} alt="Before" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
            }}>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 10,
                fontWeight: 600,
                color: colors.text3,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 2,
              }}>
                Day 1
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 800,
                color: colors.text,
                textTransform: 'uppercase',
              }}>
                Before
              </div>
            </div>
          </div>
          <div style={{
            flex: 1,
            borderRadius: radius.card,
            overflow: 'hidden',
            position: 'relative',
            height: 220,
          }}>
            <img src={P.portrait} alt="After" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 50%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 12,
              left: 12,
            }}>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 10,
                fontWeight: 600,
                color: colors.text3,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 2,
              }}>
                Season 14
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 800,
                color: colors.text,
                textTransform: 'uppercase',
              }}>
                Now
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Confidence Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          margin: '24px 16px 0',
          background: colors.surface,
          borderRadius: radius.card,
          padding: 20,
        }}
      >
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 20,
        }}>
          Confidence Over Time
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 8,
          height: 120,
        }}>
          {confidenceData.map((d, i) => (
            <div key={i} style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
            }}>
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${(d.value / maxValue) * 100}%` }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                style={{
                  width: '100%',
                  background: i === confidenceData.length - 1 ? '#FFFFFF' : 'rgba(255,255,255,0.25)',
                  borderRadius: 4,
                  minHeight: 4,
                }}
              />
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 10,
                fontWeight: 500,
                color: colors.text3,
              }}>
                {d.month}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Milestone Badges */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{ margin: '24px 16px 0' }}
      >
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 14,
        }}>
          Milestones
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 12,
        }}>
          {badges.map((badge, i) => (
            <div key={i} style={{
              background: colors.surface,
              borderRadius: radius.card,
              padding: 16,
              opacity: badge.earned ? 1 : 0.4,
              position: 'relative',
            }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: `2px solid ${badge.earned ? colors.text : colors.border}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
              }}>
                {badge.earned ? (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="1" />
                  </svg>
                )}
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 13,
                fontWeight: 800,
                color: colors.text,
                textTransform: 'uppercase',
                letterSpacing: 0.3,
                marginBottom: 3,
              }}>
                {badge.title}
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 11,
                fontWeight: 400,
                color: colors.text3,
                lineHeight: 1.4,
              }}>
                {badge.desc}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Snap & Save */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ margin: '24px 16px 0' }}
      >
        <button style={{
          width: '100%',
          padding: '18px 24px',
          background: '#FFFFFF',
          color: '#0D0D0D',
          borderRadius: radius.card,
          fontFamily: fonts.sans,
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: 2,
          textTransform: 'uppercase',
          cursor: 'pointer',
          transition: 'all 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          Snap & Save
        </button>
      </motion.div>
    </div>
  )
}
