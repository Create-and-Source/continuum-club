import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

const alumniQuotes = [
  { name: 'Brianna Pettit', season: 'Season 9', quote: 'Corella & Co gave me the confidence to walk into any room and own it. I learned to carry myself with intention.' },
  { name: 'Emily Acosta', season: 'Season 9', quote: 'I stopped waiting for permission to be powerful. The runway taught me how to show up fully in every space.' },
  { name: 'Chris Lopez', season: 'Season 9', quote: 'This program changed more than my walk — it changed how I see myself. The discipline and growth are real.' },
  { name: 'Prince Kanta', season: 'Alumni', quote: 'Posture changed first. Then confidence. Then how people responded to me. The transformation is physical and mental.' },
  { name: 'Rahma Majid', season: 'Alumni', quote: 'You do not shrink for anyone. You expand. That is the lesson Corella taught me and I carry it everywhere.' },
  { name: 'Jessica Dietmeyer', season: 'Alumni', quote: 'I came in with no experience and left with a portfolio, a community, and a belief in myself I never had before.' },
  { name: 'Paris Woods', season: 'Alumni', quote: 'The people you meet here become your lifelong network. Corella builds models but more importantly builds people.' },
  { name: 'Amaya Tellez', season: 'Alumni', quote: 'The curriculum is real and the coaches are invested. You will be challenged and you will grow. That is a promise.' },
]

const industryQuotes = [
  {
    name: 'The Collective Media Agency',
    role: 'Industry Partner',
    quote: 'Corella & Co students consistently show up more prepared, more professional, and more confident than anyone we work with. The training speaks for itself.',
  },
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

      {/* Alumni Quotes Grid */}
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

      {/* Industry Partners */}
      <div style={{ margin: '32px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          Industry Partners
        </div>
        {industryQuotes.map((q, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} style={{
            background: colors.surface, borderRadius: radius.card, padding: 24, border: `1px solid ${colors.border}`,
          }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 17, fontWeight: 400, color: colors.text2, lineHeight: 1.7, fontStyle: 'italic', marginBottom: 20 }}>
              "{q.quote}"
            </div>
            <div>
              <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.3 }}>
                {q.name}
              </div>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', marginTop: 2 }}>
                {q.role}
              </div>
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
