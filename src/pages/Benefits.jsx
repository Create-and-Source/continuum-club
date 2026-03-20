import { useState } from 'react'
import { motion } from 'framer-motion'
import { colors, fonts, radius } from '../theme'
import { get, set } from '../store'

const benefitData = [
  { id: 'b1', title: 'Monthly Runway & Posing Refreshers', desc: '1hr technique sessions', total: 4 },
  { id: 'b2', title: 'Updated Digitals', desc: 'Every 3 months', total: 4 },
  { id: 'b3', title: 'Portfolio Review', desc: 'Personalized advice', total: 4 },
  { id: 'b4', title: 'Open Studio Days', desc: 'Self-led practice', total: 8 },
  { id: 'b5', title: 'Test Shoot', desc: 'High-quality images', total: 4 },
  { id: 'b6', title: 'Content Creation Days', desc: 'iPhone content & reels', total: 4 },
  { id: 'b7', title: 'Check-Ins', desc: '1-on-1 mentorship', total: 12 },
  { id: 'b8', title: 'Network Night', desc: 'VIP industry networking', total: 6 },
  { id: 'b9', title: 'Private Groupchat', desc: 'Continuum Club members', total: 1 },
]

export default function Benefits() {
  const [usage, setUsage] = useState(() => get('benefitUsage', {}))

  const useBenefit = (id) => {
    const current = usage[id] || 0
    const benefit = benefitData.find(b => b.id === id)
    if (current >= benefit.total) return
    const next = { ...usage, [id]: current + 1 }
    setUsage(next)
    set('benefitUsage', next)
  }

  const benefits = benefitData.map(b => ({ ...b, used: usage[b.id] || 0 }))
  const totalOpportunities = benefits.reduce((sum, b) => sum + b.total, 0)
  const totalUsed = benefits.reduce((sum, b) => sum + b.used, 0)

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      <div style={{ padding: '56px 20px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
          Continuum Club Benefits
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 8, lineHeight: 1.5 }}>
          Your VIP membership unlocks {benefits.length} exclusive benefits. Track your usage and make the most of your membership.
        </div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
        margin: '20px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 20, display: 'flex',
      }}>
        {[
          { label: 'Total Usage', value: totalUsed, sub: `of ${totalOpportunities} total opportunities` },
          { label: 'Progress', value: `${Math.round((totalUsed / totalOpportunities) * 100)}%`, sub: 'annual utilization' },
          { label: 'Status', value: 'Active', sub: 'membership current' },
        ].map((stat, i) => (
          <div key={i} style={{ flex: 1 }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 6 }}>{stat.label}</div>
            <div style={{ fontFamily: fonts.sans, fontSize: stat.label === 'Status' ? 20 : 28, fontWeight: 900, color: colors.text, lineHeight: 1, marginBottom: 4 }}>{stat.value}</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: colors.text3 }}>{stat.sub}</div>
          </div>
        ))}
      </motion.div>

      <div style={{ margin: '16px 16px 0' }}>
        <div style={{ height: 6, borderRadius: 3, background: 'rgba(255,255,255,0.1)', overflow: 'hidden' }}>
          <motion.div initial={{ width: 0 }} animate={{ width: `${Math.max((totalUsed / totalOpportunities) * 100, 2)}%` }}
            transition={{ delay: 0.3, duration: 0.8 }} style={{ height: '100%', background: '#FFFFFF', borderRadius: 3 }} />
        </div>
      </div>

      <div style={{ margin: '28px 16px 16px', fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase' }}>
        Your Benefits
      </div>

      <div style={{ margin: '0 16px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {benefits.map((b, i) => {
          const remaining = b.total - b.used
          const pct = (b.used / b.total) * 100
          const full = remaining <= 0
          return (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.04 }}
              style={{ background: colors.surface, borderRadius: radius.card, padding: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: 180 }}>
              <div>
                <div style={{ display: 'inline-block', padding: '3px 8px', border: `1px solid ${colors.border}`, borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 0.5, marginBottom: 10 }}>
                  {i + 1} of {benefits.length}
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.2, lineHeight: 1.3, marginBottom: 4 }}>{b.title}</div>
                <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3 }}>{b.desc}</div>
              </div>
              <div style={{ marginTop: 14 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                  <span style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1, textTransform: 'uppercase' }}>Usage</span>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 2 }}>
                    <span style={{ fontFamily: fonts.sans, fontSize: 20, fontWeight: 900, color: colors.text, lineHeight: 1 }}>{b.used}</span>
                    <span style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3 }}>/{b.total}</span>
                  </div>
                </div>
                <div style={{ height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.1)', overflow: 'hidden', marginBottom: 6 }}>
                  <div style={{ height: '100%', width: `${Math.max(pct, 4)}%`, background: pct > 75 ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.3)', borderRadius: 2, transition: 'width 0.3s' }} />
                </div>
                <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 400, color: colors.text3, textAlign: 'right', marginBottom: 8 }}>
                  {remaining} {remaining === 1 ? 'opportunity' : 'opportunities'} remaining
                </div>
                <button onClick={() => useBenefit(b.id)} style={{
                  width: '100%', padding: '6px 0', borderRadius: radius.pill, border: 'none',
                  background: full ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.1)',
                  fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: full ? colors.text3 : colors.text2,
                  letterSpacing: 0.5, textTransform: 'uppercase', cursor: full ? 'default' : 'pointer', transition: 'all 0.2s',
                }}>
                  {full ? 'Fully Used' : 'Log Usage'}
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
