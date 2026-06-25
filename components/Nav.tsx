"use client";
import { useState } from "react";
import Link from "next/link";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px", height: "72px",
        background: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border)"
      }}>
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, letterSpacing: 3 }}>
            TOP<span style={{ color: "var(--gold)" }}>Λ</span>RK
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{ display: "flex", gap: 28, listStyle: "none", alignItems: "center" }} className="nav-desktop">
          {[
            { label: "How It Works", href: "/#how" },
            { label: "Teams", href: "/#teams" },
            { label: "Athletes", href: "/search" },
            { label: "Combines", href: "/combine" },
            { label: "Contact", href: "/contact" },
          ].map(l => (
            <li key={l.label}>
              <Link href={l.href} style={{
                textDecoration: "none", fontSize: 12, fontWeight: 500,
                letterSpacing: "1.5px", textTransform: "uppercase", color: "var(--light)",
                transition: "color 0.2s"
              }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--gold)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--light)")}
              >{l.label}</Link>
            </li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: 12, alignItems: "center" }} className="nav-desktop">
          <Link href="/login" style={{
            textDecoration: "none", fontSize: 12, fontWeight: 600, letterSpacing: "1.5px",
            textTransform: "uppercase", color: "var(--light)", padding: "10px 20px",
            border: "1px solid var(--border)", transition: "border-color 0.2s, color 0.2s"
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--gold)"; e.currentTarget.style.color = "var(--gold)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--light)"; }}
          >Login</Link>
          <Link href="/signup" style={{
            textDecoration: "none", background: "var(--gold)", color: "var(--black)",
            fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase",
            padding: "10px 24px", transition: "background 0.2s"
          }}
            onMouseEnter={e => (e.currentTarget.style.background = "var(--gold-dim)")}
            onMouseLeave={e => (e.currentTarget.style.background = "var(--gold)")}
          >Join Now</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="nav-mobile"
          style={{ background: "none", border: "none", color: "var(--white)", cursor: "pointer", padding: 8 }}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {open
              ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
              : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
            }
          </svg>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: "fixed", inset: 0, background: "var(--black)", zIndex: 190,
          paddingTop: 90, paddingLeft: 32, paddingRight: 32, display: "flex",
          flexDirection: "column", gap: 8
        }} className="nav-mobile">
          {[
            { label: "How It Works", href: "/#how" },
            { label: "Athletes", href: "/search" },
            { label: "Combines", href: "/combine" },
            { label: "Contact", href: "/contact" },
            { label: "Login", href: "/login" },
          ].map(l => (
            <Link key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              textDecoration: "none", fontSize: 32, fontFamily: "'Bebas Neue', sans-serif",
              letterSpacing: 2, color: "var(--white)", padding: "12px 0",
              borderBottom: "1px solid var(--border)"
            }}>{l.label}</Link>
          ))}
          <Link href="/signup" onClick={() => setOpen(false)} style={{
            textDecoration: "none", background: "var(--gold)", color: "var(--black)",
            fontSize: 16, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase",
            padding: "16px 24px", textAlign: "center", marginTop: 16
          }}>Join Now</Link>
        </div>
      )}

      <style>{`
        .nav-desktop { display: flex; }
        .nav-mobile { display: none; }
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
          nav { padding: 0 24px !important; }
        }
      `}</style>
    </>
  );
}
