'use client';

import { useState } from 'react';
import Link from 'next/link';
import Nav from '../../components/Nav';

const allPlayers = [
  { id: 1, name: 'Marcus Williams', initials: 'MW', position: 'RB', college: 'Ohio State', experience: 5, countries: ['Germany', 'Poland'], height: "6'0\"", weight: 215 },
  { id: 2, name: 'DeShawn Carter', initials: 'DC', position: 'WR', college: 'Alabama', experience: 3, countries: ['France'], height: "5'11\"", weight: 185 },
  { id: 3, name: 'Tyrone Johnson', initials: 'TJ', position: 'QB', college: 'Florida', experience: 7, countries: ['Germany', 'Mexico', 'Austria'], height: "6'3\"", weight: 225 },
  { id: 4, name: 'Brandon Davis', initials: 'BD', position: 'LB', college: 'Penn State', experience: 4, countries: ['Sweden', 'Denmark'], height: "6'2\"", weight: 240 },
  { id: 5, name: 'Malik Thompson', initials: 'MT', position: 'DB', college: 'Georgia', experience: 2, countries: ['Czech Republic'], height: "5'10\"", weight: 195 },
  { id: 6, name: 'Jordan Foster', initials: 'JF', position: 'OL', college: 'Michigan', experience: 6, countries: ['Italy', 'Spain'], height: "6'5\"", weight: 310 },
  { id: 7, name: 'Chris Evans', initials: 'CE', position: 'TE', college: 'Notre Dame', experience: 3, countries: ['Germany'], height: "6'4\"", weight: 255 },
  { id: 8, name: 'Kevin Harris', initials: 'KH', position: 'DL', college: 'LSU', experience: 5, countries: ['France', 'Mexico'], height: "6'3\"", weight: 285 },
  { id: 9, name: 'Antoine Simmons', initials: 'AS', position: 'RB', college: 'Texas', experience: 8, countries: ['Germany', 'Poland', 'Mexico'], height: "5'11\"", weight: 220 },
  { id: 10, name: 'Devon Walker', initials: 'DW', position: 'WR', college: 'USC', experience: 4, countries: ['Sweden', 'Finland'], height: "6'1\"", weight: 195 },
  { id: 11, name: 'James Richardson', initials: 'JR', position: 'LB', college: 'Oklahoma', experience: 6, countries: ['Spain', 'Austria'], height: "6'2\"", weight: 245 },
  { id: 12, name: 'Marcus Lee', initials: 'ML', position: 'QB', college: 'Clemson', experience: 2, countries: ['Italy'], height: "6'2\"", weight: 215 },
];

const positions = ['QB', 'RB', 'WR', 'TE', 'OL', 'DL', 'LB', 'DB', 'K/P'];
const countryOptions = ['Germany', 'France', 'Sweden', 'Italy', 'Spain', 'Austria', 'Czech Republic', 'Mexico', 'Poland', 'Denmark'];

export default function SearchPage() {
  const [posFilters, setPosFilters] = useState<string[]>([]);
  const [expFilter, setExpFilter] = useState('any');
  const [countryFilters, setCountryFilters] = useState<string[]>([]);
  const [requestSent, setRequestSent] = useState<number[]>([]);
  const [page, setPage] = useState(1);

  function togglePos(p: string) {
    setPosFilters(prev => prev.includes(p) ? prev.filter(x => x !== p) : [...prev, p]);
  }
  function toggleCountry(c: string) {
    setCountryFilters(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  }
  function sendRequest(id: number) {
    setRequestSent(prev => [...prev, id]);
  }

  const filtered = allPlayers.filter(p => {
    if (posFilters.length > 0 && !posFilters.includes(p.position)) return false;
    if (expFilter === '1-3' && (p.experience < 1 || p.experience > 3)) return false;
    if (expFilter === '4-6' && (p.experience < 4 || p.experience > 6)) return false;
    if (expFilter === '7+' && p.experience < 7) return false;
    if (countryFilters.length > 0 && !p.countries.some(c => countryFilters.includes(c))) return false;
    return true;
  });

  return (
    <div style={{ background: '#0A0A0A', minHeight: '100vh', color: '#FFFFFF' }}>
      <Nav />
      <div style={{ paddingTop: '68px' }}>
        {/* Header */}
        <div style={{ background: '#141414', borderBottom: '1px solid #2A2A2A', padding: '40px 24px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <p style={{ color: '#F5C400', fontFamily: "'Space Mono', monospace", fontSize: '11px', letterSpacing: '3px', marginBottom: '8px' }}>ATHLETE DATABASE</p>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(40px, 6vw, 64px)', letterSpacing: '2px', marginBottom: '8px' }}>FIND YOUR PLAYER</h1>
            <p style={{ color: '#888888', fontSize: '14px' }}>{filtered.length} athletes available · Verified international experience</p>
          </div>
        </div>

        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '32px 24px', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px', alignItems: 'start' }}>
          {/* Sidebar Filters */}
          <div style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '24px', position: 'sticky', top: '88px' }}>
            <h3 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '20px', letterSpacing: '1px', color: '#F5C400', marginBottom: '24px' }}>FILTERS</h3>

            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '12px' }}>Position</p>
              {positions.map(pos => (
                <label key={pos} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={posFilters.includes(pos)} onChange={() => togglePos(pos)} style={{ width: '14px', height: '14px', accentColor: '#F5C400' }} />
                  <span style={{ color: '#CCCCCC', fontSize: '13px' }}>{pos}</span>
                </label>
              ))}
            </div>

            <div style={{ marginBottom: '28px' }}>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '12px' }}>Experience</p>
              {[{ val: 'any', label: 'Any' }, { val: '1-3', label: '1–3 Years' }, { val: '4-6', label: '4–6 Years' }, { val: '7+', label: '7+ Years' }].map(opt => (
                <label key={opt.val} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
                  <input type="radio" name="exp" value={opt.val} checked={expFilter === opt.val} onChange={() => setExpFilter(opt.val)} style={{ accentColor: '#F5C400' }} />
                  <span style={{ color: '#CCCCCC', fontSize: '13px' }}>{opt.label}</span>
                </label>
              ))}
            </div>

            <div>
              <p style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '1.5px', color: '#888888', textTransform: 'uppercase', marginBottom: '12px' }}>Country Experience</p>
              {countryOptions.map(c => (
                <label key={c} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={countryFilters.includes(c)} onChange={() => toggleCountry(c)} style={{ width: '14px', height: '14px', accentColor: '#F5C400' }} />
                  <span style={{ color: '#CCCCCC', fontSize: '13px' }}>{c}</span>
                </label>
              ))}
            </div>

            {(posFilters.length > 0 || expFilter !== 'any' || countryFilters.length > 0) && (
              <button onClick={() => { setPosFilters([]); setExpFilter('any'); setCountryFilters([]); }} style={{ marginTop: '24px', width: '100%', background: 'transparent', border: '1px solid #2A2A2A', color: '#888888', padding: '10px', cursor: 'pointer', fontSize: '12px', letterSpacing: '1px', textTransform: 'uppercase' as const }}>
                Clear Filters
              </button>
            )}
          </div>

          {/* Player Grid */}
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
              {filtered.map(player => (
                <div key={player.id} style={{ background: '#141414', border: '1px solid #2A2A2A', padding: '24px', transition: 'border-color 0.2s, transform 0.2s' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = '#F5C400'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = '#2A2A2A'; }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                    <div style={{ width: '52px', height: '52px', background: '#F5C400', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '18px', color: '#0A0A0A', letterSpacing: '1px' }}>{player.initials}</span>
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '15px', color: '#FFFFFF', marginBottom: '4px' }}>{player.name}</div>
                      <span style={{ background: '#F5C400', color: '#0A0A0A', fontSize: '10px', fontWeight: 700, padding: '2px 8px', letterSpacing: '0.5px' }}>{player.position}</span>
                    </div>
                  </div>

                  <div style={{ marginBottom: '10px' }}>
                    <div style={{ fontSize: '12px', color: '#888888', marginBottom: '4px' }}>{player.college}</div>
                    <div style={{ fontSize: '12px', color: '#888888' }}>{player.experience} years · {player.height} · {player.weight} lbs</div>
                  </div>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                    {player.countries.map(c => (
                      <span key={c} style={{ background: '#1A1A1A', border: '1px solid #2A2A2A', fontSize: '10px', color: '#CCCCCC', padding: '3px 8px' }}>{c}</span>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: '8px' }}>
                    <Link href={`/athletes/${player.id}`} style={{ flex: 1, textAlign: 'center', border: '1px solid #2A2A2A', color: '#CCCCCC', textDecoration: 'none', fontSize: '11px', fontWeight: 600, letterSpacing: '0.5px', padding: '9px 4px', textTransform: 'uppercase' as const }}>
                      View Profile
                    </Link>
                    <button onClick={() => sendRequest(player.id)} style={{ flex: 1, background: requestSent.includes(player.id) ? '#1A1A1A' : '#F5C400', color: requestSent.includes(player.id) ? '#888888' : '#0A0A0A', border: 'none', fontSize: '11px', fontWeight: 700, letterSpacing: '0.5px', padding: '9px 4px', cursor: requestSent.includes(player.id) ? 'default' : 'pointer', textTransform: 'uppercase' as const }}>
                      {requestSent.includes(player.id) ? '✓ Sent' : 'Request'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
              <button onClick={() => setPage(p => Math.max(1, p - 1))} style={{ background: 'transparent', border: '1px solid #2A2A2A', color: '#888888', padding: '10px 20px', cursor: 'pointer', fontSize: '13px' }}>← Previous</button>
              {[1, 2, 3].map(n => (
                <button key={n} onClick={() => setPage(n)} style={{ background: page === n ? '#F5C400' : 'transparent', border: `1px solid ${page === n ? '#F5C400' : '#2A2A2A'}`, color: page === n ? '#0A0A0A' : '#888888', width: '40px', height: '40px', cursor: 'pointer', fontSize: '14px', fontWeight: page === n ? 700 : 400 }}>{n}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(3, p + 1))} style={{ background: 'transparent', border: '1px solid #2A2A2A', color: '#888888', padding: '10px 20px', cursor: 'pointer', fontSize: '13px' }}>Next →</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
