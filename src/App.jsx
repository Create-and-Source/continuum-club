import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import TabBar from './components/TabBar'
import Home from './pages/Home'
import Practice from './pages/Practice'
import Events from './pages/Events'
import Community from './pages/Community'
import Journey from './pages/Journey'
import Benefits from './pages/Benefits'
import Journal from './pages/Journal'
import Portfolio from './pages/Portfolio'
import Mentorship from './pages/Mentorship'
import Profile from './pages/Profile'
import About from './pages/About'
import Apply from './pages/Apply'
import Contact from './pages/Contact'
import Admin from './pages/Admin'
import MentorPortal from './pages/MentorPortal'
import { fonts, P } from './theme'

const quotes = [
  { text: 'Confidence is not a feeling. It is a decision.', author: 'Jasmine R.', season: 'S14' },
  { text: 'The runway taught me how to walk into any room.', author: 'Destiny M.', season: 'S12' },
  { text: 'I stopped waiting for permission to be powerful.', author: 'Nia K.', season: 'S11' },
  { text: 'Posture changed first. Then everything else followed.', author: 'Aria T.', season: 'S13' },
  { text: 'You do not shrink for anyone. You expand.', author: 'Zara L.', season: 'S10' },
]

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [imgReady, setImgReady] = useState(false)
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])

  useEffect(() => {
    // preload hero image so splash isn't blank
    const img = new Image()
    img.onload = () => setImgReady(true)
    img.onerror = () => setImgReady(true) // show anyway if image fails
    img.src = P.hero
  }, [])

  useEffect(() => {
    if (showSplash && imgReady) {
      const timer = setTimeout(() => setShowSplash(false), 4500)
      return () => clearTimeout(timer)
    }
  }, [showSplash, imgReady])

  return (
    <div style={{
      maxWidth: 430,
      margin: '0 auto',
      height: '100dvh',
      position: 'relative',
      overflowX: 'hidden',
      overflowY: 'auto',
      background: '#0D0D0D',
    }}>
      <AnimatePresence>
        {showSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            onClick={() => setShowSplash(false)}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 9999,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: '#000000',
            }}
          >
            {/* Background image */}
            {imgReady && (
              <img
                src={P.hero}
                alt=""
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'grayscale(100%) brightness(0.35)',
                }}
              />
            )}
            {/* Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(0,0,0,0.45)',
            }} />

            {/* Content — only show once image loaded */}
            {imgReady && (
              <div style={{
                position: 'relative',
                zIndex: 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '0 32px',
                maxWidth: 430,
              }}>
                {/* Logo */}
                <img
                  src={P.logo}
                  alt="Corella & Co"
                  style={{
                    height: 40,
                    marginBottom: 48,
                    opacity: 0.9,
                  }}
                />

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 22,
                    fontWeight: 900,
                    color: '#FFFFFF',
                    textTransform: 'uppercase',
                    textAlign: 'center',
                    letterSpacing: 1,
                    lineHeight: 1.35,
                    marginBottom: 20,
                  }}
                >
                  "{quote.text}"
                </motion.div>

                {/* Author */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 12,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.5)',
                    letterSpacing: 2,
                    textTransform: 'uppercase',
                    marginBottom: 60,
                  }}
                >
                  {quote.author} — {quote.season}
                </motion.div>

                {/* Tap to enter */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 0.5, 0.5] }}
                  transition={{ delay: 1.5, duration: 1.5 }}
                  style={{
                    fontFamily: fonts.sans,
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'rgba(255,255,255,0.4)',
                    letterSpacing: 3,
                    textTransform: 'uppercase',
                  }}
                >
                  Tap to enter
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/events" element={<Events />} />
        <Route path="/community" element={<Community />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/about" element={<About />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mentor-portal" element={<MentorPortal />} />
      </Routes>
      <TabBar />
    </div>
  )
}
