import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { colors, fonts, radius, P } from '../theme'
import { get, set } from '../store'

export default function Apply() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [referralName, setReferralName] = useState('')
  const [referralEmail, setReferralEmail] = useState('')
  const [referralSent, setReferralSent] = useState(false)

  const handleApply = () => {
    if (!name.trim() || !email.trim()) return
    // Save application locally
    const apps = get('applications', [])
    apps.push({ name, email, phone, message, date: new Date().toISOString(), status: 'Pending' })
    set('applications', apps)
    setSubmitted(true)
  }

  const handleReferral = () => {
    if (!referralName.trim() || !referralEmail.trim()) return
    const refs = get('referrals', [])
    refs.push({ name: referralName, email: referralEmail, referredBy: 'Brianna C.', date: new Date().toISOString() })
    set('referrals', refs)
    setReferralSent(true)
    setReferralName('')
    setReferralEmail('')
    setTimeout(() => setReferralSent(false), 3000)
  }

  return (
    <div style={{ height: '100%', overflowY: 'auto', paddingBottom: 120 }}>
      {/* Hero */}
      <div style={{ position: 'relative', height: 260, overflow: 'hidden' }}>
        <img src={P.runway} alt="Apply" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(13,13,13,0.95) 100%)' }} />
        <div style={{ position: 'absolute', bottom: 24, left: 20, right: 20 }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 28, fontWeight: 900, color: colors.text, textTransform: 'uppercase', letterSpacing: -0.5, lineHeight: 1.1 }}>
            Apply
          </div>
          <div style={{ fontFamily: fonts.sans, fontSize: 13, fontWeight: 400, color: colors.text2, marginTop: 6, lineHeight: 1.5 }}>
            Ready to step into your modeling era? No experience needed — just curiosity and a desire to grow.
          </div>
        </div>
      </div>

      {/* Season Banner */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{
        margin: '20px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 18, textAlign: 'center',
      }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 6 }}>
          Now Enrolling
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 32, fontWeight: 900, color: colors.text, textTransform: 'uppercase' }}>
          Season 18
        </div>
        <div style={{ fontFamily: fonts.sans, fontSize: 12, fontWeight: 400, color: colors.text3, marginTop: 4 }}>
          Schedule your interview today
        </div>
      </motion.div>

      {/* Application Form */}
      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div key="form" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} style={{ margin: '20px 16px 0' }}>
            <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
              Application
            </div>

            {[
              { label: 'Full Name', value: name, set: setName, placeholder: 'Your name' },
              { label: 'Email', value: email, set: setEmail, placeholder: 'your@email.com' },
              { label: 'Phone', value: phone, set: setPhone, placeholder: '(555) 000-0000' },
            ].map((field, i) => (
              <div key={i} style={{ marginBottom: 12 }}>
                <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>
                  {field.label}
                </div>
                <input
                  value={field.value}
                  onChange={e => field.set(e.target.value)}
                  placeholder={field.placeholder}
                  style={{
                    width: '100%', padding: '12px 14px', background: colors.surface, border: `1px solid ${colors.border}`,
                    borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text,
                    outline: 'none',
                  }}
                />
              </div>
            ))}

            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 600, color: colors.text3, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>
                Why do you want to join?
              </div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Tell us about yourself..."
                style={{
                  width: '100%', minHeight: 100, padding: '12px 14px', background: colors.surface, border: `1px solid ${colors.border}`,
                  borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text,
                  outline: 'none', resize: 'none', lineHeight: 1.6,
                }}
              />
            </div>

            <button onClick={handleApply} style={{
              width: '100%', padding: '16px 0', borderRadius: radius.card, border: 'none',
              background: (name.trim() && email.trim()) ? '#FFFFFF' : 'rgba(255,255,255,0.1)',
              color: (name.trim() && email.trim()) ? '#0D0D0D' : colors.text3,
              fontFamily: fonts.sans, fontSize: 15, fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase',
              cursor: (name.trim() && email.trim()) ? 'pointer' : 'default', transition: 'all 0.2s',
            }}>
              Submit Application
            </button>
          </motion.div>
        ) : (
          <motion.div key="success" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} style={{
            margin: '20px 16px 0', background: colors.surface, borderRadius: radius.card, padding: 32, textAlign: 'center',
          }}>
            <svg width={48} height={48} viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 16 }}>
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <div style={{ fontFamily: fonts.sans, fontSize: 20, fontWeight: 900, color: colors.text, textTransform: 'uppercase', marginBottom: 8 }}>
              Application Received
            </div>
            <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text2, lineHeight: 1.6 }}>
              Thank you, {name}. We'll review your application and reach out to schedule your in-person interview.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Refer a Friend */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} style={{ margin: '28px 16px 0' }}>
        <div style={{ fontFamily: fonts.sans, fontSize: 11, fontWeight: 700, color: colors.text3, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 14 }}>
          Know Someone Who Needs This?
        </div>
        <div style={{ background: colors.surface, borderRadius: radius.card, padding: 16 }}>
          <div style={{ fontFamily: fonts.sans, fontSize: 14, fontWeight: 400, color: colors.text2, lineHeight: 1.6, marginBottom: 14 }}>
            Referral slots are open for alumni. Send them our way.
          </div>
          <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
            <input value={referralName} onChange={e => setReferralName(e.target.value)} placeholder="Their name"
              style={{ flex: 1, padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`, borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 13, color: colors.text, outline: 'none' }} />
            <input value={referralEmail} onChange={e => setReferralEmail(e.target.value)} placeholder="Their email"
              style={{ flex: 1, padding: '10px 12px', background: 'rgba(255,255,255,0.05)', border: `1px solid ${colors.border}`, borderRadius: radius.sm, fontFamily: fonts.sans, fontSize: 13, color: colors.text, outline: 'none' }} />
          </div>
          <button onClick={handleReferral} style={{
            width: '100%', padding: '10px 0', borderRadius: radius.pill, border: `1px solid ${colors.border}`, background: 'transparent',
            fontFamily: fonts.sans, fontSize: 12, fontWeight: 700, color: colors.text2, letterSpacing: 1, textTransform: 'uppercase', cursor: 'pointer',
          }}>
            {referralSent ? 'Referral Sent!' : 'Send Referral'}
          </button>
        </div>
      </motion.div>
    </div>
  )
}
