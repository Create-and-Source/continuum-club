import { useState } from 'react'
import { motion } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set } from '../store'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)

  const handleSend = () => {
    if (!name.trim() || !email.trim() || !message.trim()) return
    const messages = get('contactMessages', [])
    messages.push({ name, email, message, date: new Date().toISOString() })
    set('contactMessages', messages)
    setSent(true)
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Header */}
      <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
        <img src={P.community} alt="Contact" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
            Contact
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 6 }}>
            Get in touch with Corella & Co
          </div>
        </div>
      </div>

      {/* Quick Info */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ margin: '20px 16px 0' }}>
        {[
          { label: 'Email', value: 'arts@corellandco.com', action: () => window.location.href = 'mailto:arts@corellandco.com' },
          { label: 'Scottsdale', value: '4235 N Marshall Way, Suite 200', sub: 'Scottsdale, AZ 85251' },
          { label: 'Phoenix', value: '515 East Grant Street', sub: 'Phoenix, AZ 85004' },
          { label: 'Hours', value: 'Appointment Only' },
        ].map((item, i) => (
          <div key={i} onClick={item.action} style={{
            background: colors.surface, padding: 16, cursor: item.action ? 'pointer' : 'default',
            borderRadius: i === 0 ? `${radius.card}px ${radius.card}px 0 0` : i === 3 ? `0 0 ${radius.card}px ${radius.card}px` : 0,
            borderBottom: i < 3 ? `1px solid ${colors.border}` : 'none',
          }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
              {item.label}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 15, fontWeight: 600, color: colors.text }}>
              {item.value}
            </div>
            {item.sub && (
              <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text3, marginTop: 2 }}>
                {item.sub}
              </div>
            )}
          </div>
        ))}
      </motion.div>

      {/* Social */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{
        margin: '20px 16px 0', display: 'flex', gap: 10,
      }}>
        {[
          { label: 'Instagram', handle: '@corellandco', url: 'https://instagram.com/corellandco' },
          { label: 'Facebook', handle: '@corellandco', url: 'https://facebook.com/corellandco' },
        ].map((s, i) => (
          <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" style={{
            flex: 1, background: colors.surface, borderRadius: radius.card, padding: 16, textDecoration: 'none', textAlign: 'center',
          }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
              {s.label}
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text }}>
              {s.handle}
            </div>
          </a>
        ))}
      </motion.div>

      {/* Website */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.18 }} style={{ margin: '12px 16px 0' }}>
        <a href="https://www.corellandco.com" target="_blank" rel="noopener noreferrer" style={{
          display: 'block', background: colors.surface, borderRadius: radius.card, padding: 16, textDecoration: 'none', textAlign: 'center',
        }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 10, fontWeight: 600, color: colors.text3, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 4 }}>
            Website
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 700, color: colors.text }}>
            www.corellandco.com
          </div>
        </a>
      </motion.div>

      {/* Contact Form */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ margin: '24px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          Send a Message
        </div>

        {!sent ? (
          <div style={{ background: colors.surface, borderRadius: radius.card, padding: 16 }}>
            {[
              { label: 'Name', value: name, set: setName, placeholder: 'Your name' },
              { label: 'Email', value: email, set: setEmail, placeholder: 'your@email.com' },
            ].map((f, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <input value={f.value} onChange={e => f.set(e.target.value)} placeholder={f.placeholder}
                  style={{
                    width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`,
                    borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 14, color: colors.text, outline: 'none',
                  }} />
              </div>
            ))}
            <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Your message..."
              style={{
                width: '100%', minHeight: 100, padding: '12px 14px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`,
                borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 14, color: colors.text, outline: 'none', resize: 'none', lineHeight: 1.6, marginBottom: 12,
              }} />
            <button onClick={handleSend} style={{
              width: '100%', padding: '14px 0', borderRadius: radius.card, border: 'none',
              background: (name.trim() && email.trim() && message.trim()) ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
              color: (name.trim() && email.trim() && message.trim()) ? '#0D0D0D' : colors.text3,
              fontFamily: fonts.sans, fontSize: 14, fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', cursor: 'pointer',
            }}>
              Send Message
            </button>
          </div>
        ) : (
          <div style={{ background: colors.surface, borderRadius: radius.card, padding: 24, textAlign: 'center' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 16, fontWeight: 800, color: colors.text, textTransform: 'uppercase', marginBottom: 6 }}>Message Sent</div>
            <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text3 }}>We'll get back to you soon.</div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
