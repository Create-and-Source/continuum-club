import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

const alumniQuotes = [
  { name: 'Brianna Pettit', season: 'Season 9', quote: 'This school got me through the darkest period of my life and gave me something to dream about.' },
  { name: 'Chris Lopez', season: 'Season 9', quote: 'This program not only gives you the tools and skills necessary to succeed in the industry, but you are constantly surrounded by mentors who care about you.' },
  { name: 'Esmeralda Sierra', season: 'Season 10', quote: 'Corella & Co was a game-changer for me. Their professional and structured program goes beyond just modeling.' },
  { name: 'Janny Nguyen', season: 'Season 8', quote: 'From building my posing confidence to having a family dedicated towards my growth; I cannot begin to thank them for their unconditional support.' },
]

const alumniByseason = [
  { season: 10, names: ['Esmeralda Sierra'] },
  { season: 9, names: ['Brianna Pettit', 'Emily Acosta', 'Chris Lopez'] },
  { season: 8, names: ['Janny Nguyen', 'Vanessa Flores'] },
  { season: 7, names: ['Cole Johnson', 'Jaidyn Hamilton', 'Jessica Dietmeyer'] },
  { season: 3, names: ['Paris Woods'] },
  { season: 2, names: ['Mickey Albanez', 'Yasmin Flores'] },
]

export default function Testimonials() {
  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        <img src={P.community} alt="Alumni" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
          <img src={P.logo} alt="Corella & Co" style={{ height: 32, marginBottom: 12, opacity: 0.7 }} />
          <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
            Their Words
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 6, lineHeight: 1.5 }}>
            Real stories from real alumni
          </div>
        </div>
      </div>

      {/* Alumni Testimonials */}
      <div style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          Alumni Testimonials
        </div>
        <div className="cc-content-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          {alumniQuotes.map((q, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 + i * 0.04 }} style={{
              background: colors.surface, borderRadius: radius.card, padding: 20,
            }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text2, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 16 }}>
                "{q.quote}"
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(255,255,255,0.3)' }} />
                <div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text }}>
                    {q.name}
                  </div>
                  <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 400, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                    {q.season}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Alumni Directory */}
      <div style={{ margin: '32px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          Alumni by Season
        </div>
        {alumniByseason.map((group, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.04 }} style={{
            background: colors.surface, borderRadius: radius.card, padding: 16, marginBottom: 10,
          }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 6 }}>
              Season {group.season}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, lineHeight: 1.6 }}>
              {group.names.join(' · ')}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} style={{
        margin: '32px 16px 0', textAlign: 'center', padding: '24px 20px',
        background: colors.surface, borderRadius: radius.card,
      }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text2, lineHeight: 1.6, marginBottom: 8 }}>
          Ready to write your own story?
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text, letterSpacing: 1, textTransform: 'uppercase' }}>
          Season 18 — Now Enrolling
        </div>
      </motion.div>
    </div>
  )
}
