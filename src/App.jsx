import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom'
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
import { colors, fonts, radius, P } from './theme'
import { get, set } from './store'

const quotes = [
  { text: 'Confidence is not a feeling. It is a decision.', author: 'Jasmine R.', season: 'S14' },
  { text: 'The runway taught me how to walk into any room.', author: 'Destiny M.', season: 'S12' },
  { text: 'I stopped waiting for permission to be powerful.', author: 'Nia K.', season: 'S11' },
  { text: 'Posture changed first. Then everything else followed.', author: 'Aria T.', season: 'S13' },
  { text: 'You do not shrink for anyone. You expand.', author: 'Zara L.', season: 'S10' },
]

// Guest pages — no tab bar
const guestPaths = ['/about', '/contact', '/apply']

function GateScreen({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9998,
        background: '#0D0D0D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <img src={P.training} alt="" style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        objectFit: 'cover', objectPosition: 'center top', filter: 'grayscale(100%) brightness(0.2)',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)' }} />

      <div style={{ position: 'relative', zIndex: 1, padding: '0 32px', maxWidth: 430, width: '100%', textAlign: 'center' }}>
        <img src={P.logo} alt="Corella & Co" style={{ height: 36, marginBottom: 40, opacity: 0.8 }} />

        <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 500, color: 'rgba(255,255,255,0.4)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 32 }}>
          Welcome
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={() => onSelect('guest')} style={{
            width: '100%', padding: '18px 0', borderRadius: radius.card,
            border: `1px solid rgba(255,255,255,0.2)`, background: 'transparent',
            fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, color: '#FFFFFF',
            letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            Guest
          </button>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.3)', marginTop: -4, marginBottom: 4 }}>
            Learn about Corella & Co
          </div>

          <button onClick={() => onSelect('applicant')} style={{
            width: '100%', padding: '18px 0', borderRadius: radius.card,
            border: `1px solid rgba(255,255,255,0.2)`, background: 'transparent',
            fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, color: '#FFFFFF',
            letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            Apply
          </button>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.3)', marginTop: -4, marginBottom: 4 }}>
            Join the MODEL Academy
          </div>

          <button onClick={() => onSelect('member')} style={{
            width: '100%', padding: '18px 0', borderRadius: radius.card,
            background: '#FFFFFF', border: 'none',
            fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, color: '#0D0D0D',
            letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s',
          }}>
            Member Login
          </button>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.3)', marginTop: -4 }}>
            Continuum Club members
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function RoleScreen({ onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9997,
        background: '#0D0D0D', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      }}
    >
      <div style={{ position: 'relative', zIndex: 1, padding: '0 32px', maxWidth: 430, width: '100%', textAlign: 'center' }}>
        <img src={P.logo} alt="Corella & Co" style={{ height: 32, marginBottom: 32, opacity: 0.6 }} />

        <div style={{ fontFamily: fonts.sans, fontSize: 22, fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>
          Log In As
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: 'rgba(255,255,255,0.4)', marginBottom: 40 }}>
          Select your role to continue
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <button onClick={() => onSelect('member')} style={{
            width: '100%', padding: '18px 0', borderRadius: radius.card,
            background: '#FFFFFF', border: 'none',
            fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, color: '#0D0D0D',
            letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
          }}>
            Member
          </button>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.3)', marginTop: -4, marginBottom: 4 }}>
            Brianna Cole · Season 14
          </div>

          <button onClick={() => onSelect('mentor')} style={{
            width: '100%', padding: '18px 0', borderRadius: radius.card,
            border: `1px solid rgba(255,255,255,0.25)`, background: 'transparent',
            fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, color: '#FFFFFF',
            letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
          }}>
            Mentor
          </button>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.3)', marginTop: -4, marginBottom: 4 }}>
            Corella · Mentor Portal
          </div>

          <button onClick={() => onSelect('admin')} style={{
            width: '100%', padding: '18px 0', borderRadius: radius.card,
            border: `1px solid rgba(255,255,255,0.25)`, background: 'transparent',
            fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, color: '#FFFFFF',
            letterSpacing: 2, textTransform: 'uppercase', cursor: 'pointer',
          }}>
            Admin
          </button>
          <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.3)', marginTop: -4 }}>
            Staff Dashboard
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Guest nav bar for guest/applicant views
function GuestNav({ onBack }) {
  const navigate = useNavigate()
  const location = useLocation()

  const links = [
    { path: '/about', label: 'About' },
    { path: '/apply', label: 'Apply' },
    { path: '/contact', label: 'Contact' },
  ]

  return (
    <nav style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(13,13,13,0.92)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${colors.border}`, display: 'flex', justifyContent: 'space-around', alignItems: 'center',
      paddingBottom: 'env(safe-area-inset-bottom, 8px)', paddingTop: 8, zIndex: 100,
    }}>
      <button onClick={onBack} style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer', padding: '4px 12px',
      }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={colors.text3} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 400, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase' }}>Back</span>
      </button>
      {links.map(link => {
        const active = location.pathname === link.path
        return (
          <button key={link.path} onClick={() => navigate(link.path)} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, cursor: 'pointer', padding: '4px 12px',
          }}>
            <span style={{
              fontFamily: fonts.sans, fontSize: 12, fontWeight: active ? 700 : 500, color: active ? colors.accent : colors.text3,
              letterSpacing: 0.5, textTransform: 'uppercase',
            }}>{link.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

export default function App() {
  const [showSplash, setShowSplash] = useState(true)
  const [imgReady, setImgReady] = useState(false)
  const [quote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)])
  const [userPath, setUserPath] = useState(() => get('userPath', null)) // 'guest' | 'applicant' | 'member'
  const [userRole, setUserRole] = useState(() => get('userRole', null)) // 'member' | 'mentor' | 'admin'
  const [showGate, setShowGate] = useState(!userPath)
  const [showRoleSelect, setShowRoleSelect] = useState(false)

  useEffect(() => {
    const img = new Image()
    img.onload = () => setImgReady(true)
    img.onerror = () => setImgReady(true)
    img.src = P.hero
  }, [])

  useEffect(() => {
    if (showSplash && imgReady) {
      const timer = setTimeout(() => setShowSplash(false), 4500)
      return () => clearTimeout(timer)
    }
  }, [showSplash, imgReady])

  const handleGateSelect = (path) => {
    if (path === 'member') {
      setShowGate(false)
      setShowRoleSelect(true)
    } else {
      setUserPath(path)
      set('userPath', path)
      setShowGate(false)
    }
  }

  const handleRoleSelect = (role) => {
    setUserRole(role)
    setUserPath('member')
    set('userRole', role)
    set('userPath', 'member')
    setShowRoleSelect(false)
  }

  const handleBackToGate = () => {
    setUserPath(null)
    setUserRole(null)
    set('userPath', null)
    set('userRole', null)
    setShowGate(true)
  }

  const isGuest = userPath === 'guest' || userPath === 'applicant'
  const isMember = userPath === 'member'
  const showMemberTabBar = isMember && !showGate && !showRoleSelect && !showSplash

  return (
    <div style={{
      maxWidth: 430, margin: '0 auto', height: '100dvh', position: 'relative',
      overflowX: 'hidden', overflowY: 'auto', background: '#0D0D0D',
    }}>
      {/* Splash */}
      <AnimatePresence>
        {showSplash && (
          <motion.div key="splash" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}
            onClick={() => setShowSplash(false)}
            style={{
              position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999,
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', background: '#000000',
            }}
          >
            {imgReady && (
              <img src={P.hero} alt="" style={{
                position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
                objectFit: 'cover', filter: 'grayscale(100%) brightness(0.35)',
              }} />
            )}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.45)' }} />
            {imgReady && (
              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 32px', maxWidth: 430 }}>
                <img src={P.logo} alt="Corella & Co" style={{ height: 40, marginBottom: 48, opacity: 0.9 }} />
                <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}
                  style={{ fontFamily: fonts.sans, fontSize: 22, fontWeight: 900, color: '#FFFFFF', textTransform: 'uppercase', textAlign: 'center', letterSpacing: 1, lineHeight: 1.35, marginBottom: 20 }}>
                  "{quote.text}"
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.6 }}
                  style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 500, color: 'rgba(255,255,255,0.5)', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 60 }}>
                  {quote.author} — {quote.season}
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0.5] }} transition={{ delay: 1.5, duration: 1.5 }}
                  style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.4)', letterSpacing: 3, textTransform: 'uppercase' }}>
                  Tap to enter
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gate Screen */}
      <AnimatePresence>
        {!showSplash && showGate && <GateScreen onSelect={handleGateSelect} />}
      </AnimatePresence>

      {/* Role Select Screen */}
      <AnimatePresence>
        {!showSplash && showRoleSelect && <RoleScreen onSelect={handleRoleSelect} />}
      </AnimatePresence>

      {/* Routes */}
      <Routes>
        {/* Guest / Applicant pages */}
        <Route path="/about" element={<About />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/contact" element={<Contact />} />

        {/* Member pages */}
        <Route path="/" element={
          userRole === 'admin' ? <Admin /> :
          userRole === 'mentor' ? <MentorPortal /> :
          <Home />
        } />
        <Route path="/practice" element={<Practice />} />
        <Route path="/events" element={<Events />} />
        <Route path="/community" element={<Community />} />
        <Route path="/journey" element={<Journey />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/mentorship" element={<Mentorship />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/mentor-portal" element={<MentorPortal />} />
      </Routes>

      {/* Navigation */}
      {showMemberTabBar && <TabBar />}
      {isGuest && !showGate && <GuestNav onBack={handleBackToGate} />}
    </div>
  )
}
