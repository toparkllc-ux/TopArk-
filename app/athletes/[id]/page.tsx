'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '../../../components/Nav';

const athlete = {
  name: 'Marcus Williams',
  initials: 'MW',
  position: 'RB',
  college: 'Ohio State University',
  experience: 5,
  nationality: 'American',
  bio: "Marcus Williams is a dynamic running back with five years of professional football experience across three international leagues. Known for his explosive acceleration, elite vision, and reliable pass-catching ability out of the backfield, Marcus has established himself as one of the top American imports in European football. He brings a professional attitude, strong film library, and the cultural adaptability that comes with years of international play.",
  measurables: [
    { label: 'Height', value: "6'0\"" },
    { label: 'Weight', value: '215 lbs' },
    { label: '40-Yard Dash', value: '4.52s' },
    { label: 'Vertical Jump', value: '34"' },
    { label: 'Broad Jump', value: "9'6\"" },
    { label: 'Bench Press', value: '225 (12 reps)' },
  ],
  experience_timeline: [
    { year: '2023–2024', team: 'Berlin Thunder', league: 'GFL', country: '🇩🇪 Germany', highlight: '1,142 rushing yards · 8 TDs · GFL All-Star' },
    { year: '2021–2022', team: 'Tychy Eagles', league: 'Polish Football League', country: '🇵🇱 Poland', highlight: '856 rushing yards · 6 TDs · League MVP Runner-up' },
    { year: '2020', team: 'Condors de Ciudad Juárez', league: 'LFA', country: '🇲🇽 Mexico', highlight: 'LFA debut · 612 yards · 4 TDs' },
  ],
  stats: [
    { label: 'Career Rushing Yards', value: '3,840' },
    { label: 'Career TDs', value: '28' },
    { label: 'Games Played', value: '54' },
    { label: 'Avg Yards/Game', value: '71.1' },
  ],
};

export default function AthletePage() {
  const [requestSent, setRequestSent] = useState(false);

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#FFFFFF' }}>
      <Nav />
      <div style={{ paddingTop: '68px' }}>
        {/* Hero */}
        <section style={{ background: '#141414', borderBottom: '1px solid #2A2A2A', padding: '64px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
              <div style={{ width: '120px', height: '120px', background: '#F5C400', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '40px', color: '#0A0A0A', letterSpacing: '2px' }}>{athlete.initials}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '8px' }}>
                  <span style={{ background: '#F5C400', color: '#0A0A0A', fontWeight: 700, fontSize: '12px', padding: '4px 12px', letterSpacing: '1px' }}>{athlete.position}</span>
                  <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#888888', letterSpacing: '1px' }}>{athlete.college}</span>
                </div>
                <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(48px, 7vw, 80px)', letterSpacing: '3px', lineHeight: 0.9, marginBottom: '24px' }}>
                  {athlete.name}
                </h1>
                <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
                  {[
                    { label: 'Experience', value: `${athlete.experience} Years` },
                    { label: 'Countries', value: '3' },
                    { label: 'Signings', value: '2' },
                    { label: 'Career TDs', value: '28' },
                  ].map(stat => (
                    <div key={stat.label}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', color: '#F5C400', letterSpacing: '1px', lineHeight: 1 }}>{stat.value}</div>
                      <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '4px' }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ flexShrink: 0 }}>
                <button
                  onClick={() => setRequestSent(true)}
                  style={{ background: requestSent ? '#1A1A1A' : '#F5C400', color: requestSent ? '#888888' : '#0A0A0A', border: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '1.5px', textTransform: 'uppercase', padding: '16px 32px', cursor: requestSent ? 'default' : 'pointer', display: 'block', width: '200px', marginBottom: '12px', transition: 'all 0.2s' }}
                >
                  {requestSent ? '✓ Request Sent' : 'Request Interview'}
                </button>
                <Link href="/contact" style={{ display: 'block', textAlign: 'center', border: '1px solid #2A2A2A', color: '#CCCCCC', textDecoration: 'none', fontWeight: 600, fontSize: '13px', letterSpacing: '1px', textTransform: 'uppercase', padding: '12px 32px', width: '200px' }}>
                  Contact TopArk
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '48px 24px', display: 'grid', gridTemplateColumns: '1fr 320px', gap: '40px', alignItems: 'start' }}>
          {/* Main Content */}
          <div>
            {/* About */}
            <section style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '32px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '1px', color: '#F5C400', marginBottom: '16px' }}>ABOUT</h2>
              <p style={{ color: '#CCCCCC', fontSize: '15px', lineHeight: 1.8 }}>{athlete.bio}</p>
            </section>

            {/* Career Stats */}
            <section style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '32px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '1px', color: '#F5C400', marginBottom: '20px' }}>CAREER STATS</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                {athlete.stats.map(s => (
                  <div key={s.label} style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', padding: '20px', textAlign: 'center' }}>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '36px', color: '#FFFFFF', letterSpacing: '1px', lineHeight: 1 }}>{s.value}</div>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '9px', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase', marginTop: '6px' }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Athletic Measurables */}
            <section style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '32px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '1px', color: '#F5C400', marginBottom: '20px' }}>ATHLETIC MEASURABLES</h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0', border: '1px solid #2A2A2A' }}>
                {athlete.measurables.map((m, i) => (
                  <div key={m.label} style={{ padding: '20px 24px', borderRight: (i + 1) % 3 !== 0 ? '1px solid #2A2A2A' : 'none', borderBottom: i < 3 ? '1px solid #2A2A2A' : 'none' }}>
                    <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '10px', color: '#888888', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>{m.label}</div>
                    <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', color: '#FFFFFF', letterSpacing: '1px' }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* International Experience */}
            <section style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '32px', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '1px', color: '#F5C400', marginBottom: '24px' }}>INTERNATIONAL EXPERIENCE</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {athlete.experience_timeline.map((exp, i) => (
                  <div key={i} style={{ display: 'flex', gap: '24px', paddingBottom: i < athlete.experience_timeline.length - 1 ? '24px' : '0', marginBottom: i < athlete.experience_timeline.length - 1 ? '24px' : '0', borderBottom: i < athlete.experience_timeline.length - 1 ? '1px solid #2A2A2A' : 'none' }}>
                    <div style={{ width: '4px', background: '#F5C400', flexShrink: 0, borderRadius: '2px' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <div>
                          <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '1px', marginBottom: '4px' }}>{exp.team}</h3>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                            <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '11px', color: '#F5C400', letterSpacing: '1px' }}>{exp.league}</span>
                            <span style={{ color: '#888888', fontSize: '13px' }}>{exp.country}</span>
                          </div>
                        </div>
                        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: '12px', color: '#888888', letterSpacing: '1px', flexShrink: 0 }}>{exp.year}</span>
                      </div>
                      <p style={{ color: '#888888', fontSize: '13px' }}>{exp.highlight}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Highlight Reel */}
            <section style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '32px' }}>
              <h2 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '28px', letterSpacing: '1px', color: '#F5C400', marginBottom: '20px' }}>FILM & HIGHLIGHTS</h2>
              <div style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', padding: '48px', textAlign: 'center', cursor: 'pointer' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = '#F5C400')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = '#2A2A2A')}>
                <div style={{ width: '72px', height: '72px', background: '#F5C400', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', cursor: 'pointer' }}>
                  <span style={{ fontSize: '24px', marginLeft: '4px' }}>▶</span>
                </div>
                <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '1px', marginBottom: '8px' }}>HIGHLIGHT REEL AVAILABLE</h3>
                <p style={{ color: '#888888', fontSize: '13px', marginBottom: '20px' }}>2023–2024 Season Highlights · GFL Berlin Thunder</p>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ color: '#F5C400', textDecoration: 'none', fontFamily: "'Space Mono', monospace", fontSize: '12px', letterSpacing: '1px' }}>
                  VIEW FILM →
                </a>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#141414', border: '2px solid #F5C400', padding: '28px', textAlign: 'center' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '22px', letterSpacing: '1px', marginBottom: '8px' }}>INTERESTED IN MARCUS?</h3>
              <p style={{ color: '#888888', fontSize: '13px', marginBottom: '24px', lineHeight: 1.6 }}>Request an interview to connect directly with this athlete.</p>
              <button
                onClick={() => setRequestSent(true)}
                style={{ background: requestSent ? '#1A1A1A' : '#F5C400', color: requestSent ? '#888888' : '#0A0A0A', border: 'none', fontWeight: 700, fontSize: '14px', letterSpacing: '1px', textTransform: 'uppercase', padding: '14px', cursor: requestSent ? 'default' : 'pointer', width: '100%', marginBottom: '12px' }}
              >
                {requestSent ? '✓ Request Sent' : 'Request Interview'}
              </button>
              <Link href="/contact" style={{ display: 'block', textAlign: 'center', border: '1px solid #2A2A2A', color: '#CCCCCC', textDecoration: 'none', fontWeight: 600, fontSize: '13px', textTransform: 'uppercase', padding: '12px' }}>
                Contact TopArk
              </Link>
            </div>

            <div style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '24px' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '1px', color: '#F5C400', marginBottom: '16px' }}>QUICK INFO</h3>
              {[
                { label: 'Nationality', value: 'American' },
                { label: 'Position', value: 'Running Back (RB)' },
                { label: 'College', value: 'Ohio State' },
                { label: 'Plan', value: 'Elite Member' },
                { label: 'Agent Rep', value: 'TopArk Team' },
              ].map(info => (
                <div key={info.label} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '12px', marginBottom: '12px', borderBottom: '1px solid #2A2A2A' }}>
                  <span style={{ color: '#888888', fontSize: '12px' }}>{info.label}</span>
                  <span style={{ color: '#FFFFFF', fontSize: '12px', fontWeight: 600 }}>{info.value}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '24px' }}>
              <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', letterSpacing: '1px', color: '#F5C400', marginBottom: '16px' }}>COUNTRIES PLAYED</h3>
              {[{ flag: '🇩🇪', name: 'Germany', detail: 'GFL · 2023–24' }, { flag: '🇵🇱', name: 'Poland', detail: 'PFL · 2021–22' }, { flag: '🇲🇽', name: 'Mexico', detail: 'LFA · 2020' }].map(c => (
                <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '20px' }}>{c.flag}</span>
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: '#FFFFFF' }}>{c.name}</div>
                    <div style={{ fontSize: '11px', color: '#888888' }}>{c.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
