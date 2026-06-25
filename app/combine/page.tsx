'use client';

import { useState } from 'react';
import Nav from '../../components/Nav';

export default function CombinePage() {
  const [form, setForm] = useState({
    fullName: '', email: '', phone: '', position: '', college: '', gradYear: '',
    heightFt: '', heightIn: '', weight: '', dash: '', vertical: '', broadJump: '', videoUrl: '', notes: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function update(key: string, value: string) {
    setForm(p => ({ ...p, [key]: value }));
  }

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#FFFFFF' }}>
      <Nav />

      {/* Hero */}
      <section style={{ paddingTop: '68px', minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '140px 24px 80px', background: '#0A0A0A', position: 'relative', overflow: 'hidden' }}>
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05, pointerEvents: 'none' }} viewBox="0 0 1440 600" preserveAspectRatio="xMidYMid slice">
          {[0,1,2,3,4,5,6,7,8,9,10].map(i => <line key={i} x1={i*144} y1="0" x2={i*144} y2="600" stroke="#F5C400" strokeWidth="1" />)}
          {[0,1,2,3,4].map(i => <line key={i} x1="0" y1={i*150} x2="1440" y2={i*150} stroke="#F5C400" strokeWidth="1" />)}
          <ellipse cx="720" cy="300" rx="250" ry="120" fill="none" stroke="#F5C400" strokeWidth="2" />
        </svg>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'inline-block', background: '#F5C400', color: '#0A0A0A', fontFamily: "'Space Mono', monospace", fontSize: '11px', fontWeight: 700, letterSpacing: '2px', padding: '6px 16px', marginBottom: '24px' }}>
            MARCH 15, 2025 · AUSTIN, TX
          </div>
          <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(56px, 10vw, 120px)', lineHeight: 0.9, letterSpacing: '4px', marginBottom: '24px' }}>
            TOP<span style={{ color: '#F5C400' }}>Λ</span>RK<br />COMBINE
          </h1>
          <div style={{ width: '60px', height: '3px', background: '#F5C400', margin: '0 auto 24px' }} />
          <p style={{ fontSize: '18px', color: '#CCCCCC', maxWidth: '560px', margin: '0 auto', lineHeight: 1.7 }}>
            The premier evaluation event connecting American football athletes with international professional teams. Get seen. Get signed.
          </p>
        </div>
      </section>

      {/* Event Info */}
      <section style={{ background: '#141414', padding: '64px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            {
              icon: '📅',
              title: 'Date & Time',
              items: ['Saturday, March 15, 2025', 'Check-in: 7:00 AM', 'Events Start: 9:00 AM', 'Conclude: 4:00 PM'],
            },
            {
              icon: '📍',
              title: 'Location',
              items: ['Burger Center', '3001 S Congress Ave', 'Austin, TX 78704', 'Free parking on-site'],
            },
            {
              icon: '🏈',
              title: 'What to Expect',
              items: ['40-Yard Dash', 'Vertical & Broad Jump', 'Position Drills', '1-on-1 team meetings', 'Film review sessions'],
            },
          ].map(card => (
            <div key={card.title} style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', padding: '32px', borderTop: '3px solid #F5C400' }}>
              <div style={{ fontSize: '32px', marginBottom: '16px' }}>{card.icon}</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '24px', letterSpacing: '1px', color: '#F5C400', marginBottom: '16px' }}>{card.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {card.items.map(item => (
                  <li key={item} style={{ color: '#CCCCCC', fontSize: '14px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <span style={{ color: '#F5C400', fontSize: '10px' }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Registration Form */}
      <section style={{ padding: '80px 24px', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <p style={{ color: '#F5C400', fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '3px', marginBottom: '12px' }}>LIMITED SPOTS AVAILABLE</p>
            <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 64px)', letterSpacing: '2px' }}>REGISTER NOW</h2>
          </div>

          {submitted ? (
            <div style={{ background: '#141414', border: '2px solid #F5C400', padding: '60px', textAlign: 'center' }}>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '72px', color: '#F5C400', lineHeight: 1, marginBottom: '16px' }}>✓</div>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', letterSpacing: '2px', marginBottom: '16px' }}>REGISTRATION RECEIVED!</h3>
              <p style={{ color: '#CCCCCC', fontSize: '16px', lineHeight: 1.7, maxWidth: '500px', margin: '0 auto 32px' }}>
                Thank you for registering for the TopArk Combine. We'll contact you within 48 hours with confirmation details and what to bring on the day.
              </p>
              <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', padding: '20px', display: 'inline-block', textAlign: 'left' }}>
                <p style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#F5C400', letterSpacing: '1px', marginBottom: '8px' }}>NEXT STEPS</p>
                {['Check your email for confirmation', 'Prepare your highlight reel', 'Arrive at 7:00 AM for check-in'].map(s => (
                  <p key={s} style={{ color: '#888888', fontSize: '13px', marginBottom: '6px' }}>→ {s}</p>
                ))}
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '48px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                {/* Left Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Full Name *</label>
                    <input type="text" placeholder="Marcus Williams" value={form.fullName} onChange={e => update('fullName', e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Email Address *</label>
                    <input type="email" placeholder="athlete@email.com" value={form.email} onChange={e => update('email', e.target.value)} required />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Phone Number</label>
                    <input type="tel" placeholder="(555) 000-0000" value={form.phone} onChange={e => update('phone', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Position *</label>
                    <select value={form.position} onChange={e => update('position', e.target.value)} required>
                      <option value="">Select Position</option>
                      {['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'DB', 'K', 'P'].map(p => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>College / University</label>
                    <input type="text" placeholder="Ohio State University" value={form.college} onChange={e => update('college', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Graduation Year</label>
                    <select value={form.gradYear} onChange={e => update('gradYear', e.target.value)}>
                      <option value="">Select Year</option>
                      {[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027].map(y => <option key={y} value={y}>{y}</option>)}
                    </select>
                  </div>
                </div>

                {/* Right Column */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Height (ft)</label>
                      <select value={form.heightFt} onChange={e => update('heightFt', e.target.value)}>
                        <option value="">Ft</option>
                        {[5, 6, 7].map(n => <option key={n} value={n}>{n}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Height (in)</label>
                      <select value={form.heightIn} onChange={e => update('heightIn', e.target.value)}>
                        <option value="">In</option>
                        {Array.from({ length: 12 }, (_, i) => <option key={i} value={i}>{i}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Weight (lbs)</label>
                    <input type="number" placeholder="215" value={form.weight} onChange={e => update('weight', e.target.value)} min="150" max="400" />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>40-Yard Dash (seconds)</label>
                    <input type="text" placeholder="4.52" value={form.dash} onChange={e => update('dash', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Vertical Jump (inches)</label>
                    <input type="text" placeholder="34" value={form.vertical} onChange={e => update('vertical', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Broad Jump</label>
                    <input type="text" placeholder={"9'6\""} value={form.broadJump} onChange={e => update('broadJump', e.target.value)} />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Highlight Video URL</label>
                    <input type="url" placeholder="https://youtube.com/..." value={form.videoUrl} onChange={e => update('videoUrl', e.target.value)} />
                  </div>
                </div>
              </div>

              <div style={{ marginTop: '24px' }}>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '8px' }}>Additional Notes</label>
                <textarea rows={4} placeholder="Any injuries, accommodations needed, or additional information for our staff..." value={form.notes} onChange={e => update('notes', e.target.value)} />
              </div>

              <button type="submit" style={{ background: '#F5C400', color: '#0A0A0A', border: 'none', fontWeight: 700, fontSize: '16px', letterSpacing: '2px', textTransform: 'uppercase', padding: '18px', cursor: 'pointer', width: '100%', marginTop: '32px', transition: 'background 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#C49A00')}
                onMouseLeave={e => (e.currentTarget.style.background = '#F5C400')}>
                Submit Registration
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
