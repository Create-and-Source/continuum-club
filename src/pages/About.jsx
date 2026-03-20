import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'

const values = [
  { title: 'Skill Development', desc: 'Posing, runway walks, and emoting techniques with hands-on workshops' },
  { title: 'Industry Knowledge', desc: 'Modeling types, industry standards, and market expectations' },
  { title: 'Personal Development', desc: 'Personal branding, social media presence, and portfolio creation' },
  { title: 'Community Building', desc: 'A supportive environment emphasizing peer growth and teamwork' },
  { title: 'Networking', desc: 'Creating and maintaining professional connections for career opportunities' },
  { title: 'Health & Wellness', desc: 'Physical and mental health as the foundation for success' },
]

export default function About() {
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
          We are working towards breaking perceptions and standards by creating positive attitudes and confident, skillful models. Our curriculum-based program focuses on educating and developing each student with intention — coaching through self-confidence challenges, promoting balanced mental health, and helping individuals achieve self-acceptance.
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
          Our curriculum-based training program for aspiring models. No experience needed — just curiosity and a desire to grow. Step-by-step guidance through a clear curriculum with a team committed to your development, both in front of the camera and beyond.
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

      {/* Locations */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ margin: '24px 16px 0' }}>
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
