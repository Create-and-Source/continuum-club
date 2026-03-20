import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

const shoots = [
  {
    title: 'Spring Editorial',
    season: 'S14',
    date: 'Mar 2026',
    photos: [P.portrait, P.runway, P.training, P.studio],
    photographer: 'Alex Rivera',
  },
  {
    title: 'Headshot Session',
    season: 'S14',
    date: 'Feb 2026',
    photos: [P.t1, P.t3, P.community],
    photographer: 'Maya Chen',
  },
  {
    title: 'Season 14 Showcase',
    season: 'S14',
    date: 'Jan 2026',
    photos: [P.crowd, P.event, P.hero, P.t5],
    photographer: 'Corella Studios',
  },
]

export default function Portfolio() {
  const [selectedShoot, setSelectedShoot] = useState(null)
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    const shareData = {
      title: 'Brianna Cole — Portfolio',
      text: 'Check out my Corella & Co portfolio. Season 14 Alumni.',
      url: window.location.href,
    }
    try {
      if (navigator.share) {
        await navigator.share(shareData)
      } else {
        await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } catch {
      // user cancelled share
    }
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Hero — Before & After */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <div style={{ display: 'flex', height: '100%' }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <img src={P.t1} alt="Before" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 40%',
              filter: 'grayscale(100%) contrast(0.85) brightness(0.9)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.8) 100%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 16,
              left: 16,
            }}>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 10,
                fontWeight: 600,
                color: colors.text3,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 2,
              }}>Day 1</div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 18,
                fontWeight: 900,
                color: colors.text,
                textTransform: 'uppercase',
              }}>Before</div>
            </div>
          </div>
          <div style={{ width: 2, background: colors.bg }} />
          <div style={{ flex: 1, position: 'relative' }}>
            <img src={P.t1} alt="Now" style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 20%',
              filter: 'grayscale(100%) contrast(1.15) brightness(1.1)',
            }} />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.8) 100%)',
            }} />
            <div style={{
              position: 'absolute',
              bottom: 16,
              right: 16,
              textAlign: 'right',
            }}>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 10,
                fontWeight: 600,
                color: colors.text3,
                letterSpacing: 1.5,
                textTransform: 'uppercase',
                marginBottom: 2,
              }}>Season 14</div>
              <div style={{
                fontFamily: fonts.sans,
                fontSize: 18,
                fontWeight: 900,
                color: colors.text,
                textTransform: 'uppercase',
              }}>Now</div>
            </div>
          </div>
        </div>
        <div style={{
          position: 'absolute',
          top: 56,
          left: 20,
        }}>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 28,
            fontWeight: 900,
            color: colors.text,
            textTransform: 'uppercase',
            letterSpacing: -0.5,
            lineHeight: 1.1,
            textShadow: '0 2px 12px rgba(0,0,0,0.6)',
          }}>
            Portfolio
          </div>
          <div style={{
            fontFamily: fonts.sans,
            fontSize: 13,
            fontWeight: 400,
            color: colors.text2,
            marginTop: 6,
            textShadow: '0 1px 8px rgba(0,0,0,0.6)',
          }}>
            Your evolving body of work
          </div>
        </div>
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
          { value: '3', label: 'Shoots' },
          { value: '11', label: 'Photos' },
          { value: '2', label: 'Photographers' },
          { value: 'S14', label: 'Season' },
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

      {/* Shoot Gallery */}
      <div style={{ margin: '28px 0 0' }}>
        <div style={{
          margin: '0 16px 16px',
          fontFamily: fonts.sans,
          fontSize: 11,
          fontWeight: 700,
          color: colors.text3,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}>
          Photo Shoots
        </div>

        {shoots.map((shoot, si) => (
          <motion.div
            key={si}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + si * 0.08 }}
            style={{ margin: '0 16px 20px' }}
          >
            {/* Shoot header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: 12,
            }}>
              <div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: 16,
                  fontWeight: 800,
                  color: colors.text,
                  textTransform: 'uppercase',
                  letterSpacing: 0.2,
                }}>{shoot.title}</div>
                <div style={{
                  fontFamily: fonts.sans,
                  fontSize: 11,
                  fontWeight: 400,
                  color: colors.text3,
                  marginTop: 2,
                }}>{shoot.date} · {shoot.photographer}</div>
              </div>
              <div style={{
                padding: '3px 10px',
                borderRadius: radius.pill,
                border: `1px solid ${colors.border}`,
                fontFamily: fonts.sans,
                fontSize: 10,
                fontWeight: 600,
                color: colors.text3,
                letterSpacing: 1,
                textTransform: 'uppercase',
              }}>{shoot.season}</div>
            </div>

            {/* Photo grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 8,
            }}>
              {shoot.photos.map((photo, pi) => (
                <div key={pi} style={{
                  borderRadius: radius.sm,
                  overflow: 'hidden',
                  height: pi === 0 && shoot.photos.length > 2 ? 200 : 140,
                  gridRow: pi === 0 && shoot.photos.length > 2 ? 'span 2' : undefined,
                  cursor: 'pointer',
                }}>
                  <img src={photo} alt="" style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    filter: 'grayscale(100%)',
                    transition: 'filter 0.3s',
                  }} />
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Share Button */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ margin: '8px 16px 0' }}
      >
        <button onClick={handleShare} style={{
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
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
        }}>
          <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="#0D0D0D" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          {shared ? 'Link Copied' : 'Share Portfolio'}
        </button>
      </motion.div>
    </div>
  )
}
