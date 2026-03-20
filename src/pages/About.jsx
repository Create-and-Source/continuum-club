import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { colors, fonts, radius, P } from '../theme'

const values = [
  { title: 'Personalized Training', desc: 'Hands-on coaching tailored to each student — posing, runway, and presence in front of the camera' },
  { title: 'Confidence Development', desc: 'Building the mindset behind the model — self-confidence, self-acceptance, and mental health' },
  { title: 'Curriculum-Based', desc: 'A structured program that educates and develops each student with intention, step by step' },
  { title: 'Community', desc: 'A supportive environment emphasizing peer growth, teamwork, and lasting connections' },
  { title: 'Values & Character', desc: 'Fueling passions with values, vision, and character that extend beyond the industry' },
]

const testimonials = [
  { name: 'Brianna Pettit', season: 'S9', quote: 'This school got me through the darkest period of my life and gave me something to dream about.' },
  { name: 'Chris Lopez', season: 'S9', quote: 'This program not only gives you the tools and skills necessary to succeed in the industry, but you are constantly surrounded by mentors who care about you.' },
  { name: 'Esmeralda Sierra', season: 'S10', quote: 'Corella & Co was a game-changer for me. Their professional and structured program goes beyond just modeling.' },
]

export default function About() {
  const navigate = useNavigate()

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 300, overflow: 'hidden' }}>
        <img src={P.crowd} alt="Corella & Co" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
          <img src={P.logo} alt="Corella & Co" style={{ height: 36, marginBottom: 12, opacity: 0.8 }} />
          <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
            About Us
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 6, lineHeight: 1.5 }}>
            Defining the future of the arts by uplifting our youth
          </div>
        </div>
      </div>

      {/* Mission */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
        margin: '24px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 20,
      }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          Our Mission
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text2, lineHeight: 1.7 }}>
          Defining the future of the arts by uplifting our youth and fueling their passions with values, vision and character. Our curriculum-based program focuses on educating and developing each student with intention — coaching through self-confidence challenges, promoting balanced mental health, and helping individuals achieve self-acceptance.
        </div>
      </motion.div>

      {/* Program */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{
        margin: '20px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 20,
      }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          MODEL Academy
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 400, color: colors.text2, lineHeight: 1.7, marginBottom: 16 }}>
          An academy and community built for aspiring models. No experience needed — just curiosity and a desire to grow. Learn the foundations of modeling and the mindset behind it through a clear curriculum, supported by a team committed to helping you grow — both in front of the camera and beyond it.
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 700, color: colors.text, letterSpacing: 1, textTransform: 'uppercase' }}>
          Now enrolling Season 18
        </div>
      </motion.div>

      {/* What We Teach */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          What We Teach
        </div>
        {values.map((v, i) => (
          <div key={i} style={{
            background: colors.surface, borderRadius: radius.card, padding: 16, marginBottom: 10,
          }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, color: colors.text, textTransform: 'uppercase', letterSpacing: 0.3, marginBottom: 4 }}>
              {v.title}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text3, lineHeight: 1.5 }}>
              {v.desc}
            </div>
          </div>
        ))}
      </motion.div>

      {/* Testimonials Preview */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          Alumni Voices
        </div>
        {testimonials.map((t, i) => (
          <div key={i} style={{
            background: colors.surface, borderRadius: radius.card, padding: 18, marginBottom: 10,
          }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text2, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 10 }}>
              "{t.quote}"
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 700, color: colors.text }}>
              {t.name} <span style={{ fontWeight: 400, color: colors.text3, marginLeft: 4 }}>· {t.season}</span>
            </div>
          </div>
        ))}

        {/* Additional Quote */}
        <div style={{
          background: colors.surface, borderRadius: radius.card, padding: 18, marginBottom: 10,
          border: `1px solid ${colors.border}`,
        }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text2, lineHeight: 1.6, fontStyle: 'italic', marginBottom: 10 }}>
            "From building my posing confidence to having a family dedicated towards my growth; I cannot begin to thank them for their unconditional support."
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 700, color: colors.text }}>
            Janny Nguyen <span style={{ fontWeight: 400, color: colors.text3, marginLeft: 4 }}>· S8</span>
          </div>
        </div>

        <button onClick={() => navigate('/testimonials')} style={{
          width: '100%', padding: '14px 0', borderRadius: radius.card,
          border: `1px solid ${colors.border}`, background: 'transparent',
          fontFamily: fonts.sans, fontSize: 12, fontWeight: 700, color: colors.text2,
          letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer', marginTop: 4,
        }}>
          Read More Stories
        </button>
      </motion.div>

      {/* Locations */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          Locations
        </div>
        {[
          { city: 'Scottsdale', address: '4235 N Marshall Way, Suite 200', zip: 'Scottsdale, AZ 85251' },
          { city: 'Phoenix', address: '515 East Grant Street', zip: 'Phoenix, AZ 85004' },
        ].map((loc, i) => (
          <div key={i} style={{
            background: colors.surface, borderRadius: radius.card, padding: 16, marginBottom: 10,
          }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, color: colors.text, textTransform: 'uppercase', marginBottom: 4 }}>
              {loc.city}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text3, lineHeight: 1.5 }}>
              {loc.address}<br />{loc.zip}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 500, color: colors.text3, marginTop: 6, letterSpacing: 0.5, textTransform: 'uppercase' }}>
              Appointment Only
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
