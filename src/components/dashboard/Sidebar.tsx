"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./dashboard.module.css";
import LogoutButton from "@/components/auth/LogoutButton";

export type NavItem = { href: string; icon: string; label: string; badge?: number };
export type NavGroup = { section: string; items: NavItem[] };

export default function Sidebar({
  tierLabel,
  tierName,
  groups,
  userInitials,
  userName,
  userPlan,
  accent = "gold",
}: {
  tierLabel: string;
  tierName: string;
  groups: NavGroup[];
  userInitials: string;
  userName: string;
  userPlan: string;
  accent?: "gold" | "blue";
}) {
  const pathname = usePathname();
  const accentColor = accent === "blue" ? "var(--blue)" : "var(--gold)";

  return (
    <aside className={styles.sidebar}>
      <div className={styles.sidebarLogo}>
        <Image src="/logo.jpg" alt="TopArk" width={56} height={56} className={styles.sidebarLogoImg} />
      </div>
      <div className={styles.sidebarTier} style={{ borderLeftColor: accentColor }}>
        <div className={styles.tierLabel}>{tierLabel}</div>
        <div className={styles.tierName} style={{ color: accentColor }}>
          {tierName}
        </div>
      </div>
      <nav className={styles.sidebarNav}>
        {groups.map((group) => (
          <div key={group.section}>
            <div className={styles.navSection}>{group.section}</div>
            {group.items.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navItem} ${active ? styles.navItemActive : ""}`}
                  style={active ? { color: accentColor, borderLeftColor: accentColor } : undefined}
                >
                  <span className={styles.navIcon}>{item.icon}</span> {item.label}
                  {item.badge ? <span className={styles.navBadge}>{item.badge}</span> : null}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
      <div className={styles.sidebarBottom}>
        <div className={styles.sidebarUser}>
          <div className={styles.userAvatar} style={{ background: accentColor, color: accent === "blue" ? "var(--white)" : "var(--black)" }}>
            {userInitials}
          </div>
          <div>
            <div className={styles.userName}>{userName}</div>
            <div className={styles.userPlan} style={{ color: accentColor }}>
              {userPlan}
            </div>
          </div>
        </div>
        <LogoutButton className={styles.userPlan} />
      </div>
    </aside>
  );
}
