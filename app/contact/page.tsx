'use client';

import { useState } from 'react';
import Nav from '../../components/Nav';

const subjects = ['General Inquiry', 'Player Inquiry', 'Team Partnership', 'Media Request', 'Combine Information'];

const teamContacts = [
  { initials: 'NW', name: 'Noah Whittle', role: 'CEO & Co-Founder', email: 'noah@topark.com' },
  { initials: 'KB', name: 'Kenneth Bradley', role: 'CSO & Co-Founder', email: 'kenneth@topark.com' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#FFFFFF' }}>
      <Nav />
      <div style={{ paddingTop: '68px' }}>
        {/* Header */}
        <div style={{ background: '#141414', borderBottom: '1px solid #2A2A2A', padding: '64px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p style={{ color: '#F5C400', fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '3px', marginBottom: '12px' }}>REACH OUT</p>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 80px)', letterSpacing: '3px', marginBottom: '12px' }}>GET IN TOUCH</h1>
            <p style={{ color: '#888888', fontSize: '16px', maxWidth: '500px' }}>Whether you're an athlete ready to go global or a team looking for elite American talent — we're here for you.</p>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '64px 24px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px' }}>
          {/* Left: Info */}
          <div>
            {/* Office */}
            <div style={{ marginBottom: '48px' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '1px', color: '#F5C400', marginBottom: '20px' }}>OFFICE</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { icon: '📍', label: 'Address', value: '123 Congress Ave, Austin, TX 78701' },
                  { icon: '✉', label: 'Email', value: 'info@topark.com' },
                  { icon: '📞', label: 'Phone', value: '+1 (512) 555-0182' },
                  { icon: '🕐', label: 'Hours', value: 'Mon–Fri · 9AM–6PM CST' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                    <span style={{ fontSize: '18px', width: '28px', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                    <div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '4px' }}>{item.label}</div>
                      <div style={{ color: '#CCCCCC', fontSize: '14px' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Team Contacts */}
            <div style={{ marginBottom: '48px' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '1px', color: '#F5C400', marginBottom: '20px' }}>DIRECT CONTACTS</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {teamContacts.map(contact => (
                  <div key={contact.name} style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#F5C400')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2A2A')}>
                    <div style={{ width: '48px', height: '48px', background: '#F5C400', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#0A0A0A' }}>{contact.initials}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '14px', color: '#FFFFFF', marginBottom: '2px' }}>{contact.name}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#F5C400', letterSpacing: '1px', marginBottom: '4px' }}>{contact.role}</div>
                      <div style={{ color: '#888888', fontSize: '12px' }}>{contact.email}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '1px', color: '#F5C400', marginBottom: '20px' }}>FOLLOW US</h3>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { label: 'Instagram', handle: '@toparkfootball', icon: '📸' },
                  { label: 'Twitter / X', handle: '@topark_football', icon: '𝕏' },
                  { label: 'YouTube', handle: 'TopArk Football', icon: '▶' },
                  { label: 'LinkedIn', handle: 'TopArk', icon: 'in' },
                ].map(social => (
                  <div key={social.label} style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '14px 18px', cursor: 'pointer', transition: 'border-color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = '#F5C400')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2A2A')}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontSize: '16px' }}>{social.icon}</span>
                      <div>
                        <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase' }}>{social.label}</div>
                        <div style={{ color: '#CCCCCC', fontSize: '12px', marginTop: '2px' }}>{social.handle}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '1px', marginBottom: '8px' }}>SEND A MESSAGE</h3>
            <p style={{ color: '#888888', fontSize: '14px', marginBottom: '32px' }}>We respond to all inquiries within 24–48 hours.</p>

            {submitted ? (
              <div style={{ background: '#141414', border: '2px solid #F5C400', padding: '48px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', color: '#F5C400', marginBottom: '16px' }}>✓</div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '32px', letterSpacing: '1px', marginBottom: '12px' }}>MESSAGE SENT!</h3>
                <p style={{ color: '#888888', fontSize: '14px', lineHeight: 1.7 }}>
                  Thank you for reaching out to TopArk. A member of our team will be in touch within 24–48 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Full Name *</label>
                  <input type="text" placeholder="Your name" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Email Address *</label>
                  <input type="email" placeholder="your@email.com" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Subject *</label>
                  <select value={form.subject} onChange={e => setForm(p => ({ ...p, subject: e.target.value }))} required>
                    <option value="">Select a subject</option>
                    {subjects.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Message *</label>
                  <textarea rows={6} placeholder="Tell us what you need..." value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required />
                </div>
                <button type="submit" style={{ background: '#F5C400', color: '#0A0A0A', border: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '16px', cursor: 'pointer', transition: 'background 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#C49A00')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#F5C400')}>
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Banner */}
        <div style={{ background: '#141414', borderTop: '1px solid #2A2A2A', padding: '48px 24px', textAlign: 'center' }}>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(32px, 5vw, 56px)', letterSpacing: '2px', marginBottom: '16px' }}>
              READY TO MAKE YOUR <span style={{ color: '#F5C400' }}>MOVE?</span>
            </h2>
            <p style={{ color: '#888888', fontSize: '15px', lineHeight: 1.7 }}>
              Join 108+ athletes who chose TopArk and are now playing professional football across Europe and Latin America.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
