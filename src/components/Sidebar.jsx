import { useLocation, useNavigate } from 'react-router-dom'
import { colors, fonts, P } from '../theme'

const memberLinks = [
  { path: '/', label: 'Home', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
  { path: '/practice', label: 'Practice', icon: 'M5 3l14 9-14 9V3z' },
  { path: '/events', label: 'Events', icon: 'M3 4h18v18H3V4zm5-2v4m8-4v4M3 10h18' },
  { path: '/community', label: 'Community', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100-8 4 4 0 000 8m7 14v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75' },
  { path: '/profile', label: 'Profile', icon: 'M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 7a4 4 0 100-8 4 4 0 000 8' },
]

const guestLinks = [
  { path: '/about', label: 'About' },
  { path: '/testimonials', label: 'Testimonials' },
  { path: '/apply', label: 'Apply' },
  { path: '/contact', label: 'Contact' },
]

export default function Sidebar({ userPath, userRole, onBack }) {
  const location = useLocation()
  const navigate = useNavigate()

  const isGuest = userPath === 'guest' || userPath === 'applicant'
  const links = isGuest ? guestLinks : memberLinks

  return (
    <aside className="cc-sidebar">
      {/* Logo */}
      <div style={{ marginBottom: 40, paddingLeft: 4 }}>
        <img src={P.logo} alt="Corella & Co" style={{ height: 28, opacity: 0.7 }} />
      </div>

      {/* Nav links */}
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 4, flex: 1 }}>
        {links.map(link => {
          const active = location.pathname === link.path
          return (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '12px 14px', borderRadius: 12,
                background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {link.icon && (
                <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
                  stroke={active ? '#FFFFFF' : 'rgba(255,255,255,0.4)'}
                  strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                  <path d={link.icon} />
                </svg>
              )}
              <span style={{
                fontFamily: fonts.sans, fontSize: 13, fontWeight: active ? 700 : 500,
                color: active ? '#FFFFFF' : 'rgba(255,255,255,0.5)',
                letterSpacing: 0.5, textTransform: 'uppercase',
              }}>
                {link.label}
              </span>
            </button>
          )
        })}
      </nav>

      {/* Back button at bottom */}
      <button
        onClick={onBack}
        style={{
          display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px',
          borderRadius: 12, cursor: 'pointer', marginTop: 'auto',
        }}
      >
        <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        <span style={{
          fontFamily: fonts.sans, fontSize: 11, fontWeight: 500,
          color: 'rgba(255,255,255,0.35)', letterSpacing: 1, textTransform: 'uppercase',
        }}>
          Sign Out
        </span>
      </button>

      {/* User avatar */}
      {!isGuest && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '12px 8px 0', borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 12,
        }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', overflow: 'hidden' }}>
            <img src={P.t1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
          </div>
          <div>
            <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 600, color: '#FFFFFF' }}>
              {userRole === 'admin' ? 'Admin' : userRole === 'mentor' ? 'Mentor' : 'Brianna'}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 400, color: 'rgba(255,255,255,0.35)' }}>
              {userRole === 'admin' ? 'Staff' : userRole === 'mentor' ? 'Corella' : 'Season 14'}
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
