import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

const milestones = [
  { title: 'First Walk', earned: true },
  { title: '7-Day Streak', earned: true },
  { title: 'Stage Ready', earned: true },
  { title: 'Win Sharer', earned: true },
  { title: 'Mentor', earned: false },
  { title: '30-Day Streak', earned: false },
]

const settings = [
  { label: 'Daily Spark Notification', value: '7:30 AM' },
  { label: 'Event Reminders', value: '1 day before' },
  { label: 'Community Notifications', value: 'Wins only' },
]

export default function Profile() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Profile Header */}
      <div style={{
        position: 'relative',
        height: 280,
        overflow: 'hidden',
      }}>
        <img
          src={P.portrait}
          alt="Profile"
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
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.05) 0%, rgba(13,13,13,1) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 24,
          left: 20,
          right: 20,
          display: 'flex',
          alignItems: 'flex-end',
          gap: 16,
        }}>
          <div style={{
            width: 72,
            height: 72,
            borderRadius: '50%',
            overflow: 'hidden',
            border: '3px solid rgba(255,255,255,0.2)',
            flexShrink: 0,
          }}>
            <img src={P.t1} alt="Brianna" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(100%)',
            }} />
          </div>
          <div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 26,
              fontWeight: 900,
              color: colors.text,
              textTransform: 'uppercase',
              letterSpacing: -0.5,
              lineHeight: 1.1,
            }}>
              Brianna Cole
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 500,
              color: colors.text3,
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginTop: 4,
            }}>
              Season 14 Alumni · Scottsdale, AZ
            </div>
          </div>
        </div>
        {/* Logo */}
        <img
          src={P.logo}
          alt="Corella & Co"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            height: 28,
            opacity: 0.5,
          }}
        />
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          margin: '20px 16px 0',
          display: 'flex',
          gap: 12,
        }}
      >
        {[
          { value: '47', label: 'Sessions' },
          { value: '12', label: 'Day Streak' },
          { value: '8', label: 'Shoots' },
          { value: '24', label: 'Wins' },
        ].map((stat, i) => (
          <div key={i} style={{
            flex: 1,
            background: colors.surface,
            borderRadius: radius.card,
            padding: '16px 8px',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 22,
              fontWeight: 900,
              color: colors.text,
              lineHeight: 1,
            }}>{stat.value}</div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 10,
              fontWeight: 500,
              color: colors.text3,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
              marginTop: 4,
            }}>{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Membership */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        style={{
          margin: '20px 16px 0',
          background: colors.surface,
          borderRadius: radius.card,
          padding: 18,
        }}
      >
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 14,
        }}>Membership</div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 16,
              fontWeight: 800,
              color: colors.text,
              textTransform: 'uppercase',
            }}>Continuum Club</div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 400,
              color: colors.text3,
              marginTop: 3,
            }}>Active since Jan 2026</div>
          </div>
          <div style={{
            padding: '6px 14px',
            borderRadius: radius.pill,
            background: 'rgba(255,255,255,0.12)',
            fontFamily: fonts.sans,
            fontSize: 11,
            fontWeight: 700,
            color: colors.text,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}>Active</div>
        </div>
      </motion.div>

      {/* Badges */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{ margin: '20px 16px 0' }}
      >
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 14,
        }}>Badges</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {milestones.map((b, i) => (
            <div key={i} style={{
              padding: '8px 14px',
              borderRadius: radius.pill,
              border: `1px solid ${b.earned ? 'rgba(255,255,255,0.25)' : colors.border}`,
              background: b.earned ? 'rgba(255,255,255,0.08)' : 'transparent',
              opacity: b.earned ? 1 : 0.4,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}>
              {b.earned && (
                <svg width={12} height={12} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 11,
                fontWeight: 600,
                color: b.earned ? colors.text : colors.text3,
                letterSpacing: 0.5,
                textTransform: 'uppercase',
              }}>{b.title}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Settings */}
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
        }}>Notifications</div>
        {settings.map((s, i) => (
          <div key={i} style={{
            background: colors.surface,
            borderRadius: i === 0 ? `${radius.card}px ${radius.card}px 0 0` : i === settings.length - 1 ? `0 0 ${radius.card}px ${radius.card}px` : 0,
            padding: '14px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: i < settings.length - 1 ? `1px solid ${colors.border}` : 'none',
          }}>
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              fontWeight: 500,
              color: colors.text,
            }}>{s.label}</span>
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 13,
              fontWeight: 400,
              color: colors.text3,
            }}>{s.value}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
