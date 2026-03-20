import { useLocation, useNavigate } from 'react-router-dom'
import { colors, fonts } from '../theme'

const tabs = [
  { path: '/', label: 'Home', icon: HomeIcon },
  { path: '/practice', label: 'Practice', icon: PracticeIcon },
  { path: '/events', label: 'Events', icon: EventsIcon },
  { path: '/community', label: 'Community', icon: CommunityIcon },
  { path: '/profile', label: 'Profile', icon: ProfileIcon },
]

export default function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()

  return (
    <nav className="cc-tabbar" style={{
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(13,13,13,0.92)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${colors.border}`,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      paddingBottom: 'env(safe-area-inset-bottom, 8px)',
      paddingTop: 8,
      zIndex: 100,
    }}>
      {tabs.map(tab => {
        const active = location.pathname === tab.path
        const Icon = tab.icon
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 2,
              cursor: 'pointer',
              padding: '4px 12px',
              transition: 'all 0.2s',
            }}
          >
            <Icon color={active ? colors.accent : colors.text3} size={22} />
            <span style={{
              fontFamily: fonts.sans,
              fontSize: 10,
              fontWeight: active ? 600 : 400,
              color: active ? colors.accent : colors.text3,
              letterSpacing: 0.5,
              textTransform: 'uppercase',
            }}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}

function HomeIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

function PracticeIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  )
}

function EventsIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

function CommunityIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 00-3-3.87" />
      <path d="M16 3.13a4 4 0 010 7.75" />
    </svg>
  )
}

function ProfileIcon({ color, size }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
