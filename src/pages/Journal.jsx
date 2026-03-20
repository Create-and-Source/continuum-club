import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

const prompts = [
  'What scared you this week — and what did you do anyway?',
  'Name one moment where you showed up differently than you used to.',
  'What would the most confident version of you do tomorrow?',
  'Who noticed you this week? How did that feel?',
  'What are you holding onto that you need to release?',
]

const pastEntries = [
  { date: 'Mar 18', mood: 'Strong', type: 'prompted', preview: 'I used to avoid mirrors. Now I seek them out. The mirror talk exercise changed everything for me...' },
  { date: 'Mar 16', mood: 'On Fire', type: 'free', preview: 'Walked into that meeting like I owned the room. Shoulders back, chin up, eye contact. They noticed...' },
  { date: 'Mar 14', mood: 'Gentle', type: 'prompted', preview: 'Some days confidence is quiet. Today was a quiet day and that is okay. I am still growing...' },
  { date: 'Mar 12', mood: 'Steady', type: 'free', preview: 'Did the Before I Walk ritual twice today. Once before the shoot, once before dinner with her parents...' },
  { date: 'Mar 10', mood: 'Working On It', type: 'prompted', preview: 'Imposter syndrome hit hard at the networking event. But I stayed. I stayed the whole time...' },
]

const moodHistory = [
  { day: 'Mon', mood: 'Strong' },
  { day: 'Tue', mood: 'On Fire' },
  { day: 'Wed', mood: 'Steady' },
  { day: 'Thu', mood: 'Strong' },
  { day: 'Fri', mood: 'Gentle' },
  { day: 'Sat', mood: 'On Fire' },
  { day: 'Sun', mood: 'Steady' },
]

const moodLevels = { 'On Fire': 5, 'Strong': 4, 'Steady': 3, 'Working On It': 2, 'Gentle': 1 }

export default function Journal() {
  const [activeTab, setActiveTab] = useState('Write')
  const [entry, setEntry] = useState('')
  const [showSaved, setShowSaved] = useState(false)
  const [currentPrompt] = useState(() => prompts[Math.floor(Math.random() * prompts.length)])

  const handleSave = () => {
    if (!entry.trim()) return
    setShowSaved(true)
    setTimeout(() => {
      setShowSaved(false)
      setEntry('')
    }, 2000)
  }

  const tabs = ['Write', 'History', 'Mood Map']

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Header */}
      <div style={{ position: 'relative', height: 200, overflow: 'hidden' }}>
        <img
          src={P.studio}
          alt="Journal"
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
            Safe Space
          </div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            fontWeight: 400,
            color: colors.text2,
            marginTop: 6,
          }}>
            Your private journal. No one sees this but you.
          </div>
        </div>
      </div>

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
              fontSize: 12,
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

      {/* Write Tab */}
      {activeTab === 'Write' && (
        <div style={{ marginTop: 20 }}>
          {/* Daily Prompt */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              margin: '0 16px 16px',
              background: colors.surface,
              borderRadius: radius.card,
              padding: 18,
            }}
          >
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 10,
              fontWeight: 600,
              color: colors.text3,
              letterSpacing: 1.5,
              textTransform: 'uppercase',
              marginBottom: 10,
            }}>
              Today's Prompt
            </div>
            <div style={{
              fontFamily: fonts.sans,
              fontSize: 16,
              fontWeight: 700,
              color: colors.text,
              lineHeight: 1.5,
            }}>
              {currentPrompt}
            </div>
          </motion.div>

          {/* Text Area */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            style={{
              margin: '0 16px',
              background: colors.surface,
              borderRadius: radius.card,
              padding: 18,
            }}
          >
            <textarea
              value={entry}
              onChange={e => setEntry(e.target.value)}
              placeholder="Start writing..."
              style={{
                width: '100%',
                minHeight: 180,
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: fonts.sans,
                fontSize: 15,
                fontWeight: 400,
                color: colors.text,
                lineHeight: 1.7,
                resize: 'none',
              }}
            />
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 12,
              paddingTop: 12,
              borderTop: `1px solid ${colors.border}`,
            }}>
              <span style={{
                fontFamily: fonts.sans,
                fontSize: 11,
                fontWeight: 400,
                color: colors.text3,
              }}>
                {entry.length > 0 ? `${entry.split(/\s+/).filter(Boolean).length} words` : 'Private entry'}
              </span>
              <button
                onClick={handleSave}
                style={{
                  padding: '8px 20px',
                  borderRadius: radius.pill,
                  background: entry.trim() ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
                  color: entry.trim() ? '#0D0D0D' : colors.text3,
                  fontFamily: fonts.sans,
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                  cursor: entry.trim() ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                }}
              >
                Save
              </button>
            </div>
          </motion.div>

          {/* Saved confirmation */}
          <AnimatePresence>
            {showSaved && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                style={{
                  margin: '12px 16px 0',
                  padding: '12px 16px',
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: radius.card,
                  fontFamily: fonts.sans,
                  fontSize: 13,
                  fontWeight: 600,
                  color: colors.text2,
                  textAlign: 'center',
                }}
              >
                Saved to your journal
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* History Tab */}
      {activeTab === 'History' && (
        <div style={{ marginTop: 20 }}>
          {pastEntries.map((e, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              style={{
                margin: '0 16px 12px',
                background: colors.surface,
                borderRadius: radius.card,
                padding: 16,
                cursor: 'pointer',
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <span style={{
                    fontFamily: fonts.sans,
                    fontSize: 12,
                    fontWeight: 600,
                    color: colors.text2,
                  }}>
                    {e.date}
                  </span>
                  <span style={{
                    padding: '2px 8px',
                    borderRadius: radius.pill,
                    background: 'rgba(255,255,255,0.08)',
                    fontFamily: fonts.sans,
                    fontSize: 10,
                    fontWeight: 500,
                    color: colors.text3,
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                  }}>
                    {e.type}
                  </span>
                </div>
                <span style={{
                  padding: '2px 8px',
                  borderRadius: radius.pill,
                  border: `1px solid ${colors.border}`,
                  fontFamily: fonts.sans,
                  fontSize: 10,
                  fontWeight: 600,
                  color: colors.text3,
                  textTransform: 'uppercase',
                  letterSpacing: 0.5,
                }}>
                  {e.mood}
                </span>
              </div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 14,
                fontWeight: 400,
                color: colors.text2,
                lineHeight: 1.6,
              }}>
                {e.preview}
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Mood Map Tab */}
      {activeTab === 'Mood Map' && (
        <div style={{ marginTop: 20 }}>
          {/* This Week */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              margin: '0 16px 20px',
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
              This Week's Mood
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              gap: 8,
              height: 120,
            }}>
              {moodHistory.map((d, i) => (
                <div key={i} style={{
                  flex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${(moodLevels[d.mood] / 5) * 100}%` }}
                    transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                    style={{
                      width: '100%',
                      background: moodLevels[d.mood] >= 4 ? '#FFFFFF' : 'rgba(255,255,255,0.3)',
                      borderRadius: 4,
                      minHeight: 8,
                    }}
                  />
                  <span style={{
                    fontFamily: fonts.sans,
                    fontSize: 10,
                    fontWeight: 500,
                    color: colors.text3,
                  }}>
                    {d.day}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Mood Distribution */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            style={{
              margin: '0 16px',
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
              How You've Shown Up
            </div>
            {['On Fire', 'Strong', 'Steady', 'Working On It', 'Gentle'].map((mood, i) => {
              const count = moodHistory.filter(d => d.mood === mood).length
              return (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 12,
                }}>
                  <span style={{
                    fontFamily: fonts.sans,
                    fontSize: 12,
                    fontWeight: 600,
                    color: colors.text2,
                    width: 100,
                    flexShrink: 0,
                  }}>
                    {mood}
                  </span>
                  <div style={{
                    flex: 1,
                    height: 6,
                    borderRadius: 3,
                    background: 'rgba(255,255,255,0.08)',
                    overflow: 'hidden',
                  }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(count / 7) * 100}%` }}
                      transition={{ delay: 0.3 + i * 0.1, duration: 0.5 }}
                      style={{
                        height: '100%',
                        background: count > 0 ? '#FFFFFF' : 'transparent',
                        borderRadius: 3,
                      }}
                    />
                  </div>
                  <span style={{
                    fontFamily: fonts.sans,
                    fontSize: 12,
                    fontWeight: 700,
                    color: colors.text3,
                    width: 20,
                    textAlign: 'right',
                  }}>
                    {count}
                  </span>
                </div>
              )
            })}
          </motion.div>
        </div>
      )}
    </div>
  )
}
