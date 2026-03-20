import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

const moods = ['On Fire', 'Strong', 'Steady', 'Working On It', 'Gentle']

const sparks = [
  { affirmation: '"You are not behind. You are exactly where your power needs you to be."', exercise: 'Mirror Talk: 60 seconds of eye contact with yourself. No words. Just presence.' },
  { affirmation: '"She who walks with intention never arrives by accident."', exercise: 'Power Pose: Stand tall, hands on hips, chin up. Hold for 2 minutes.' },
  { affirmation: '"Your presence is your power. Stop giving it away."', exercise: 'Eye Contact Drill: Hold eye contact with your reflection for 90 seconds without looking away.' },
  { affirmation: '"Confidence is built in reps, not in revelations."', exercise: 'Walk Drill: Walk across the room like the entire room is watching. Repeat 5 times.' },
  { affirmation: '"You were not made to blend in. You were made to stand out."', exercise: 'Voice Exercise: Say your name out loud 3 times — each time louder and more certain.' },
]

function getGreeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 17) return 'Good afternoon'
  return 'Good evening'
}

const communityWins = [
  { name: 'Jasmine R.', season: 'S14', avatar: P.t1, text: 'Booked my first paid editorial shoot this week. Corella gave me the confidence to pitch myself.' },
  { name: 'Destiny M.', season: 'S12', avatar: P.t2, text: 'Walked into my interview with runway posture and spoke like I meant it. Got the offer.' },
]

const ritualSteps = [
  { title: 'Grounding', instruction: 'Feel both feet flat on the floor. Press down. You are here.', seconds: 10 },
  { title: 'Spine', instruction: 'Stack your spine. Crown of the head reaching up. Shoulders down and back.', seconds: 8 },
  { title: 'Breath', instruction: 'Inhale through the nose for 4 counts. Hold 4. Exhale 6.', seconds: 14 },
  { title: 'Eyes', instruction: 'Soften your gaze. Lift your chin slightly. Look forward, not down.', seconds: 8 },
  { title: 'Affirmation', instruction: 'Say it quietly or in your mind: "I walk like I belong everywhere I go."', seconds: 10 },
  { title: 'Walk', instruction: 'You are ready. Step forward with intention.', seconds: 6 },
]

function RitualOverlay({ onClose }) {
  const [step, setStep] = useState(0)
  const [countdown, setCountdown] = useState(ritualSteps[0].seconds)

  const advanceStep = useCallback(() => {
    if (step < ritualSteps.length - 1) {
      const next = step + 1
      setStep(next)
      setCountdown(ritualSteps[next].seconds)
    } else {
      onClose()
    }
  }, [step, onClose])

  useEffect(() => {
    if (countdown <= 0) {
      advanceStep()
      return
    }
    const t = setTimeout(() => setCountdown(c => c - 1), 1000)
    return () => clearTimeout(t)
  }, [countdown, advanceStep])

  const current = ritualSteps[step]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={advanceStep}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9998,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
      }}
    >
      {/* Background */}
      <img
        src={P.runway}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          filter: 'grayscale(100%) brightness(0.3)',
        }}
      />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 1,
        padding: '0 32px',
        maxWidth: 430,
        textAlign: 'center',
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
          >
            {/* Step title */}
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 11,
              fontWeight: 600,
              color: 'rgba(255,255,255,0.4)',
              letterSpacing: 3,
              textTransform: 'uppercase',
              marginBottom: 16,
            }}>
              Step {step + 1} of {ritualSteps.length}
            </div>

            <div style={{
              fontFamily: fonts.sans,
              fontSize: 28,
              fontWeight: 900,
              color: '#FFFFFF',
              textTransform: 'uppercase',
              letterSpacing: 1,
              marginBottom: 20,
            }}>
              {current.title}
            </div>

            <div style={{
              fontFamily: fonts.sans,
              fontSize: 16,
              fontWeight: 400,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.6,
              marginBottom: 32,
            }}>
              {current.instruction}
            </div>

            {/* Countdown */}
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 48,
              fontWeight: 900,
              color: '#FFFFFF',
              lineHeight: 1,
              marginBottom: 40,
            }}>
              {countdown}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
          {ritualSteps.map((_, i) => (
            <div key={i} style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: i <= step ? '#FFFFFF' : 'rgba(255,255,255,0.2)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        {/* Tap hint */}
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 10,
          fontWeight: 500,
          color: 'rgba(255,255,255,0.25)',
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginTop: 32,
        }}>
          Tap to skip
        </div>
      </div>
    </motion.div>
  )
}

export default function Home() {
  const navigate = useNavigate()
  const [mood, setMood] = useState(null)
  const [moodSaved, setMoodSaved] = useState(false)
  const [showRitual, setShowRitual] = useState(false)
  const [spark] = useState(() => sparks[Math.floor(Math.random() * sparks.length)])

  const handleMood = (m) => {
    setMood(m)
    setMoodSaved(true)
    setTimeout(() => setMoodSaved(false), 2000)
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Before I Walk Ritual Overlay */}
      <AnimatePresence>
        {showRitual && <RitualOverlay onClose={() => setShowRitual(false)} />}
      </AnimatePresence>

      {/* Hero */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        <img
          src={P.hero}
          alt="Corella"
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
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(13,13,13,0.95) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: 24,
          left: 20,
          right: 20,
        }}>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            fontWeight: 500,
            color: colors.text2,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 6,
          }}>
            {getGreeting()}
          </div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 32,
            fontWeight: 900,
            color: colors.text,
            letterSpacing: -0.5,
            textTransform: 'uppercase',
            lineHeight: 1.1,
          }}>
            Brianna
          </div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 12,
            fontWeight: 500,
            color: colors.text3,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginTop: 8,
          }}>
            Stay Sharp. Stay Balanced. Stay Ahead.
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
            height: 32,
            opacity: 0.7,
          }}
        />
      </div>

      {/* Streak Counter */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        style={{
          margin: '20px 16px 0',
          background: colors.surface,
          borderRadius: radius.card,
          padding: 20,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 11,
            fontWeight: 600,
            color: colors.text3,
            letterSpacing: 2,
            textTransform: 'uppercase',
            marginBottom: 4,
          }}>
            Current Streak
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 40,
              fontWeight: 900,
              color: colors.text,
              lineHeight: 1,
            }}>12</span>
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              fontWeight: 600,
              color: colors.text2,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}>Days</span>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 3 }}>
          {[...Array(7)].map((_, i) => (
            <div key={i} style={{
              width: 8,
              height: 32 + (i < 5 ? i * 4 : (6 - i) * 4),
              borderRadius: 4,
              background: i < 5 ? colors.text : 'rgba(255,255,255,0.15)',
            }} />
          ))}
        </div>
      </motion.div>

      {/* Daily Spark — Photo-backed hero card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        style={{
          margin: '16px 16px 0',
          borderRadius: radius.card,
          overflow: 'hidden',
          position: 'relative',
          height: 220,
        }}
      >
        {/* Background photo */}
        <img
          src={P.portrait}
          alt=""
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'grayscale(100%)',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)',
        }} />

        {/* Content overlay */}
        <div style={{
          position: 'relative',
          zIndex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 24,
        }}>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 11,
            fontWeight: 700,
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: 2,
            textTransform: 'uppercase',
          }}>
            Daily Spark
          </div>

          <div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 20,
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.4,
              marginBottom: 12,
            }}>
              {spark.affirmation}
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 13,
              fontWeight: 500,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.4,
            }}>
              {spark.exercise}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Before I Walk Button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        style={{ margin: '16px 16px 0' }}
      >
        <button
          onClick={() => setShowRitual(true)}
          style={{
            width: '100%',
            padding: '18px 24px',
            background: '#FFFFFF',
            color: '#0D0D0D',
            border: 'none',
            borderRadius: radius.card,
            fontFamily: fonts.sans,
            fontSize: 15,
            fontWeight: 800,
            letterSpacing: 2,
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          Before I Walk
        </button>
      </motion.div>

      {/* Mood Check-in */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
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
          marginBottom: 14,
        }}>
          How are you showing up today?
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          {moods.map(m => (
            <button
              key={m}
              onClick={() => handleMood(m)}
              style={{
                padding: '8px 16px',
                borderRadius: radius.pill,
                border: `1px solid ${mood === m ? colors.text : colors.border}`,
                background: mood === m ? colors.text : 'transparent',
                color: mood === m ? colors.bg : colors.text2,
                fontFamily: fonts.sans,
                fontSize: 13,
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
            >
              {m}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Mood Saved Confirmation */}
      <AnimatePresence>
        {moodSaved && mood && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              margin: '8px 16px 0',
              padding: '10px 16px',
              background: 'rgba(255,255,255,0.06)',
              borderRadius: radius.card,
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 500,
              color: colors.text2,
              textAlign: 'center',
            }}
          >
            Logged: feeling {mood.toLowerCase()} today
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Links */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        style={{
          margin: '24px 16px 0',
        }}
      >
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Your Space
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 10,
        }}>
          {[
            { label: 'Journal', path: '/journal', icon: 'M4 4h16v16H4V4zm2 2v12h12V6H6zm2 3h8m-8 3h6' },
            { label: 'Portfolio', path: '/portfolio', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
            { label: 'Benefits', path: '/benefits', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
            { label: 'Journey', path: '/journey', icon: 'M22 12l-4-4v3H3v2h15v3l4-4z' },
            { label: 'Mentorship', path: '/mentorship', icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197' },
          ].map((link, i) => (
            <button
              key={i}
              onClick={() => navigate(link.path)}
              style={{
                background: colors.surface,
                borderRadius: radius.card,
                padding: '16px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                cursor: 'pointer',
                border: 'none',
                transition: 'all 0.2s',
              }}
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke={colors.text2} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                <path d={link.icon} />
              </svg>
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 13,
                fontWeight: 700,
                color: colors.text,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
              }}>
                {link.label}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Next Event */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        style={{
          margin: '24px 16px 0',
        }}
      >
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Coming Up
        </div>
        <div style={{
          position: 'relative',
          borderRadius: radius.card,
          overflow: 'hidden',
          height: 180,
        }}>
          <img
            src={P.event}
            alt="Next Event"
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
            background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: 16,
            left: 16,
            right: 16,
          }}>
            <div style={{
              display: 'inline-block',
              padding: '4px 10px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: radius.pill,
              fontFamily: fonts.sans,
              fontSize: 10,
              fontWeight: 600,
              color: colors.text,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}>
              Refresher Workshop
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 18,
              fontWeight: 800,
              color: colors.text,
              textTransform: 'uppercase',
              letterSpacing: -0.3,
            }}>
              Posture & Presence Lab
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 12,
              fontWeight: 500,
              color: colors.text2,
              marginTop: 4,
            }}>
              Apr 12 — 5 days away — 8 spots left
            </div>
          </div>
        </div>
      </motion.div>

      {/* Community Wins */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ margin: '28px 16px 0' }}
      >
        <div style={{
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
          marginBottom: 12,
        }}>
          Community Wins
        </div>
        {communityWins.map((win, i) => (
          <div key={i} style={{
            background: colors.surface,
            borderRadius: radius.card,
            padding: 16,
            marginBottom: 12,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                overflow: 'hidden',
                flexShrink: 0,
              }}>
                <img src={win.avatar} alt={win.name} style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%)',
                }} />
              </div>
              <div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: 14,
                  fontWeight: 700,
                  color: colors.text,
                }}>
                  {win.name}
                </div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  fontWeight: 500,
                  color: colors.text3,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}>
                  Season {win.season.replace('S', '')} Alumni
                </div>
              </div>
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 14,
              fontWeight: 400,
              color: colors.text2,
              lineHeight: 1.6,
            }}>
              {win.text}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Weekly Recap — Corella-specific */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        style={{
          margin: '16px 16px 0',
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
          marginBottom: 16,
        }}>
          This Week
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {[
            { label: 'Sparks', value: '12' },
            { label: 'Refreshers', value: '3' },
            { label: 'Shoots', value: '1' },
            { label: 'Wins Shared', value: '4' },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
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
                marginTop: 4,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
