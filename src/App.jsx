import { Routes, Route } from 'react-router-dom'
import TabBar from './components/TabBar'
import Home from './pages/Home'
import Practice from './pages/Practice'
import Events from './pages/Events'
import Community from './pages/Community'
import Journey from './pages/Journey'

export default function App() {
  return (
    <div style={{
      maxWidth: 430,
      margin: '0 auto',
      height: '100dvh',
      position: 'relative',
      overflow: 'hidden',
      background: '#0D0D0D',
    }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/events" element={<Events />} />
        <Route path="/community" element={<Community />} />
        <Route path="/journey" element={<Journey />} />
      </Routes>
      <TabBar />
    </div>
  )
}
